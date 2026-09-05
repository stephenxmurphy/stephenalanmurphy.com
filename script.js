// Preserve old deep links from the former single-page portfolio.
if (document.body.classList.contains('landing-page') && window.location.hash) {
  const hash = window.location.hash;
  const professional = new Set([
    '#xbat-wing-fold',
    '#xbat-ecs',
    '#vbat',
    '#skysafe-gen2',
    '#reverb-metal-printer',
    '#flexstyle',
    '#hyperair',
    '#speedstyle',
    '#smoothstyle',
    '#mission-control',
    '#intel-fixed-wing',
    '#cnc-mill'
  ]);
  const academic = new Set([
    '#sensorcraft',
    '#uav-launcher',
    '#matlab-heat-flux',
    '#zinc-air-battery',
    '#aero-uav',
    '#bikes'
  ]);

  if (professional.has(hash)) window.location.replace(`projects.html${hash}`);
  if (academic.has(hash)) window.location.replace(`academic.html${hash}`);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Highlight the company/institution whose projects are currently in view.
const progressItems = Array.from(document.querySelectorAll('[data-company-link]'));
const companySections = Array.from(document.querySelectorAll('[data-company-section]'));
let activeCompany = '';

const setActiveCompany = (company) => {
  if (!company || company === activeCompany) return;
  activeCompany = company;

  progressItems.forEach((item) => {
    const active = item.dataset.companyLink === company;
    item.classList.toggle('is-active', active);

    if (active) {
      item.setAttribute('aria-current', 'true');
      if (window.innerWidth <= 720) {
        item.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    } else {
      item.removeAttribute('aria-current');
    }
  });
};

const updateCompanyProgress = () => {
  if (!companySections.length) return;

  const marker = window.scrollY + 190;
  let company = companySections[0].dataset.companySection;

  companySections.forEach((section) => {
    if (section.offsetTop <= marker) company = section.dataset.companySection;
  });

  setActiveCompany(company);
};

if (companySections.length) {
  let progressFrame;
  const scheduleProgressUpdate = () => {
    cancelAnimationFrame(progressFrame);
    progressFrame = requestAnimationFrame(updateCompanyProgress);
  };

  window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
  window.addEventListener('resize', scheduleProgressUpdate, { passive: true });
  updateCompanyProgress();
}

// Project carousels. Multi-slide carousels wrap in both directions so every
// visible arrow always has an action.
document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track?.querySelectorAll('figure') || []);
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const count = carousel.querySelector('[data-carousel-count]');

  if (!track || !slides.length) return;

  const singleSlide = slides.length === 1;
  carousel.classList.toggle('is-single-slide', singleSlide);

  track.setAttribute('role', 'region');
  track.setAttribute('aria-roledescription', 'carousel');
  track.setAttribute('aria-label', `Project media carousel ${carouselIndex + 1}`);
  track.tabIndex = 0;

  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
  });

  if (count) count.setAttribute('aria-live', 'polite');

  let currentIndex = 0;

  const nearestIndex = () => {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let distance = Infinity;

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const delta = Math.abs(slideCenter - trackCenter);
      if (delta < distance) {
        distance = delta;
        closest = index;
      }
    });

    return closest;
  };

  const updateControls = () => {
    currentIndex = nearestIndex();
    if (count) count.textContent = `${currentIndex + 1} / ${slides.length}`;

    if (previous) previous.disabled = singleSlide;
    if (next) next.disabled = singleSlide;
  };

  const goTo = (index) => {
    if (slides.length <= 1) return;

    currentIndex = (index + slides.length) % slides.length;
    const trackRect = track.getBoundingClientRect();
    const targetRect = slides[currentIndex].getBoundingClientRect();
    const left = track.scrollLeft + targetRect.left - trackRect.left;

    track.scrollTo({
      left,
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });

    if (count) count.textContent = `${currentIndex + 1} / ${slides.length}`;
  };

  previous?.addEventListener('click', () => {
    currentIndex = nearestIndex();
    goTo(currentIndex - 1);
  });

  next?.addEventListener('click', () => {
    currentIndex = nearestIndex();
    goTo(currentIndex + 1);
  });

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      currentIndex = nearestIndex();
      goTo(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      currentIndex = nearestIndex();
      goTo(currentIndex + 1);
    }
  });

  let carouselFrame;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(carouselFrame);
    carouselFrame = requestAnimationFrame(updateControls);
  }, { passive: true });

  window.addEventListener('resize', updateControls, { passive: true });
  updateControls();
});

// Expand project images without changing the page layout.
if (typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Expanded project image');
  dialog.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" type="button" aria-label="Close expanded image">×</button>
      <img alt="">
      <p class="lightbox-caption"></p>
    </div>`;
  document.body.append(dialog);

  const dialogImage = dialog.querySelector('img');
  const dialogCaption = dialog.querySelector('.lightbox-caption');
  const closeButton = dialog.querySelector('.lightbox-close');
  let returnFocus = null;

  const openImage = (image) => {
    const figure = image.closest('figure');
    const caption = figure?.querySelector('figcaption')?.textContent?.trim() || image.alt;

    returnFocus = image;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = caption;
    dialog.showModal();
    closeButton.focus();
  };

  document.querySelectorAll('.carousel figure img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Enlarge image: ${image.alt}`);
    image.addEventListener('click', () => openImage(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage(image);
      }
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    dialogImage.removeAttribute('src');
    returnFocus?.focus();
  });
}
