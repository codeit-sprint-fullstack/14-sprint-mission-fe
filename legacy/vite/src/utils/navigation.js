const SCROLL_TOP_THRESHOLD_REM = 6.25;

function remToPixels(remValue) {
  const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  return remValue * (Number.isNaN(rootFontSize) ? 16 : rootFontSize);
}

export function shouldShowScrollTopButton() {
  return window.scrollY > remToPixels(SCROLL_TOP_THRESHOLD_REM);
}

export function scrollToPageTop(behavior = 'smooth') {
  window.scrollTo({ top: 0, behavior });
}

export function goToMarketTop() {
  if (window.location.pathname === '/items') {
    scrollToPageTop();
    return;
  }

  window.location.assign('/items');
  window.setTimeout(() => scrollToPageTop(), 0);
}
