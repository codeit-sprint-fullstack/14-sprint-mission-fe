const DESKTOP_BREAKPOINT_REM = 75;
const SCROLL_TOP_THRESHOLD_REM = 6.25;

function remToPixels(remValue) {
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  return remValue * (Number.isNaN(rootFontSize) ? 16 : rootFontSize);
}

export function isDesktopViewport() {
  return window.innerWidth >= remToPixels(DESKTOP_BREAKPOINT_REM);
}

export function shouldShowScrollTopButton() {
  return isDesktopViewport() && window.scrollY > remToPixels(SCROLL_TOP_THRESHOLD_REM);
}

export function scrollToPageTop(behavior = 'smooth') {
  window.scrollTo({ top: 0, behavior });
}

export function handleMobileHeaderClick(event) {
  if (isDesktopViewport() || event.target.closest('a, button, input, select, textarea')) {
    return;
  }

  scrollToPageTop();
}

export function goToMarketTop() {
  if (window.location.hash === '#/market') {
    scrollToPageTop();
    return;
  }

  window.location.hash = '/market';
  window.setTimeout(() => scrollToPageTop(), 0);
}
