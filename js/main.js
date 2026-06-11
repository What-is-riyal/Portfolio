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

// Nav border on scroll
const nav = document.querySelector(".nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
