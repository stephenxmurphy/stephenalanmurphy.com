const layoutStylesheet = document.createElement('link');
layoutStylesheet.rel = 'stylesheet';
layoutStylesheet.href = 'page-overrides.css';
document.head.append(layoutStylesheet);

const emailHref = 'mailto:s_murphy@outlook.com';

// Preserve old deep links from the former single-page portfolio.
if (document.body.classList.contains('landing-page') && window.location.hash) {
  const hash = window.location.hash;
  const professional = new Set(['#xbat-wing-fold','#xbat-ecs','#vbat','#skysafe-gen2','#reverb-metal-printer','#flexstyle','#hyperair','#speedstyle','#smoothstyle','#mission-control','#intel-fixed-wing','#cnc-mill']);
  const academic = new Set(['#sensorcraft','#uav-launcher','#matlab-heat-flux','#zinc-air-battery','#aero-uav','#bikes']);
  if (professional.has(hash)) window.location.replace(`projects.html${hash}`);
  if (academic.has(hash)) window.location.replace(`academic.html${hash}`);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Keep the same Resume + Email actions in the upper-right corner on every page.
document.querySelectorAll('.site-header').forEach((header) => {
  let actions = header.querySelector('.header-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'header-actions';
    header.append(actions);
  }

  const resume = header.querySelector('a.header-link[href*="Stephen_Murphy_Resume"]');
  if (resume && resume.parentElement !== actions) actions.append(resume);
  if (resume) resume.textContent = 'Resume';

  let email = actions.querySelector('a[href^="mailto:"]');
  if (!email) {
    email = document.createElement('a');
    email.className = 'header-link';
    email.href = emailHref;
    actions.append(email);
  }
  email.textContent = 'Email';
});

// Restore the academic page naming while leaving hobbies as a separate section.
document.querySelectorAll('a[href="academic.html"]').forEach((link) => {
  if (!link.closest('.contact-links')) link.textContent = 'Academic & Internship Projects';
});

if (document.body.classList.contains('academic-page')) {
  document.title = 'Academic & Internship Projects — Stephen Murphy';
  const title = document.querySelector('.page-hero h1');
  if (title) title.textContent = 'Academic & Internship Projects';
  const intro = document.querySelector('.page-hero > p:last-child');
  if (intro) intro.textContent = 'University, internship, research, and graduate work from the earlier part of my engineering career.';

  const hobbiesLink = document.querySelector('[data-company-link="bikes"]');
  const hobbiesWordmark = hobbiesLink?.querySelector('.logo-progress-wordmark');
  if (hobbiesWordmark) hobbiesWordmark.textContent = 'Hobbies';
  if (hobbiesLink) hobbiesLink.setAttribute('aria-label', 'Hobbies');

  const hobbiesKicker = document.querySelector('.bikes-intro .kicker');
  if (hobbiesKicker) hobbiesKicker.textContent = 'Hobbies';
}

// Update the professional-page handoff to the renamed academic page.
if (document.body.classList.contains('projects-page')) {
  const next = document.querySelector('.contact');
  const nextHeading = next?.querySelector('h2');
  if (nextHeading) nextHeading.textContent = 'Academic & internship projects.';
  const academicLink = next?.querySelector('a[href="academic.html"]');
  if (academicLink) academicLink.textContent = 'Academic & Internship Projects →';
}

// Footer stays intentionally minimal on all pages.
document.querySelectorAll('footer').forEach((footer) => {
  Array.from(footer.children).slice(1).forEach((child) => child.remove());
});

// Attach stable logo classes and use the actual MAVinci brand mark.
document.querySelectorAll('[data-company-link]').forEach((item) => {
  const key = item.dataset.companyLink;
  item.classList.add(`logo-${key}`);
});

const mavinciLink = document.querySelector('[data-company-link="mavinci"]');
if (mavinciLink) {
  const fallbackText = 'MAVinci';
  const image = document.createElement('img');
  image.src = 'https://business.esa.int/sites/business/files/MAVinci%20Logo.jpg';
  image.alt = 'MAVinci';
  image.loading = 'eager';
  image.addEventListener('error', () => {
    const fallback = document.createElement('span');
    fallback.className = 'logo-progress-wordmark';
    fallback.textContent = fallbackText;
    mavinciLink.replaceChildren(fallback);
  }, { once: true });
  mavinciLink.replaceChildren(image);
}

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

// Project carousels.
document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track?.querySelectorAll('figure') || []);
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const count = carousel.querySelector('[data-carousel-count]');

  if (!track || !slides.length) return;

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

  const slideLeft = (index) => {
    const target = slides[index];
    if (!target || !slides[0]) return 0;
    return target.offsetLeft - slides[0].offsetLeft;
  };

  const activeIndex = () => {
    let closest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const delta = Math.abs(track.scrollLeft - slideLeft(index));
      if (delta < distance) {
        distance = delta;
        closest = index;
      }
    });
    return closest;
  };

  const updateControls = () => {
    const index = activeIndex();
    if (count) count.textContent = `${index + 1} / ${slides.length}`;
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
  };

  const goTo = (index) => {
    const bounded = Math.max(0, Math.min(index, slides.length - 1));
    track.scrollTo({
      left: slideLeft(bounded),
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  };

  previous?.addEventListener('click', () => goTo(activeIndex() - 1));
  next?.addEventListener('click', () => goTo(activeIndex() + 1));

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex() - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex() + 1);
    }
  });

  let frame;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateControls);
  }, { passive: true });

  window.addEventListener('resize', updateControls, { passive: true });
  updateControls();
});

// Expand project images without changing the layout of the page.
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
