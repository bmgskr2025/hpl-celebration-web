/* 월별 자격취득자 축하의 벽 */
(function () {
  'use strict';

  var TEAM_ORDER = ['프레지던트팀', '밀리어네어팀', '글로벌 익스팬션팀', '월드팀', '에스피'];
  var TEAM_CLASS = {
    '프레지던트팀': 'team-president',
    '밀리어네어팀': 'team-millionaire',
    '글로벌 익스팬션팀': 'team-get',
    '월드팀': 'team-world',
    '에스피': 'team-sp'
  };

  var TIERS = [
    {
      key: 'triple',
      cls: 'tier-triple',
      title: '트리플 자격취득자',
      badge: '3년 연속',
      msg: '3년 연속이라는 놀라운 기록으로 허벌라이프 프리미어 리그의 역사를 함께 써 내려가고 있는 여러분의 탁월함과 불굴의 의지에 깊은 경의를 표합니다.',
      note: '※ 트리플 자격취득자는 2024년, 2025년, 2026년 연속해서 매해 허벌라이프 프리미어 리그 자격을 취득한 디스트리뷰터입니다'
    },
    {
      key: 'double',
      cls: 'tier-double',
      title: '더블 자격취득자',
      badge: '2회 달성',
      msg: '탁월한 성과와 리더십으로 두 번의 허벌라이프 프리미어 리그 자격을 취득한 여러분의 꾸준한 헌신과 열정에 진심으로 감사와 축하를 전합니다.',
      note: '※ 더블 자격취득자는 2026년 허벌라이프 프리미어 리그 자격을 취득하고, 2024년 또는 2025년 중 한 해에도 자격을 취득한 디스트리뷰터입니다'
    },
    {
      key: 'first',
      cls: 'tier-first',
      title: '자격취득자',
      badge: 'NEW',
      msg: '탁월한 성과와 리더십, 그리고 성장에 기여한 2026년 허벌라이프 프리미어 리그 자격취득자 모두의 빛나는 성공을 진심으로 축하드립니다.',
      note: ''
    }
  ];

  var wall = document.getElementById('wall');
  var tabsEl = document.getElementById('monthTabs');

  function teamRank(team) {
    var i = TEAM_ORDER.indexOf(team);
    return i === -1 ? TEAM_ORDER.length : i;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function renderMonth(month) {
    wall.innerHTML = '';

    if (!month || !month.qualifiers || month.qualifiers.length === 0) {
      wall.appendChild(el('p', 'empty-month', '이번 달 명단이 준비 중입니다. 곧 업데이트됩니다!'));
      return;
    }

    var heading = el('h2', 'section-title', month.label + ' 자격취득자');
    var desc = el('p', 'section-desc', '새롭게 자격을 취득한 허벌라이프 프리미어 리그 자격취득자 여러분을 소개합니다.');
    wall.appendChild(heading);
    wall.appendChild(desc);

    TIERS.forEach(function (tier) {
      var list = month.qualifiers.filter(function (q) {
        return (q.tier || 'first') === tier.key;
      });
      if (list.length === 0) return;

      list.sort(function (a, b) { return teamRank(a.team) - teamRank(b.team); });

      var block = el('div', 'tier-block ' + tier.cls);
      var head = el('div', 'tier-head');
      head.appendChild(el('h3', null, tier.title));
      head.appendChild(el('span', 'tier-badge', tier.badge));
      block.appendChild(head);
      block.appendChild(el('p', 'tier-msg', tier.msg));
      if (tier.note) block.appendChild(el('p', 'tier-note', tier.note));

      var grid = el('div', 'q-grid');
      list.forEach(function (q) {
        var card = el('div', 'q-card ' + (TEAM_CLASS[q.team] || ''));
        var leaf = el('div', 'leaf');
        var img = document.createElement('img');
        img.src = 'assets/trileaf.png';
        img.alt = '';
        leaf.appendChild(img);
        var info = el('div');
        info.appendChild(el('div', 'q-name', q.name));
        info.appendChild(el('div', 'q-team', q.team));
        card.appendChild(leaf);
        card.appendChild(info);
        grid.appendChild(card);
      });
      block.appendChild(grid);
      wall.appendChild(block);
    });
  }

  function renderTabs(months, activeId) {
    tabsEl.innerHTML = '';
    months.forEach(function (m) {
      var b = el('button', 'month-tab' + (m.id === activeId ? ' active' : ''), m.label);
      b.addEventListener('click', function () {
        renderTabs(months, m.id);
        renderMonth(m);
      });
      tabsEl.appendChild(b);
    });
  }

  fetch('data/qualifiers.json', { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (data) {
      var months = data.months || [];
      if (months.length === 0) {
        wall.innerHTML = '';
        wall.appendChild(el('p', 'empty-month', '아직 등록된 명단이 없습니다.'));
        return;
      }
      renderTabs(months, months[0].id);
      renderMonth(months[0]);
    })
    .catch(function () {
      wall.innerHTML = '';
      wall.appendChild(el('p', 'empty-month',
        '명단을 불러오지 못했습니다. 웹서버를 통해 접속했는지 확인해 주세요.'));
    });
})();
