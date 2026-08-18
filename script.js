const structureStylesheet = document.createElement('link');
structureStylesheet.rel = 'stylesheet';
structureStylesheet.href = 'project-structure.css';
document.head.append(structureStylesheet);

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const primaryNav = document.querySelector('.site-header nav');
const expertiseLink = primaryNav?.querySelector('a[href="#expertise"]');
const projectsLink = primaryNav?.querySelector('a[href="#work"]');
if (primaryNav && expertiseLink && projectsLink) {
  primaryNav.insertBefore(expertiseLink, projectsLink);
}

const expertiseAdditions = {
  'Programming & Simulation': 'Simcenter 3D',
  'Mechanical Design': 'vibration analysis and isolation'
};

document.querySelectorAll('#expertise .expertise-grid > div').forEach((item) => {
  const heading = item.querySelector('h2')?.textContent.trim();
  const copy = item.querySelector('p');
  const addition = expertiseAdditions[heading];
  if (copy && addition && !copy.textContent.includes(addition)) {
    copy.textContent = `${copy.textContent}, ${addition}`;
  }
});

const projectHeadings = () => Array.from(document.querySelectorAll(
  '.company-project h3, .project-section .project-header h2, .early-project h3'
));

const findProjectHeading = (title) => projectHeadings().find((heading) => heading.textContent.trim() === title);

const reverbHeading = projectHeadings().find((heading) => heading.textContent.trim() === 'Design of Wire-based Metal 3D Printer');
if (reverbHeading) reverbHeading.textContent = 'Wire-based Metal 3D Printer';

const smoothStyleHeading = findProjectHeading('Shark SmoothStyle');
const smoothStyleHeader = smoothStyleHeading?.closest('.subproject-header');
if (smoothStyleHeader && !smoothStyleHeader.querySelector('.project-copy')) {
  const blurb = document.createElement('p');
  blurb.className = 'project-copy';
  blurb.textContent = 'I supported the initial conceptual and R&D development of this device. The biggest challenge here was balancing the power budget to provide heated air and heated ceramic fins while also preventing the airflow from unintentionally cooling the ceramic fins.';
  smoothStyleHeader.append(blurb);
}

const flexStyleHeading = findProjectHeading('Shark FlexStyle');
const flexStyleCopy = flexStyleHeading?.closest('.subproject-header')?.querySelector('.project-copy');
if (flexStyleCopy) {
  flexStyleCopy.textContent = flexStyleCopy.textContent.replace(
    'I also have a design patent application under review for this innovative hair styling tool, which has been making waves in the market.',
    'I am a named inventor on three U.S. patents for this product, listed below.'
  );
}

const roleCorrections = new Map([
  ['Design of Boeing Sensorcraft for Aeroelastic Research', 'University of Victoria Centre for Aerospace Research · Mechanical Engineering Intern'],
  ['Pneumatic Launcher for <20 kg UAVs', 'University of Victoria Centre for Aerospace Research · Mechanical Engineering Intern'],
  ['MATLAB Heat Flux Distribution near Vancouver Island', 'Institute of Ocean Sciences · Oceanographic Modelling Intern'],
  ['Master of Engineering with a focus on Zinc-air Battery Modeling and Renewable Technologies', 'University of Victoria · Graduate Student'],
  ['Aircraft Design and Composite Construction of Drone', 'University of Victoria AERO Team · President & Aeronautical Lead']
]);

roleCorrections.forEach((role, title) => {
  const heading = findProjectHeading(title);
  const roleLine = heading?.closest('.early-copy')?.querySelector('.role-line');
  if (roleLine) roleLine.textContent = role;
});

const projectDefinitions = [
  { title: 'X-BAT', label: 'X-BAT', id: 'xbat' },
  { title: 'V-BAT Fixed Wing Aircraft', label: 'V-BAT', id: 'vbat' },
  { title: 'Gen 2 Counter-UAS Hardware', label: 'Gen 2 Counter-UAS', id: 'skysafe-gen2' },
  { title: 'Wire-based Metal 3D Printer', label: 'Metal 3D Printer', id: 'reverb-metal-printer' },
  { title: 'Shark FlexStyle', label: 'FlexStyle', id: 'flexstyle' },
  { title: 'Shark HyperAir', label: 'HyperAir', id: 'hyperair' },
  { title: 'Shark SpeedStyle', label: 'SpeedStyle', id: 'speedstyle' },
  { title: 'Shark SmoothStyle', label: 'SmoothStyle', id: 'smoothstyle' },
  { title: 'Drone Flight Planning and Control', label: 'Mission Control', id: 'mission-control' },
  { title: 'New Fixed-Wing UAS', label: 'Fixed-Wing UAS', id: 'intel-fixed-wing' },
  { title: '3-axis CNC Mill Design and Construction', label: 'CNC Mill', id: 'cnc-mill' },
  { title: 'Design of Boeing Sensorcraft for Aeroelastic Research', label: 'Sensorcraft', id: 'sensorcraft' },
  { title: 'Pneumatic Launcher for <20 kg UAVs', label: 'UAV Launcher', id: 'uav-launcher' },
  { title: 'MATLAB Heat Flux Distribution near Vancouver Island', label: 'MATLAB Heat Flux', id: 'matlab-heat-flux' },
  { title: 'Master of Engineering with a focus on Zinc-air Battery Modeling and Renewable Technologies', label: 'Zinc-air Battery', id: 'zinc-air-battery' },
  { title: 'Aircraft Design and Composite Construction of Drone', label: 'AERO UAV', id: 'aero-uav' }
];

