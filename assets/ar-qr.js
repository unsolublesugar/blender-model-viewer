// AR非対応環境（PC等）向けに、スマホAR誘導用のQRコードを表示する
(function () {
    var mv = document.querySelector('model-viewer');
    var qrButton = document.querySelector('.qr-button');
    var overlay = document.querySelector('.qr-overlay');
    if (!mv || !qrButton || !overlay) return;

    function updateVisibility() {
        // AR起動できる端末では「ARで見る」ボタンが出るのでQR導線は不要
        qrButton.hidden = !!mv.canActivateAR;
    }
    if (mv.loaded) {
        updateVisibility();
    } else {
        mv.addEventListener('load', updateVisibility, { once: true });
    }

    qrButton.addEventListener('click', function () {
        var holder = overlay.querySelector('.qr-code');
        if (!holder.hasChildNodes()) {
            var qr = qrcode(0, 'M');
            qr.addData(location.href);
            qr.make();
            holder.innerHTML = qr.createSvgTag({ scalable: true, margin: 2 });
        }
        overlay.hidden = false;
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.closest('.qr-close')) {
            overlay.hidden = true;
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') overlay.hidden = true;
    });
})();
