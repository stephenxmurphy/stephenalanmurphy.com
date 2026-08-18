const structureStylesheet = document.createElement('link');
structureStylesheet.rel = 'stylesheet';
structureStylesheet.href = 'project-structure.css';
document.head.append(structureStylesheet);

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const wordmark = document.querySelector('.wordmark');
if (wordmark) {
  wordmark.textContent = 'Stephen Murphy';
  wordmark.setAttribute('aria-label', 'Stephen Murphy — back to top');
}

const footer = document.querySelector('footer');
if (footer) {
  const trailingPortfolio = Array.from(footer.children).find((child) => child.textContent.trim() === 'Portfolio');
  trailingPortfolio?.remove();
}

const primaryNav = document.querySelector('.site-header nav');
const expertiseLink = primaryNav?.querySelector('a[href="#expertise"]');
const projectsLink = primaryNav?.querySelector('a[href="#work"]');
if (expertiseLink) expertiseLink.textContent = 'Areas of Expertise';
if (primaryNav && expertiseLink && projectsLink) {
  primaryNav.insertBefore(expertiseLink, projectsLink);
}

const expertiseAdditions = {
  'Programming & Simulation': ['Simcenter 3D'],
  'Mechanical Design': [
    'vibration analysis and isolation',
    'batteries',
    'actuated systems',
    'mechanisms',
    'composites'
  ]
};

document.querySelectorAll('#expertise .expertise-grid > div').forEach((item) => {
  const heading = item.querySelector('h2')?.textContent.trim();
  const copy = item.querySelector('p');
  const additions = expertiseAdditions[heading] || [];
  additions.forEach((addition) => {
    if (copy && !copy.textContent.toLowerCase().includes(addition.toLowerCase())) {
      copy.textContent = `${copy.textContent}, ${addition}`;
    }
  });
});

const projectHeadings = () => Array.from(document.querySelectorAll(
  '.company-project h3, .project-section .project-header h2, .early-project h3'
));

const findProjectHeading = (title) => projectHeadings().find((heading) => heading.textContent.trim() === title);
const splitRole = (text) => {
  const parts = text.split('·').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1
    ? { company: parts[0], role: parts.slice(1).join(' · ') }
    : { company: parts[0] || '', role: '' };
};

const reverbHeading = projectHeadings().find((heading) => heading.textContent.trim() === 'Design of Wire-based Metal 3D Printer');
if (reverbHeading) reverbHeading.textContent = 'Wire-based Metal 3D Printer';

const xbatHeading = findProjectHeading('X-BAT');
const xbatProject = xbatHeading?.closest('.company-project');
if (xbatHeading && xbatProject) {
  xbatHeading.textContent = 'X-BAT Wing-fold';

  const xbatCopy = xbatProject.querySelector('.project-copy');
  if (xbatCopy) {
    xbatCopy.replaceChildren();
    const paragraph = document.createElement('p');
    paragraph.textContent = 'In my role as Sr. Staff Mechanical Engineer at Shield AI, I work on actuated systems and various mechanical integrations as part of the Mechanical Systems team. My biggest project to date has been the conceptual design and analysis of the X-BAT wing fold system, one of the most ambitious fighter jet wing fold systems in the last several decades. This wing fold system uses hydraulic actuators to fold a very large portion of the wingspan into an extremely small width and height to enable transport of the X-BAT vehicle on the most common US air force vehicles (C-5 and C-130). It has a double hinge design coupled to a large bell crank and dual hydraulic actuators to rotate each side of the wing through ~180 degrees of motion with each wing stacking on top of each other. For this project, I owned the entire wing fold system including mechanism design, planform impacts, door layouts and down-locks, structural lock-pins, actuator sizing, and hydraulic subsystem.';
    xbatCopy.append(paragraph);
  }

  const xbatCarousel = xbatProject.querySelector('[data-carousel-track]');
  if (xbatCarousel && !xbatCarousel.querySelector('iframe[src*="5OPhq1TAAxY"]')) {
    const comparison = document.createElement('figure');
    comparison.className = 'video-slide';
    comparison.innerHTML = '<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/5OPhq1TAAxY?start=35&rel=0" title="X-47B wing fold example" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><figcaption>The X-BAT wing fold system builds on the achievements of the X-47B design with notable improvements to folded span and folded package size.</figcaption>';
    xbatCarousel.append(comparison);
  }

  if (!document.querySelector('#xbat-ecs')) {
    const ecsProject = document.createElement('article');
    ecsProject.className = 'company-project text-and-media-project';
    ecsProject.id = 'xbat-ecs';

    const header = document.createElement('header');
    header.className = 'subproject-header';

    const titleBlock = document.createElement('div');
    const role = document.createElement('p');
    role.className = 'role-line';
    role.textContent = 'Sr. Staff Mechanical Engineer';
    const heading = document.createElement('h3');
    heading.textContent = 'X-BAT Hopper Prototype ECS';
    titleBlock.append(role, heading);

    const copy = document.createElement('p');
    copy.className = 'project-copy';
    copy.textContent = 'Hopper is the first flight-ready prototype of the X-BAT vehicle which will be used to demonstrate the vertical take-off and landing of the X-BAT on the launch and recovery vehicle (LRV) at the end of 2026. Successful completion of this test will demonstrate the ability to achieve vertical take-off and landing of a fighter jet using a traditional jet engine, akin to how SpaceX proved that vertical take-off and landing was possible with rocket engines. By doing so, Shield AI will prove that fighter jets no longer need runways, which will have massive impacts on US air superiority for decades to come. On this Hopper prototype, I was responsible for the mechanical integration of the ECS (Environmental Cooling System) which included the mechanical design and analysis of a coolant tank, multiple heat exchangers, manifolds, plumbing, instrumentation, and cooling fans.';

    header.append(titleBlock, copy);

    const media = document.createElement('div');
    media.className = 'carousel-wrap';
    media.setAttribute('data-carousel', '');
    media.innerHTML = `
      <div class="carousel compact-carousel" data-carousel-track>
        <figure class="video-slide">
          <div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/17_P4x0k3XM?rel=0" title="X-BAT Hopper prototype" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
          <figcaption>X-BAT Hopper prototype.</figcaption>
        </figure>
      </div>
      <div class="carousel-controls"><span class="carousel-count" data-carousel-count>1 / 1</span><div><button type="button" data-carousel-prev aria-label="Previous Hopper ECS media">←</button><button type="button" data-carousel-next aria-label="Next Hopper ECS media">→</button></div></div>`;

    ecsProject.append(header, media);
    xbatProject.after(ecsProject);
  }
}

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
    'I am a named inventor on eight U.S. patents for this product, with one additional U.S. application pending; see the patents list below.'
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