projectDefinitions.forEach(({ title, id }) => {
  const heading = findProjectHeading(title);
  const container = heading?.closest('.company-project, .project-section, .early-project');
  if (container) container.id = id;
});

document.querySelectorAll('.company-section').forEach((section) => {
  const header = section.querySelector(':scope > .shell > .company-header');
  const projects = Array.from(section.querySelectorAll(':scope > .shell > .company-project'));
  if (!header || projects.length < 2 || section.querySelector('.company-project-links')) return;

  const nav = document.createElement('nav');
  nav.className = 'company-project-links';
  const company = header.querySelector('.kicker')?.textContent.trim() || 'Company';
  nav.setAttribute('aria-label', `${company} projects`);

  projects.forEach((project) => {
    const heading = project.querySelector('h3');
    if (!heading || !project.id) return;
    const link = document.createElement('a');
    link.href = `#${project.id}`;
    link.textContent = heading.textContent.replace(/^Shark\s+/, '');
    nav.append(link);
  });

  header.after(nav);
});

const sharkNinjaSection = Array.from(document.querySelectorAll('.company-section')).find((section) =>
  section.querySelector('.company-header .kicker')?.textContent.trim() === 'SharkNinja'
);

if (sharkNinjaSection && !document.querySelector('#sharkninja-patents')) {
  const patents = [
    { number: 'US 11,653,737 B1', url: 'https://patents.google.com/patent/US11653737B1/en' },
    { number: 'US 12,225,995 B2', url: 'https://patents.google.com/patent/US12225995B2/en' },
    { number: 'US 12,501,982 B2', url: 'https://patents.google.com/patent/US12501982B2/en' }
  ];

  const block = document.createElement('section');
  block.className = 'patents-block';
  block.id = 'sharkninja-patents';
  block.setAttribute('aria-labelledby', 'sharkninja-patents-title');

  const heading = document.createElement('h3');
  heading.id = 'sharkninja-patents-title';
  heading.textContent = 'Patents';

  const list = document.createElement('ul');
  list.className = 'patent-list';

  patents.forEach(({ number, url }) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';

    const title = document.createElement('span');
    title.textContent = 'Hair care appliance';
    const patentNumber = document.createElement('span');
    patentNumber.textContent = `${number} ↗`;

    link.append(title, patentNumber);
    item.append(link);
    list.append(item);
  });

  block.append(heading, list);
  sharkNinjaSection.querySelector(':scope > .shell')?.append(block);
}

const expertiseSection = document.querySelector('#expertise');
if (expertiseSection && !document.querySelector('.project-jump')) {
  const jump = document.createElement('section');
  jump.className = 'project-jump shell';
  jump.setAttribute('aria-labelledby', 'project-jump-title');

  const kicker = document.createElement('p');
  kicker.className = 'kicker';
  kicker.id = 'project-jump-title';
  kicker.textContent = 'Projects';

  const nav = document.createElement('nav');
  nav.className = 'project-jump-links';
  nav.setAttribute('aria-label', 'Jump to project');

  projectDefinitions.forEach(({ label, id }) => {
    if (!document.getElementById(id)) return;
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = label;
    nav.append(link);
  });

  jump.append(kicker, nav);
  expertiseSection.after(jump);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('[data-carousel]').forEach((carousel, carouselIndex) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(track?.querySelectorAll('figure') || []);
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const count = carousel.querySelector('[data-carousel-count]');

  if (!track || !slides.length) return;

  track.setAttribute('role', 'region');
  track.setAttribute('aria-roledescription', 'carousel');
  track.setAttribute('aria-label', `Project image carousel ${carouselIndex + 1}`);
  track.tabIndex = 0;

  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
  });

  if (count) count.setAttribute('aria-live', 'polite');

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

  const updateControls = () => {
    const index = activeIndex();
    if (count) count.textContent = `${index + 1} / ${slides.length}`;
    if (previous) previous.disabled = index === 0;
    if (next) next.disabled = index === slides.length - 1;
  };

  const goTo = (index) => {
    const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
    if (!target) return;

    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const left = track.scrollLeft + targetRect.left - trackRect.left;

    track.scrollTo({
      left,
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
