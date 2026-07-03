/* 인증서 생성 — 모든 처리는 브라우저 안에서만 이루어집니다 */
(function () {
  'use strict';

  var CANVAS_W = 2200, CANVAS_H = 1700;
  // 인증서 원본에서 측정한 이름 밑줄 위치 (assets/cert-bg.png 기준)
  var LINE_Y = 714, LINE_X1 = 730, LINE_X2 = 2057;
  var NAME_MAX_W = (LINE_X2 - LINE_X1) - 60;
  var NAME_CENTER_X = (LINE_X1 + LINE_X2) / 2;
  var NAME_BASELINE_Y = LINE_Y - 28;
  var NAME_COLOR = '#101921'; /* Night Sky */

  var canvas = document.getElementById('certCanvas');
  var ctx = canvas.getContext('2d');
  var nameInput = document.getElementById('certName');
  var btnPng = document.getElementById('dlPng');
  var btnPdf = document.getElementById('dlPdf');

  var bg = new Image();
  var bgReady = false, fontsReady = false;

  bg.onload = function () { bgReady = true; render(); };
  bg.src = 'assets/cert-bg.png';

  // 캔버스에 웹폰트가 적용되도록 로딩을 기다림
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('700 100px "Noto Sans KR"'),
      document.fonts.load('900 100px "Noto Sans KR"')
    ]).then(function () {
      fontsReady = true;
      render();
    });
    document.fonts.ready.then(function () { fontsReady = true; render(); });
  } else {
    fontsReady = true;
  }

  function currentName() {
    return nameInput.value.trim();
  }

  function render() {
    if (!bgReady) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.drawImage(bg, 0, 0, CANVAS_W, CANVAS_H);

    var name = currentName();
    var has = name.length > 0;
    btnPng.disabled = !has;
    btnPdf.disabled = !has;
    if (!has) return;

    var size = 110;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = NAME_COLOR;
    do {
      ctx.font = '700 ' + size + 'px "Noto Sans KR", sans-serif';
      if (ctx.measureText(name).width <= NAME_MAX_W) break;
      size -= 4;
    } while (size > 40);
    ctx.fillText(name, NAME_CENTER_X, NAME_BASELINE_Y);
  }

  nameInput.addEventListener('input', render);

  function fileName(ext) {
    return 'HPL2026_인증서_' + currentName().replace(/\s+/g, '') + '.' + ext;
  }

  btnPng.addEventListener('click', function () {
    render();
    canvas.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName('png');
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }, 'image/png');
  });

  btnPdf.addEventListener('click', function () {
    render();
    var jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (!jsPDF) { alert('PDF 라이브러리를 불러오지 못했습니다. PNG 다운로드를 이용해 주세요.'); return; }
    // 레터 가로 방향 (원본 인증서와 동일한 11 x 8.5 인치)
    var pdf = new jsPDF({ orientation: 'landscape', unit: 'in', format: 'letter' });
    var img = canvas.toDataURL('image/jpeg', 0.93);
    pdf.addImage(img, 'JPEG', 0, 0, 11, 8.5);
    pdf.save(fileName('pdf'));
  });
})();
