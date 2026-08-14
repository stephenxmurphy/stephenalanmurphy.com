const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// X-BAT: use Shield AI's own public, full-resolution media directly.
const xbatImages = new Map([
  ['Shield AI X-BAT aircraft', 'https://shield.ai/wp-content/uploads/2026/05/X-BAT_podcast-scaled-e1779208523800.png'],
  ['X-BAT prototype on launch platform', 'https://shield.ai/wp-content/uploads/2026/05/3-LRVs-scaled.png'],
  ['X-BAT aircraft on launch platforms', 'https://shield.ai/wp-content/uploads/2026/05/LRVs-scaled-1.png'],
  ['X-BAT in flight concept image', 'https://shield.ai/wp-content/uploads/2026/07/2026_Jul_17_Aven_HERO-scaled.png']
]);

// The old Wix page requested 250 px derivatives and the new layout was stretching
// those thumbnails across large cards. Wix's media ID before `/v1/` addresses the
// original uploaded asset, so use that instead and retain the thumbnail as fallback.
document.querySelectorAll('img').forEach((img, index) => {
  const originalSrc = img.getAttribute('src') || '';

  if (xbatImages.has(img.alt)) {
    img.src = xbatImages.get(img.alt);
  } else if (originalSrc.includes('static.wixstatic.com/media/') && originalSrc.includes('/v1/')) {
    const fullResolutionSrc = originalSrc.split('/v1/')[0];
    img.dataset.thumbnailFallback = originalSrc;
    img.src = fullResolutionSrc;
    img.addEventListener('error', () => {
      const fallback = img.dataset.thumbnailFallback;
      if (fallback && img.src !== fallback) {
        img.removeAttribute('data-thumbnail-fallback');
        img.src = fallback;
      }
    }, { once: true });
  }

  // Replace the one intentionally tiny (75 px) HyperAir CDN derivative.
  if (img.alt === 'Shark HyperAir hair dryer') {
    img.src = 'https://www.nfm.com/on/demandware.static/-/Sites-nfm-master-catalog/default/dw770b3652/images/062/62/62622006-1.jpg';
  }

  img.decoding = 'async';
  if (index > 0 && !img.closest('.feature-card')) img.loading = 'lazy';
});
