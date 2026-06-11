// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Cross-highlight coded phrases and their legend cards in the hero
const litToggle = (code, on) => {
  document.querySelectorAll(`[data-code="${code}"]`).forEach((el) => {
    el.classList.toggle("lit", on);
  });
};

document.querySelectorAll("[data-code]").forEach((el) => {
  el.addEventListener("mouseenter", () => litToggle(el.dataset.code, true));
  el.addEventListener("mouseleave", () => litToggle(el.dataset.code, false));
});

// Easter egg: type "why" anywhere to open every turn at once
let typed = "";
let toast;

const showToast = (open) => {
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "sticky-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = open
    ? 'You asked <em>why</em>. All the turns are open.<span class="toast-small">type it again to fold them back</span>'
    : "Folded. Curiosity is a toggle.";
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 5000);
};

document.addEventListener("keydown", (e) => {
  if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
  typed = (typed + e.key.toLowerCase()).slice(-3);
  if (typed === "why") {
    const open = document.body.classList.toggle("curious");
    showToast(open);
    typed = "";
  }
});

// Nav border + scroll progress
const nav = document.querySelector(".nav");
const progress = document.getElementById("progress");
const onScroll = () => {
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  if (progress) {
    const doc = document.documentElement;
    progress.style.width = (doc.scrollTop / (doc.scrollHeight - window.innerHeight)) * 100 + "%";
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Count up the numbers band when it scrolls into view
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const counters = document.querySelectorAll("[data-count]");
if (counters.length && !reduceMotion) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const start = performance.now();
        const tick = (now) => {
          const k = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * eased);
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => countObserver.observe(el));
}
