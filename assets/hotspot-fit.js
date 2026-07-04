// ホットスポット注釈（吹き出し）が画面外にはみ出さないよう位置を補正する
(function () {
    var mv = document.querySelector('model-viewer');
    if (!mv) return;
    var MARGIN = 8;
    var GAP = 10;

    function fit() {
        var vw = window.innerWidth;
        mv.querySelectorAll('.hotspot').forEach(function (hotspot) {
            var note = hotspot.querySelector('.annotation');
            if (!note) return;
            var btn = hotspot.getBoundingClientRect();
            var w = note.offsetWidth;
            var h = note.offsetHeight;
            // 左右: マーカー中央揃えを基準に、画面内に収まるようずらす
            var idealLeft = btn.left + btn.width / 2 - w / 2;
            var clampedLeft = Math.min(Math.max(idealLeft, MARGIN), vw - MARGIN - w);
            note.style.setProperty('--shift-x', (clampedLeft - idealLeft) + 'px');
            // 上下: マーカー上に出すスペースがなければ下側に反転
            var topWhenAbove = btn.top - GAP - h;
            note.classList.toggle('annotation--below', topWhenAbove < MARGIN);
        });
    }

    var pending = false;
    function schedule() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
            pending = false;
            fit();
        });
    }

    mv.addEventListener('camera-change', schedule);
    mv.addEventListener('load', schedule);
    window.addEventListener('resize', schedule);
    schedule();
})();
