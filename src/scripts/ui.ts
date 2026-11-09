// Page interactions: mobile menu, active anchor, mobile action bar, service accordion (< 900px).
// Without JS every item stays visible and usable (anchors, links); this only adds behaviour.

const desktop = window.matchMedia("(min-width: 900px)");

/* Mobile menu */
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
function setMenu(open: boolean, restoreFocus = false) {
  if (!toggle || !menu) return;
  toggle.setAttribute("aria-expanded", String(open));
  menu.hidden = !open;
  document.documentElement.style.overflowY = open ? "hidden" : "";
  if (open) menu.querySelector<HTMLElement>("a")?.focus();
  else if (restoreFocus) toggle.focus();
}
toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
menu?.querySelectorAll<HTMLAnchorElement>("[data-menu-link]").forEach((a) => a.addEventListener("click", (e) => {
  const hash = a.getAttribute("href") || "";
  const target = hash.startsWith("#") ? document.getElementById(hash.slice(1)) : null;
  if (!target) { setMenu(false); return; }
  // Close the menu and release the scroll lock first, then scroll: a locked page ignores the anchor jump.
  e.preventDefault();
  setMenu(false, false);
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
}));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
});
window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* Active anchor in the header */
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
if ("IntersectionObserver" in window && links.length) {
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
      const a = byId.get(e.target.id);
      if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "location"); }
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

/* Mobile action bar: appears once the hero (with its own buttons) has left the screen */
const bar = document.querySelector<HTMLElement>("[data-action-bar]");
const hero = document.querySelector<HTMLElement>("[data-hero]");
if (bar && hero) {
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      const shown = !e.isIntersecting;
      bar.classList.toggle("is-shown", shown);
      bar.inert = !shown;
    }, { rootMargin: "0px 0px -35% 0px" }).observe(hero);
  } else {
    bar.classList.add("is-shown");
  }
}

/* Services accordion on phones: «Діагностика» open, the rest collapsed */
const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-svc]"));
function setRow(row: HTMLElement, open: boolean) {
  const btn = row.querySelector<HTMLButtonElement>("[data-svc-toggle]");
  row.dataset.open = String(open);
  btn?.setAttribute("aria-expanded", String(open));
}
function applyMode() {
  rows.forEach((row) => setRow(row, desktop.matches || row.hasAttribute("data-svc-lead")));
}
rows.forEach((row) => {
  row.querySelector<HTMLButtonElement>("[data-svc-toggle]")?.addEventListener("click", () => setRow(row, row.dataset.open !== "true"));
});
applyMode();
desktop.addEventListener("change", applyMode);
