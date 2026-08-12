(function () {
  const body = document.body;
  const hero = document.querySelector('.case-hero, .hero-light, .hero-dark');
  const darkSnapshot = document.querySelector('.case-hero--dark + .snapshot, .hero-dark + .snapshot');
  const progress = document.getElementById('progress') || document.getElementById('cs-progress');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-outcome-story]').forEach((story) => {
    const steps = Array.from(story.querySelectorAll('[data-outcome-step]'));
    const visuals = Array.from(story.querySelectorAll('.outcome-story__visual figure'));
    if (!steps.length || steps.length !== visuals.length || !('IntersectionObserver' in window)) return;

    const activate = (step) => {
      const index = steps.indexOf(step);
      steps.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
      visuals.forEach((visual, visualIndex) => visual.classList.toggle('is-active', visualIndex === index));
    };

    const outcomeObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activate(visible.target);
    }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-18% 0px -34% 0px' });

    steps.forEach((step) => outcomeObserver.observe(step));
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fx').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.fx').forEach((element) => element.classList.add('in'));
  }

  const sync = () => {
    if (progress) {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${maximum > 0 ? Math.min(100, (window.scrollY / maximum) * 100) : 0}%`;
    }
    if (hero && body.classList.contains('case-study--dark-hero')) {
      const darkEnd = darkSnapshot ? darkSnapshot.offsetTop + darkSnapshot.offsetHeight : hero.offsetHeight;
      body.classList.toggle('is-scrolled-past-hero', window.scrollY > darkEnd - 72);
    }
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
})();
