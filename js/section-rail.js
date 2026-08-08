/**
 * Case-study section rail — chapters + subsections.
 * Scroll-spy uses document position (reliable on tall sections).
 *
 * Markup:
 *   <section id="methodology" data-rail="Methodology">
 *     <h3 id="m-tickets" data-rail-sub="Support tickets">...</h3>
 *   </section>
 *   <section id="moscow" data-rail-sub="MoSCoW" data-rail-parent="conceptualisation">
 */
(function () {
  const DARK_SEL =
    '.cs-section--dark, .cs-close, .strip-dark, .fold-dark, .ladder-track, .closing, .life-track';

  function shorten(text, max) {
    const t = String(text || '').replace(/\s+/g, ' ').trim();
    const m = max || 32;
    if (t.length <= m) return t;
    return t.slice(0, m - 1).replace(/\s+\S*$/, '') + '…';
  }

  function labelChapter(el) {
    if (el.dataset.rail && el.dataset.rail.trim()) return el.dataset.rail.trim();
    const kicker = el.querySelector('.cs-kicker, .kicker');
    if (kicker) return shorten(kicker.textContent, 28);
    const h2 = el.querySelector('h2');
    if (h2) return shorten(h2.textContent, 28);
    return el.id;
  }

  function ensureId(el, fallback) {
    if (el.id) return el.id;
    el.id = fallback;
    return el.id;
  }

  function collectTree() {
    const chapters = Array.from(document.querySelectorAll('[data-rail][id]')).filter(
      (el) =>
        !el.hasAttribute('data-rail-skip') &&
        !el.hasAttribute('data-rail-sub') &&
        el.dataset.rail.trim()
    );

    if (!chapters.length) {
      return Array.from(document.querySelectorAll('.cs-section[id], .cs-close[id]'))
        .filter((el) => !el.hasAttribute('data-rail-skip'))
        .map((section) => ({
          id: section.id,
          label: labelChapter(section),
          el: section,
          subs: [],
        }));
    }

    const tree = chapters.map((section) => ({
      id: section.id,
      label: labelChapter(section),
      el: section,
      subs: [],
    }));
    const byId = Object.fromEntries(tree.map((c) => [c.id, c]));

    // Nested subs inside a chapter (ignore ones that declare another parent)
    tree.forEach((chapter) => {
      const nested = chapter.el.querySelectorAll('[data-rail-sub]');
      nested.forEach((subEl, i) => {
        if (subEl.hasAttribute('data-rail-parent')) return;
        const host = subEl.closest('[data-rail][id]');
        if (host !== chapter.el) return;
        const id = ensureId(subEl, `${chapter.id}-sub-${i + 1}`);
        const label = shorten(subEl.dataset.railSub || subEl.textContent, 28);
        if (!chapter.subs.find((s) => s.id === id)) {
          chapter.subs.push({ id, label, el: subEl, parentId: chapter.id });
        }
      });
    });

    // Sibling blocks that belong under a parent (Problem, MoSCoW, …)
    document.querySelectorAll('[data-rail-sub][data-rail-parent]').forEach((subEl) => {
      const parentId = subEl.getAttribute('data-rail-parent');
      const parent = byId[parentId];
      if (!parent) return;
      const id = ensureId(
        subEl,
        `${parentId}-${(subEl.dataset.railSub || 'sub').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
      );
      const label = shorten(subEl.dataset.railSub || labelChapter(subEl), 28);
      if (!parent.subs.find((s) => s.id === id)) {
        parent.subs.push({ id, label, el: subEl, parentId });
      }
    });

    // Keep subsection display order = document order
    tree.forEach((chapter) => {
      chapter.subs.sort((a, b) => {
        const ay = a.el.getBoundingClientRect().top + window.scrollY;
        const by = b.el.getBoundingClientRect().top + window.scrollY;
        return ay - by;
      });
    });

    return tree;
  }

  function init() {
    const nav = document.getElementById('section-rail');
    if (!nav) return;

    const tree = collectTree();
    if (!tree.length) return;

    // Flat spy targets in document order
    const spyItems = [];
    tree.forEach((chapter) => {
      spyItems.push({ id: chapter.id, el: chapter.el, chapterId: chapter.id, isSub: false });
      chapter.subs.forEach((sub) => {
        spyItems.push({ id: sub.id, el: sub.el, chapterId: chapter.id, isSub: true });
      });
    });
    spyItems.sort((a, b) => a.el.getBoundingClientRect().top + window.scrollY - (b.el.getBoundingClientRect().top + window.scrollY));
    // Re-sort by offsetTop once laid out
    const sortedSpy = () =>
      [...spyItems].sort((a, b) => {
        const ay = a.el.getBoundingClientRect().top + window.scrollY;
        const by = b.el.getBoundingClientRect().top + window.scrollY;
        return ay - by;
      });

    // Desktop DOM
    nav.replaceChildren();
    const spine = document.createElement('div');
    spine.className = 'section-rail__spine';
    spine.setAttribute('aria-hidden', 'true');
    const fill = document.createElement('div');
    fill.className = 'section-rail__fill';
    spine.appendChild(fill);

    const list = document.createElement('div');
    list.className = 'section-rail__list';
    const linkMap = {};

    tree.forEach((chapter) => {
      const wrap = document.createElement('div');
      wrap.className = 'section-rail__chapter';
      const a = document.createElement('a');
      a.href = `#${chapter.id}`;
      a.textContent = chapter.label;
      a.dataset.target = chapter.id;
      a.dataset.chapter = chapter.id;
      wrap.appendChild(a);
      linkMap[chapter.id] = a;

      if (chapter.subs.length) {
        const subs = document.createElement('div');
        subs.className = 'section-rail__subs';
        chapter.subs.forEach((sub) => {
          const sa = document.createElement('a');
          sa.href = `#${sub.id}`;
          sa.textContent = sub.label;
          sa.dataset.target = sub.id;
          sa.dataset.chapter = chapter.id;
          subs.appendChild(sa);
          linkMap[sub.id] = sa;
        });
        wrap.appendChild(subs);
      }
      list.appendChild(wrap);
    });

    nav.appendChild(spine);
    nav.appendChild(list);
    nav.classList.add('is-ready');
    nav.setAttribute('aria-label', nav.getAttribute('aria-label') || 'On this page');

    // Mobile — chapters only
    let mobile = document.getElementById('section-rail-mobile');
    if (!mobile) {
      mobile = document.createElement('nav');
      mobile.id = 'section-rail-mobile';
      mobile.className = 'section-rail-mobile';
      mobile.setAttribute('aria-label', 'On this page');
      const insertAfter =
        document.querySelector('.cs-quote-band') ||
        document.querySelector('.snapshot') ||
        document.querySelector('.cs-hero, .hero-dark, .hero-light');
      if (insertAfter && insertAfter.parentNode) {
        insertAfter.insertAdjacentElement('afterend', mobile);
      } else {
        document.body.prepend(mobile);
      }
    }
    const scroller = document.createElement('div');
    scroller.className = 'section-rail-mobile__scroller';
    const mobileMap = {};
    tree.forEach((chapter) => {
      const a = document.createElement('a');
      a.href = `#${chapter.id}`;
      a.textContent = chapter.label;
      a.dataset.target = chapter.id;
      a.dataset.chapter = chapter.id;
      scroller.appendChild(a);
      mobileMap[chapter.id] = a;
    });
    mobile.replaceChildren(scroller);
    mobile.classList.add('is-ready');

    const gate =
      document.querySelector('.cs-quote-band') ||
      document.querySelector('.snapshot') ||
      document.querySelector('.cs-hero, .hero-dark, .hero-light');
    const footEl =
      document.querySelector('#site-footer .site-footer, .site-footer, .closing .footer, .footer') ||
      document.querySelector('#site-footer, footer');

    let activeId = tree[0].id;
    let activeChapterId = tree[0].id;

    function setActive(id, chapterId) {
      activeId = id;
      activeChapterId = chapterId || id;
      Object.entries(linkMap).forEach(([lid, a]) => {
        const isExact = lid === id;
        const isChapterCurrent = lid === activeChapterId && a.dataset.chapter === lid;
        a.classList.toggle('is-active', isExact);
        a.classList.toggle('is-current', !isExact && isChapterCurrent);
      });
      Object.entries(mobileMap).forEach(([lid, a]) => {
        a.classList.toggle('is-active', lid === activeChapterId);
        a.classList.toggle('is-current', lid === activeChapterId);
      });
      const mobileActive = mobileMap[activeChapterId];
      if (mobileActive && mobile.classList.contains('is-visible')) {
        mobileActive.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    function syncProgress() {
      const items = sortedSpy();
      if (!items.length) return;
      const mark = window.scrollY + window.innerHeight * 0.28;
      let idx = 0;
      items.forEach((item, i) => {
        const top = item.el.getBoundingClientRect().top + window.scrollY;
        if (top <= mark) idx = i;
      });
      const ratio = items.length === 1 ? 1 : idx / (items.length - 1);
      fill.style.height = `${Math.max(10, Math.min(100, ratio * 100))}%`;
    }

    function syncActiveFromScroll() {
      const items = sortedSpy();
      if (!items.length) return;
      const mark = window.innerHeight * 0.28;
      let current = items[0];
      for (let i = 0; i < items.length; i++) {
        const top = items[i].el.getBoundingClientRect().top;
        if (top <= mark) current = items[i];
        else break;
      }
      setActive(current.id, current.chapterId);
      syncProgress();
    }

    function syncChrome() {
      let visible = true;
      if (gate) {
        const pastGate = gate.getBoundingClientRect().bottom < 88;
        let beforeFooter = true;
        if (footEl) {
          beforeFooter = footEl.getBoundingClientRect().top > window.innerHeight * 0.55;
        }
        visible = pastGate && beforeFooter;
      }
      nav.classList.toggle('is-visible', visible);
      mobile.classList.toggle('is-visible', visible);

      const chapter = tree.find((c) => c.id === activeChapterId);
      const el = chapter ? chapter.el : null;
      const onDark = !!(el && (el.matches(DARK_SEL) || el.closest(DARK_SEL)));
      nav.classList.toggle('is-on-dark', onDark);
      mobile.classList.toggle('is-on-dark', onDark);
    }

    function onScroll() {
      syncActiveFromScroll();
      syncChrome();
    }

    function onJump(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.getElementById(a.dataset.target || a.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const chapterId = a.dataset.chapter || target.id;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(target.id, chapterId);
      syncChrome();
      syncProgress();
    }

    nav.addEventListener('click', onJump);
    mobile.addEventListener('click', onJump);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
