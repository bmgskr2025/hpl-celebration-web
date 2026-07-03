/* 레커니션 플라이어 메이커 — 모든 처리는 브라우저 안에서만 이루어집니다 */
(function () {
  'use strict';

  var SIZE = 1080;

  /* 브랜드 팔레트 */
  var C = {
    nightSky: '#101921',
    forest: '#163E35',
    garden: '#007044',
    energy: '#309C46',
    lagunaLight: '#B1E4F1',
    laguna: '#2D68CB',
    beige: '#F9F8F4',
    grey: '#837976',
    white: '#FFFFFF',
    placeholder: '#E9E7E0'
  };

  var DISCLAIMER = '허벌라이프 프리미어 리그 자격을 취득하려면, 10명의 신규 디스트리뷰터 각각 가입 월, 가입 직후 월 2개월간 누적으로 250PPV를 취득해야만 기여 가능합니다. 허벌라이프는 최종 자격취득자를 검증하고 확인 및 선택할 권리를 가집니다. 허벌라이프가 자격취득자의 판매를 확인/검증할 수 없는 경우에는 수당 조정 외에도 프로모션의 리워드가 실적에서 공제될 수 있습니다.';

  var SP_LABEL = '뉴 수퍼바이저';
  var DST_LABEL = '뉴 디스트리뷰터';

  /* ------------------------------------------------------------------
     템플릿 레이아웃 — 원본 PPT(1080x1080) 좌표를 기반으로 브랜드 팔레트로 재구성
     slot: { id, kind:'sp'|'dst', shape:'circle'|'rrect', 좌표, name 라벨 위치 }
     ------------------------------------------------------------------ */
  var TEMPLATES = [
    {
      key: 't1',
      label: '그리드형',
      headerH: 293,
      stripY: 293, stripH: 31,
      leftPanel: { x: 0, y: 324, w: 340, h: 696, color: C.forest },
      footer: { type: 'band', y: 1020, h: 60 },
      slots: [
        { id: 'sp1', kind: 'sp', shape: 'circle', cx: 218, cy: 582, r: 84,
          name: { x: 218, y: 696, align: 'center', color: C.lagunaLight, labelColor: C.lagunaLight } },
        { id: 'sp2', kind: 'sp', shape: 'circle', cx: 218, cy: 868, r: 84,
          name: { x: 218, y: 982, align: 'center', color: C.lagunaLight, labelColor: C.lagunaLight } },
        { id: 'd1', kind: 'dst', shape: 'circle', cx: 500, cy: 425, r: 57 },
        { id: 'd2', kind: 'dst', shape: 'circle', cx: 690, cy: 425, r: 57 },
        { id: 'd3', kind: 'dst', shape: 'circle', cx: 880, cy: 425, r: 57 },
        { id: 'd4', kind: 'dst', shape: 'circle', cx: 462, cy: 635, r: 57 },
        { id: 'd5', kind: 'dst', shape: 'circle', cx: 615, cy: 635, r: 57 },
        { id: 'd6', kind: 'dst', shape: 'circle', cx: 768, cy: 635, r: 57 },
        { id: 'd7', kind: 'dst', shape: 'circle', cx: 921, cy: 635, r: 57 },
        { id: 'd8', kind: 'dst', shape: 'circle', cx: 500, cy: 845, r: 57 },
        { id: 'd9', kind: 'dst', shape: 'circle', cx: 690, cy: 845, r: 57 },
        { id: 'd10', kind: 'dst', shape: 'circle', cx: 880, cy: 845, r: 57 }
      ]
    },
    {
      key: 't2',
      label: '밴드형',
      headerH: 348,
      stripY: 348, stripH: 0,
      spBand: { x: 0, y: 368, w: 1080, h: 150, color: C.laguna },
      footer: { type: 'band', y: 1000, h: 80 },
      slots: [
        { id: 'sp1', kind: 'sp', shape: 'circle', cx: 118, cy: 443, r: 55,
          name: { x: 195, y: 432, align: 'left', color: C.white, labelColor: C.lagunaLight, beside: true } },
        { id: 'sp2', kind: 'sp', shape: 'circle', cx: 628, cy: 443, r: 55,
          name: { x: 705, y: 432, align: 'left', color: C.white, labelColor: C.lagunaLight, beside: true } },
        { id: 'd1', kind: 'dst', shape: 'circle', cx: 110, cy: 578, r: 39, beside: { x: 168, y: 578 } },
        { id: 'd2', kind: 'dst', shape: 'circle', cx: 110, cy: 672, r: 39, beside: { x: 168, y: 672 } },
        { id: 'd3', kind: 'dst', shape: 'circle', cx: 110, cy: 766, r: 39, beside: { x: 168, y: 766 } },
        { id: 'd4', kind: 'dst', shape: 'circle', cx: 110, cy: 860, r: 39, beside: { x: 168, y: 860 } },
        { id: 'd5', kind: 'dst', shape: 'circle', cx: 110, cy: 954, r: 39, beside: { x: 168, y: 954 } },
        { id: 'd6', kind: 'dst', shape: 'circle', cx: 605, cy: 578, r: 39, beside: { x: 663, y: 578 } },
        { id: 'd7', kind: 'dst', shape: 'circle', cx: 605, cy: 672, r: 39, beside: { x: 663, y: 672 } },
        { id: 'd8', kind: 'dst', shape: 'circle', cx: 605, cy: 766, r: 39, beside: { x: 663, y: 766 } },
        { id: 'd9', kind: 'dst', shape: 'circle', cx: 605, cy: 860, r: 39, beside: { x: 663, y: 860 } },
        { id: 'd10', kind: 'dst', shape: 'circle', cx: 605, cy: 954, r: 39, beside: { x: 663, y: 954 } }
      ]
    },
    {
      key: 't3',
      label: '카드형',
      headerH: 348,
      stripY: 348, stripH: 28,
      leftPanel: { x: 0, y: 376, w: 345, h: 614, color: C.lagunaLight, round: 36 },
      footer: { type: 'text', y: 1012 },
      slots: [
        { id: 'sp1', kind: 'sp', shape: 'rrect', x: 46, y: 410, w: 208, h: 183, rad: 20,
          name: { x: 56, y: 620, align: 'left', color: C.nightSky, labelColor: C.garden } },
        { id: 'sp2', kind: 'sp', shape: 'rrect', x: 46, y: 690, w: 208, h: 183, rad: 20,
          name: { x: 56, y: 900, align: 'left', color: C.nightSky, labelColor: C.garden } },
        { id: 'd1', kind: 'dst', shape: 'circle', cx: 455, cy: 455, r: 57 },
        { id: 'd2', kind: 'dst', shape: 'circle', cx: 611, cy: 455, r: 57 },
        { id: 'd3', kind: 'dst', shape: 'circle', cx: 768, cy: 455, r: 57 },
        { id: 'd4', kind: 'dst', shape: 'circle', cx: 924, cy: 455, r: 57 },
        { id: 'd5', kind: 'dst', shape: 'circle', cx: 455, cy: 657, r: 57 },
        { id: 'd6', kind: 'dst', shape: 'circle', cx: 611, cy: 657, r: 57 },
        { id: 'd7', kind: 'dst', shape: 'circle', cx: 768, cy: 657, r: 57 },
        { id: 'd8', kind: 'dst', shape: 'circle', cx: 924, cy: 657, r: 57 },
        { id: 'd9', kind: 'dst', shape: 'circle', cx: 533, cy: 859, r: 57 },
        { id: 'd10', kind: 'dst', shape: 'circle', cx: 689, cy: 859, r: 57 }
      ]
    }
  ];

  /* ---------------- 상태 ---------------- */
  var tplIndex = 0;
  var photos = {};   // slotId -> { img, zoom, ox, oy }
  var names = {};    // sp1, sp2, d1..d10 -> string
  var selectedSlot = null;
  var pendingSlot = null;

  var canvas = document.getElementById('flyerCanvas');
  var ctx = canvas.getContext('2d');
  var photoInput = document.getElementById('photoInput');
  var headlineInput = document.getElementById('headlineInput');
  var messageInput = document.getElementById('messageInput');
  var slotTools = document.getElementById('slotTools');
  var slotToolsTitle = document.getElementById('slotToolsTitle');
  var zoomRange = document.getElementById('zoomRange');

  /* ---------------- 에셋 로딩 ---------------- */
  var assets = { badge: null, pin: null, silhouettes: [] };
  var loadCount = 0, loadTotal = 6;

  function loadImg(src, cb) {
    var im = new Image();
    im.onload = function () { cb(im); loadCount++; render(); };
    im.onerror = function () { loadCount++; render(); };
    im.src = src;
  }
  loadImg('assets/hpl-badge.png', function (im) { assets.badge = im; });
  loadImg('assets/sv-pin.png', function (im) { assets.pin = im; });
  [1, 2, 3, 4].forEach(function (n, i) {
    loadImg('assets/silhouette' + n + '.png', function (im) { assets.silhouettes[i] = im; });
  });

  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('900 76px "Noto Sans KR"'),
      document.fonts.load('700 24px "Noto Sans KR"'),
      document.fonts.load('400 20px "Noto Sans KR"')
    ]).then(render);
    document.fonts.ready.then(render);
  }

  /* ---------------- 그리기 헬퍼 ---------------- */
  function rrectPath(g, x, y, w, h, r) {
    g.beginPath();
    g.moveTo(x + r, y);
    g.arcTo(x + w, y, x + w, y + h, r);
    g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r);
    g.arcTo(x, y, x + w, y, r);
    g.closePath();
  }

  function slotPath(g, s) {
    if (s.shape === 'circle') {
      g.beginPath();
      g.arc(s.cx, s.cy, s.r, 0, Math.PI * 2);
    } else {
      rrectPath(g, s.x, s.y, s.w, s.h, s.rad);
    }
  }

  function slotBox(s) {
    if (s.shape === 'circle') {
      return { x: s.cx - s.r, y: s.cy - s.r, w: s.r * 2, h: s.r * 2 };
    }
    return { x: s.x, y: s.y, w: s.w, h: s.h };
  }

  function wrapText(g, text, maxWidth) {
    var words = text.split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (g.measureText(t).width > maxWidth && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = t;
      }
    });
    if (cur) lines.push(cur);
    return lines;
  }

  function drawPhotoInSlot(g, s, state, silIdx) {
    var box = slotBox(s);
    g.save();
    slotPath(g, s);
    g.clip();
    if (state && state.img) {
      var img = state.img;
      var base = Math.max(box.w / img.width, box.h / img.height);
      var sc = base * state.zoom;
      var dw = img.width * sc, dh = img.height * sc;
      var dx = box.x + box.w / 2 - dw / 2 + state.ox;
      var dy = box.y + box.h / 2 - dh / 2 + state.oy;
      g.drawImage(img, dx, dy, dw, dh);
    } else {
      g.fillStyle = C.placeholder;
      g.fillRect(box.x, box.y, box.w, box.h);
      var sil = assets.silhouettes[silIdx % 4];
      if (sil) {
        var m = box.w * 0.08;
        g.drawImage(sil, box.x + m, box.y + m, box.w - m * 2, box.h - m * 2);
      }
    }
    g.restore();
    /* 테두리 */
    g.save();
    slotPath(g, s);
    g.lineWidth = s.kind === 'sp' ? 5 : 3.5;
    g.strokeStyle = s.kind === 'sp' ? C.lagunaLight : C.garden;
    g.stroke();
    g.restore();
  }

  function drawPin(g, s) {
    if (!assets.pin) return;
    var box = slotBox(s);
    var d = s.kind === 'sp' ? Math.max(56, box.w * 0.42) : 0;
    if (!d) return;
    var x, y;
    if (s.shape === 'circle') {
      x = box.x - d * 0.18;
      y = box.y - d * 0.18;
    } else {
      x = box.x + box.w - d * 0.62;
      y = box.y + box.h - d * 0.62;
    }
    g.drawImage(assets.pin, x, y, d, d);
  }

  function nameFor(id) {
    return (names[id] || '').trim();
  }

  function drawSlotName(g, tpl, s) {
    var label = s.kind === 'sp' ? SP_LABEL : DST_LABEL;
    var nm = nameFor(s.id);

    if (s.kind === 'sp' && s.name) {
      var n = s.name;
      g.textAlign = n.align;
      if (n.beside) {
        /* 밴드형: 사진 옆에 이름 */
        g.fillStyle = n.color;
        g.font = '700 24px "Noto Sans KR", sans-serif';
        g.fillText(nm || '이름을 입력하세요', n.x, n.y);
        g.fillStyle = n.labelColor;
        g.font = '500 17px "Noto Sans KR", sans-serif';
        g.fillText(label, n.x, n.y + 30);
      } else {
        g.fillStyle = n.color;
        g.font = '700 22px "Noto Sans KR", sans-serif';
        g.fillText(nm || '이름을 입력하세요', n.x, n.y);
        g.fillStyle = n.labelColor;
        g.font = '500 15px "Noto Sans KR", sans-serif';
        g.fillText(label, n.x, n.y + 26);
      }
      return;
    }

    /* 디스트리뷰터 */
    var box = slotBox(s);
    if (s.beside) {
      g.textAlign = 'left';
      g.fillStyle = tpl.key === 't2' ? C.garden : C.nightSky;
      g.font = '700 19px "Noto Sans KR", sans-serif';
      g.fillText(nm || ' ', s.beside.x, s.beside.y - 2);
      g.fillStyle = C.grey;
      g.font = '400 14px "Noto Sans KR", sans-serif';
      g.fillText(label, s.beside.x, s.beside.y + 20);
    } else {
      var cx = box.x + box.w / 2;
      var ty = box.y + box.h + 24;
      g.textAlign = 'center';
      g.fillStyle = C.garden;
      g.font = '700 17px "Noto Sans KR", sans-serif';
      g.fillText(nm || ' ', cx, ty);
      g.fillStyle = C.grey;
      g.font = '400 13px "Noto Sans KR", sans-serif';
      g.fillText(label, cx, ty + 20);
    }
  }

  /* ---------------- 전체 렌더 ---------------- */
  function drawFlyer(g, tpl, opts) {
    opts = opts || {};
    g.textBaseline = 'alphabetic';

    /* 배경 */
    g.fillStyle = C.white;
    g.fillRect(0, 0, SIZE, SIZE);

    /* 왼쪽 패널 (t1, t3) */
    if (tpl.leftPanel) {
      var p = tpl.leftPanel;
      g.fillStyle = p.color;
      if (p.round) {
        g.save();
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.lineTo(p.x + p.w - p.round, p.y);
        g.arcTo(p.x + p.w, p.y, p.x + p.w, p.y + p.round, p.round);
        g.lineTo(p.x + p.w, p.y + p.h - p.round);
        g.arcTo(p.x + p.w, p.y + p.h, p.x + p.w - p.round, p.y + p.h, p.round);
        g.lineTo(p.x, p.y + p.h);
        g.closePath();
        g.fill();
        g.restore();
      } else {
        g.fillRect(p.x, p.y, p.w, p.h);
      }
    }

    /* SP 밴드 (t2) */
    if (tpl.spBand) {
      var b = tpl.spBand;
      g.fillStyle = b.color;
      rrectPath(g, b.x - 30, b.y, b.w + 60, b.h, 30);
      g.fill();
    }

    /* 헤더 */
    g.fillStyle = C.nightSky;
    g.fillRect(0, 0, SIZE, tpl.headerH);
    if (tpl.stripH) {
      g.fillStyle = C.lagunaLight;
      g.fillRect(0, tpl.stripY, SIZE, tpl.stripH);
    }

    /* 헤드라인 + 메시지 */
    var headline = headlineInput.value.trim() || '감사합니다!';
    g.textAlign = 'left';
    g.fillStyle = C.lagunaLight;
    g.font = '900 72px "Noto Sans KR", sans-serif';
    g.fillText(headline, 49, 128);

    g.fillStyle = 'rgba(255,255,255,0.93)';
    g.font = '400 20.5px "Noto Sans KR", sans-serif';
    var msgLines = wrapText(g, messageInput.value.trim(), 720);
    var my = 172;
    msgLines.slice(0, 4).forEach(function (ln) {
      g.fillText(ln, 52, my);
      my += 31;
    });

    /* HPL 배지 */
    if (assets.badge) {
      g.drawImage(assets.badge, 843, 34, 200, 231);
    }

    /* 슬롯 */
    var silCounter = 0;
    tpl.slots.forEach(function (s) {
      drawPhotoInSlot(g, s, photos[s.id], silCounter++);
      drawPin(g, s);
      drawSlotName(g, tpl, s);
    });

    /* 선택 표시 (내보내기 시 제외) */
    if (!opts.export && selectedSlot) {
      var sel = tpl.slots.find(function (s) { return s.id === selectedSlot; });
      if (sel) {
        g.save();
        slotPath(g, sel);
        g.lineWidth = 4;
        g.setLineDash([10, 7]);
        g.strokeStyle = C.energy;
        g.stroke();
        g.restore();
      }
    }

    /* 푸터 면책 문구 */
    if (tpl.footer.type === 'band') {
      g.fillStyle = C.nightSky;
      g.fillRect(0, tpl.footer.y, SIZE, tpl.footer.h);
      g.fillStyle = 'rgba(255,255,255,0.85)';
      g.font = '400 11.5px "Noto Sans KR", sans-serif';
      g.textAlign = 'left';
      var fl = wrapText(g, DISCLAIMER, SIZE - 80);
      var fy = tpl.footer.y + 22;
      fl.slice(0, 3).forEach(function (ln) {
        g.fillText(ln, 40, fy);
        fy += 17;
      });
    } else {
      g.fillStyle = C.grey;
      g.font = '400 11.5px "Noto Sans KR", sans-serif';
      g.textAlign = 'left';
      var fl2 = wrapText(g, DISCLAIMER, SIZE - 76);
      var fy2 = tpl.footer.y + 14;
      fl2.slice(0, 4).forEach(function (ln) {
        g.fillText(ln, 38, fy2);
        fy2 += 16.5;
      });
    }
  }

  function render() {
    drawFlyer(ctx, TEMPLATES[tplIndex]);
    renderThumbs();
  }

  /* ---------------- 템플릿 선택 UI ---------------- */
  var thumbCtxs = [];
  function buildTplButtons() {
    var wrap = document.getElementById('tplSelect');
    wrap.innerHTML = '';
    TEMPLATES.forEach(function (tpl, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tpl-btn' + (i === tplIndex ? ' active' : '');
      var cv = document.createElement('canvas');
      cv.width = 216;
      cv.height = 216;
      btn.appendChild(cv);
      btn.appendChild(document.createTextNode(tpl.label));
      btn.addEventListener('click', function () {
        tplIndex = i;
        selectedSlot = null;
        updateSlotTools();
        buildTplButtons();
        render();
      });
      wrap.appendChild(btn);
      thumbCtxs[i] = cv.getContext('2d');
    });
  }

  var thumbTimer = null;
  function renderThumbs() {
    if (thumbTimer) return;
    thumbTimer = setTimeout(function () {
      thumbTimer = null;
      TEMPLATES.forEach(function (tpl, i) {
        var g = thumbCtxs[i];
        if (!g) return;
        g.save();
        g.clearRect(0, 0, 216, 216);
        g.scale(0.2, 0.2);
        var keepSel = selectedSlot;
        selectedSlot = null;
        drawFlyer(g, tpl, { export: true });
        selectedSlot = keepSel;
        g.restore();
      });
    }, 120);
  }

  /* ---------------- 슬롯 인터랙션 ---------------- */
  function canvasPos(ev) {
    var rect = canvas.getBoundingClientRect();
    var cx = (ev.clientX - rect.left) * (SIZE / rect.width);
    var cy = (ev.clientY - rect.top) * (SIZE / rect.height);
    return { x: cx, y: cy };
  }

  function hitSlot(pos) {
    var tpl = TEMPLATES[tplIndex];
    for (var i = tpl.slots.length - 1; i >= 0; i--) {
      var s = tpl.slots[i];
      if (s.shape === 'circle') {
        var dx = pos.x - s.cx, dy = pos.y - s.cy;
        if (dx * dx + dy * dy <= s.r * s.r) return s;
      } else {
        if (pos.x >= s.x && pos.x <= s.x + s.w && pos.y >= s.y && pos.y <= s.y + s.h) return s;
      }
    }
    return null;
  }

  function slotDisplayName(s) {
    if (s.kind === 'sp') return SP_LABEL + ' ' + s.id.replace('sp', '');
    return DST_LABEL + ' ' + s.id.replace('d', '');
  }

  function updateSlotTools() {
    var state = selectedSlot && photos[selectedSlot];
    if (state) {
      slotTools.style.display = 'block';
      slotToolsTitle.textContent = slotDisplayName(
        TEMPLATES[tplIndex].slots.find(function (s) { return s.id === selectedSlot; })
      ) + ' 사진';
      zoomRange.value = Math.round(state.zoom * 100);
    } else {
      slotTools.style.display = 'none';
    }
  }

  var drag = null;
  canvas.addEventListener('pointerdown', function (ev) {
    var pos = canvasPos(ev);
    var s = hitSlot(pos);
    if (!s) return;
    ev.preventDefault();
    canvas.setPointerCapture(ev.pointerId);
    drag = { slot: s, startX: pos.x, startY: pos.y, moved: false,
             ox: photos[s.id] ? photos[s.id].ox : 0,
             oy: photos[s.id] ? photos[s.id].oy : 0 };
  });

  canvas.addEventListener('pointermove', function (ev) {
    if (!drag) return;
    var pos = canvasPos(ev);
    var dx = pos.x - drag.startX, dy = pos.y - drag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true;
    var state = photos[drag.slot.id];
    if (drag.moved && state && state.img) {
      state.ox = drag.ox + dx;
      state.oy = drag.oy + dy;
      selectedSlot = drag.slot.id;
      render();
    }
  });

  canvas.addEventListener('pointerup', function (ev) {
    if (!drag) return;
    var s = drag.slot;
    var wasDrag = drag.moved;
    drag = null;
    if (wasDrag) { updateSlotTools(); return; }
    /* 클릭: 사진 없으면 업로드, 있으면 선택 */
    if (!photos[s.id] || !photos[s.id].img) {
      pendingSlot = s.id;
      photoInput.click();
    }
    selectedSlot = s.id;
    updateSlotTools();
    render();
  });

  photoInput.addEventListener('change', function () {
    var file = photoInput.files && photoInput.files[0];
    photoInput.value = '';
    if (!file || !pendingSlot) return;
    var slotId = pendingSlot;
    pendingSlot = null;
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        photos[slotId] = { img: img, zoom: 1, ox: 0, oy: 0 };
        selectedSlot = slotId;
        updateSlotTools();
        render();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  zoomRange.addEventListener('input', function () {
    var state = selectedSlot && photos[selectedSlot];
    if (!state) return;
    state.zoom = zoomRange.value / 100;
    render();
  });

  document.getElementById('btnReplace').addEventListener('click', function () {
    if (!selectedSlot) return;
    pendingSlot = selectedSlot;
    photoInput.click();
  });

  document.getElementById('btnRemove').addEventListener('click', function () {
    if (!selectedSlot) return;
    delete photos[selectedSlot];
    updateSlotTools();
    render();
  });

  /* ---------------- 텍스트 입력 ---------------- */
  headlineInput.addEventListener('input', render);
  messageInput.addEventListener('input', render);
  document.querySelectorAll('input[data-name]').forEach(function (inp) {
    inp.addEventListener('input', function () {
      names[inp.getAttribute('data-name')] = inp.value;
      render();
    });
  });

  /* ---------------- 내보내기 (2160×2160) ---------------- */
  document.getElementById('btnExport').addEventListener('click', function () {
    var out = document.createElement('canvas');
    out.width = SIZE * 2;
    out.height = SIZE * 2;
    var g = out.getContext('2d');
    g.scale(2, 2);
    drawFlyer(g, TEMPLATES[tplIndex], { export: true });
    out.toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'HPL2026_레커니션_플라이어.png';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }, 'image/png');
  });

  /* ---------------- 시작 ---------------- */
  buildTplButtons();
  render();
})();
