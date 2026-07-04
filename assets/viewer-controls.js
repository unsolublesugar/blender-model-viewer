// ボタンタップでカメラを操作するビューアコントロール
// （ズーム±・視点の上下左右・リセット）
(function () {
    var mv = document.querySelector('model-viewer');
    var controls = document.querySelector('.viewer-controls');
    if (!mv || !controls) return;

    var THETA_STEP = Math.PI / 6;  // 左右30°
    var PHI_STEP = Math.PI / 12;   // 上下15°
    var ZOOM_FACTOR = 0.75;

    var initialOrbit = null;
    function captureInitial() {
        if (!initialOrbit) initialOrbit = mv.getCameraOrbit();
    }
    if (mv.loaded) {
        captureInitial();
    } else {
        mv.addEventListener('load', captureInitial, { once: true });
    }

    function applyOrbit(o) {
        mv.cameraOrbit = o.theta + 'rad ' + o.phi + 'rad ' + o.radius + 'm';
    }

    controls.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var o = mv.getCameraOrbit();
        switch (btn.dataset.action) {
            case 'zoom-in':
                o.radius *= ZOOM_FACTOR;
                break;
            case 'zoom-out':
                o.radius /= ZOOM_FACTOR;
                break;
            case 'left':
                o.theta -= THETA_STEP;
                break;
            case 'right':
                o.theta += THETA_STEP;
                break;
            case 'up':
                o.phi -= PHI_STEP;
                break;
            case 'down':
                o.phi += PHI_STEP;
                break;
            case 'reset':
                if (initialOrbit) {
                    applyOrbit(initialOrbit);
                    mv.fieldOfView = 'auto';
                }
                return;
        }
        applyOrbit(o);
    });
})();