// Company bands are company/context only. Roles live with the projects.
document.querySelectorAll('.company-header .company-role').forEach((role) => role.remove());

document.querySelectorAll('.company-section').forEach((section) => {
  const company = section.querySelector('.company-header .kicker')?.textContent.trim() || '';
  section.querySelectorAll('.company-project').forEach((project) => {
    const header = project.querySelector('.subproject-header');
    if (!header) return;

    let roleLine = header.querySelector('.role-line');
    if (!roleLine && company === 'SharkNinja') {
      roleLine = document.createElement('p');
      roleLine.className = 'role-line';
      roleLine.textContent = 'Design Manager, AD & NPD';
      const title = header.querySelector('h3');
      title?.before(roleLine);
    } else if (roleLine?.textContent.includes('·')) {
      roleLine.textContent = splitRole(roleLine.textContent).role;
    }
  });
});

// Single-project employers get the same visual company-band cue without duplicating the project title.
document.querySelectorAll('.project-section').forEach((section) => {
  const shell = section.querySelector(':scope > .shell');
  const header = shell?.querySelector(':scope > .project-header');
  const roleLine = header?.querySelector('.role-line');
  if (!shell || !header || !roleLine || shell.querySelector(':scope > .single-company-band')) return;

  const { company, role } = splitRole(roleLine.textContent);
  if (!company) return;

  const band = document.createElement('header');
  band.className = 'single-company-band';
  const companyName = document.createElement('h2');
  companyName.textContent = company;
  band.append(companyName);
  shell.insertBefore(band, header);

  if (role) roleLine.textContent = role;
});

// Earlier work uses the same company-band convention. Consecutive projects at the same employer share one band.
let previousEarlyCompany = '';
document.querySelectorAll('.early-project').forEach((project) => {
  const roleLine = project.querySelector('.early-copy .role-line');
  if (!roleLine) return;
  const { company, role } = splitRole(roleLine.textContent);
  if (!company) return;

  if (company !== previousEarlyCompany) {
    const band = document.createElement('header');
    band.className = 'early-company-band';
    const companyName = document.createElement('h2');
    companyName.textContent = company;
    band.append(companyName);
    project.before(band);
  }

  previousEarlyCompany = company;
  if (role) roleLine.textContent = role;
});

const projectDefinitions = [
  { title: 'X-BAT Wing-fold', label: 'X-BAT Wing-fold', id: 'xbat-wing-fold' },
  { title: 'X-BAT Hopper Prototype ECS', label: 'X-BAT Hopper ECS', id: 'xbat-ecs' },
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
    { number: '11,653,737', suffix: 'B1', url: 'https://patents.google.com/patent/US11653737B1/en' },
    { number: '11,832,700', suffix: 'B2', url: 'https://patents.google.com/patent/US11832700B2/en' },
    { number: '12,225,995', suffix: 'B2', url: 'https://patents.google.com/patent/US12225995B2/en' },
    { number: '12,501,982', suffix: 'B2', url: 'https://patents.google.com/patent/US12501982B2/en' },
    { number: '12,507,780', suffix: 'B2', url: 'https://patents.google.com/patent/US12507780B2/en' },
    { number: '12,507,781', suffix: 'B2', url: 'https://patents.google.com/patent/US12507781B2/en' },
    { number: '12,569,045', suffix: 'B2', url: 'https://patents.google.com/patent/US12569045B2/en' },
    { number: '12,569,046', suffix: 'B2', url: 'https://patents.google.com/patent/US12569046B2/en' },
    { number: '2025/0143433', suffix: 'A1 · pending', url: 'https://patents.google.com/patent/US20250143433A1/en' }
  ];

  const block = document.createElement('section');
  block.className = 'patents-block';
  block.id = 'sharkninja-patents';
  block.setAttribute('aria-labelledby', 'sharkninja-patents-title');

  const heading = document.createElement('h3');
  heading.id = 'sharkninja-patents-title';
  heading.textContent = 'Patents';

  const family = document.createElement('p');
  family.className = 'patent-family';
  family.textContent = 'Hair care appliance — 8 granted U.S. patents · 1 pending U.S. application';

  const links = document.createElement('div');
  links.className = 'patent-number-links';

  patents.forEach(({ number, suffix, url }) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = `US ${number} ${suffix} ↗`;
    links.append(link);
  });

  block.append(heading, family, links);
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
