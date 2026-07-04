/* 피드백 위젯 — 구글 폼으로 익명 전송 (로그인·구글 계정 불필요) */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     구글 폼 연결 설정
     폼을 만든 뒤 아래 값을 채우면 전송이 활성화됩니다.
     - action: 폼 주소에서 /viewform 을 /formResponse 로 바꾼 URL
     - fields: 각 질문의 entry ID
     ------------------------------------------------------------------ */
  var FORM = {
    action: '',
    fields: {
      rating: '',   // 평가 (좋아요/아쉬워요)
      page: '',     // 페이지 이름 (자동)
      comment: ''   // 의견
    }
  };

  var PAGE_NAMES = {
    'index.html': '축하의 벽',
    'certificate.html': '인증서 다운로드',
    'flyer.html': '레커니션 플라이어',
    'about.html': '사이트 소개'
  };

  function pageName() {
    var file = location.pathname.split('/').pop() || 'index.html';
    return PAGE_NAMES[file] || file;
  }

  /* ---------------- 위젯 DOM ---------------- */
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'fb-fab';
  fab.innerHTML = '💬 <span>피드백</span>';
  fab.setAttribute('aria-label', '피드백 남기기');

  var overlay = document.createElement('div');
  overlay.className = 'fb-overlay';
  overlay.innerHTML =
    '<div class="fb-modal" role="dialog" aria-label="피드백">' +
    '  <button type="button" class="fb-close" aria-label="닫기">&times;</button>' +
    '  <div class="fb-step" data-step="form">' +
    '    <h3>이 사이트, 어떠셨어요?</h3>' +
    '    <p class="fb-sub">프로토타입이라 여러분의 의견이 큰 힘이 됩니다.</p>' +
    '    <div class="fb-rating">' +
    '      <button type="button" class="fb-rate" data-rate="좋아요">👍<span>좋아요</span></button>' +
    '      <button type="button" class="fb-rate" data-rate="아쉬워요">👎<span>아쉬워요</span></button>' +
    '    </div>' +
    '    <textarea class="fb-text" maxlength="500" rows="4" placeholder="좋았던 점, 불편했던 점, 바라는 점을 자유롭게 적어주세요 (선택)"></textarea>' +
    '    <button type="button" class="btn fb-send">보내기</button>' +
    '    <p class="fb-privacy">보내기를 누르면 위 내용과 페이지 이름(예: 축하의 벽)만 전송됩니다. 이름·연락처 등 개인정보는 수집되지 않습니다.</p>' +
    '  </div>' +
    '  <div class="fb-step" data-step="done" hidden>' +
    '    <div class="fb-done-icon">🙌</div>' +
    '    <h3>피드백 감사합니다!</h3>' +
    '    <p class="fb-sub">보내주신 의견으로 더 나은 사이트로 보답할게요.</p>' +
    '    <button type="button" class="btn secondary fb-done-close">닫기</button>' +
    '  </div>' +
    '  <div class="fb-step" data-step="pending" hidden>' +
    '    <div class="fb-done-icon">🔧</div>' +
    '    <h3>피드백 기능 준비 중입니다</h3>' +
    '    <p class="fb-sub">우편함을 연결하고 있어요. 곧 열릴게요!</p>' +
    '    <button type="button" class="btn secondary fb-done-close">닫기</button>' +
    '  </div>' +
    '</div>';

  document.body.appendChild(fab);
  document.body.appendChild(overlay);

  var rating = '';
  var textEl = overlay.querySelector('.fb-text');

  function showStep(name) {
    overlay.querySelectorAll('.fb-step').forEach(function (s) {
      s.hidden = s.getAttribute('data-step') !== name;
    });
  }

  function openModal() {
    overlay.classList.add('open');
    showStep('form');
  }

  function closeModal() {
    overlay.classList.remove('open');
    /* 다음에 다시 열 때를 위해 초기화 */
    rating = '';
    textEl.value = '';
    overlay.querySelectorAll('.fb-rate').forEach(function (b) {
      b.classList.remove('active');
    });
  }

  fab.addEventListener('click', openModal);
  overlay.querySelector('.fb-close').addEventListener('click', closeModal);
  overlay.querySelectorAll('.fb-done-close').forEach(function (b) {
    b.addEventListener('click', closeModal);
  });
  overlay.addEventListener('click', function (ev) {
    if (ev.target === overlay) closeModal();
  });

  overlay.querySelectorAll('.fb-rate').forEach(function (btn) {
    btn.addEventListener('click', function () {
      rating = btn.getAttribute('data-rate');
      overlay.querySelectorAll('.fb-rate').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
    });
  });

  overlay.querySelector('.fb-send').addEventListener('click', function () {
    var comment = textEl.value.trim();
    if (!rating && !comment) {
      textEl.placeholder = '👍/👎 를 고르거나 의견을 한 줄이라도 적어주세요!';
      textEl.focus();
      return;
    }
    if (!FORM.action) {
      showStep('pending');
      return;
    }
    var body = new URLSearchParams();
    if (FORM.fields.rating) body.append(FORM.fields.rating, rating || '(선택 안 함)');
    if (FORM.fields.page) body.append(FORM.fields.page, pageName());
    if (FORM.fields.comment) body.append(FORM.fields.comment, comment);
    /* no-cors: 구글 폼은 응답을 돌려주지 않으므로 전송 후 감사 화면 표시 */
    fetch(FORM.action, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    }).catch(function () { /* no-cors 특성상 성공/실패 구분 불가 */ });
    showStep('done');
  });
})();
