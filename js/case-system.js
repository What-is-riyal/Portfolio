(function () {
  const body = document.body;
  const hero = document.querySelector('.case-hero, .hero-light, .hero-dark');
  const darkSnapshot = document.querySelector('.case-hero--dark + .snapshot, .hero-dark + .snapshot');
  const progress = document.getElementById('progress') || document.getElementById('cs-progress');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
