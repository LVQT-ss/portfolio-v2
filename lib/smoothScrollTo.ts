/**
 * Click handler for in-page "#anchor" links — routes the jump through the
 * shared Lenis instance (window.__lenis, set by SmoothScroll) so it eases in
 * instead of snapping instantly. Falls back to a native smooth scroll if
 * Lenis hasn't mounted yet (e.g. reduced-motion, or a race on first paint).
 */
export function smoothScrollTo(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#") || href.length < 2) return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(href);
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  history.pushState(null, "", href);
}
