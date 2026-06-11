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

// Nav border on scroll
const nav = document.querySelector(".nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
