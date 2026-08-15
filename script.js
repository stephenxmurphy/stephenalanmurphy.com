const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track?.querySelectorAll('figure') || []);
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const count = carousel.querySelector('[data-carousel-count]');

  if (!track || !slides.length) return;

  const activeIndex = () => {
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const delta = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (delta < distance) {
        distance = delta;
        closest = index;
      }
    });
    return closest;
  };

  const updateCount = () => {
    if (count) count.textContent = `${activeIndex() + 1} / ${slides.length}`;
  };

  const goTo = (index) => {
    slides[Math.max(0, Math.min(index, slides.length - 1))]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };

  previous?.addEventListener('click', () => goTo(activeIndex() - 1));
  next?.addEventListener('click', () => goTo(activeIndex() + 1));

  let frame;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateCount);
  }, { passive: true });

  window.addEventListener('resize', updateCount, { passive: true });
  updateCount();
});
