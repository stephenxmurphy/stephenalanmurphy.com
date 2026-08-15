const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// These three images are already stored in the repo; replace the legacy HTML
// source URLs immediately so the rendered portfolio is fully local.
const localImages = {
  'SkySafe MM2 system': 'assets/projects/skysafe/mm2.jpg',
  'SkySafe MM2 counter-UAS system': 'assets/projects/skysafe/mm2.jpg',
  'Shark SpeedStyle hair dryer': 'assets/projects/shark/speedstyle.jpg',
  'Shark SmoothStyle heated comb and dryer brush': 'assets/projects/shark/smoothstyle.jpg'
};

document.querySelectorAll('img[alt]').forEach((img) => {
  const localSrc = localImages[img.alt];
  if (localSrc) img.src = localSrc;
});

// Keep captions tied to what the image actually shows.
const flexConcentrator = document.querySelector('img[alt="FlexStyle concentrator"]');
if (flexConcentrator) {
  const caption = flexConcentrator.closest('figure')?.querySelector('figcaption');
  if (caption) caption.textContent = 'FlexStyle concentrator. I optimized attachment sealing, surface temperature and airflow for this attachment.';

  const flexGallery = flexConcentrator.closest('details')?.querySelector('.gallery');
  if (flexGallery && !flexGallery.querySelector('img[alt="FlexStyle auto-wrap curlers and accessories"]')) {
    flexGallery.classList.remove('two');
    flexGallery.classList.add('three');
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = 'assets/projects/shark/flexstyle-accessories-lineup.webp';
    image.alt = 'FlexStyle auto-wrap curlers and accessories';
    image.loading = 'lazy';
    const curlerCaption = document.createElement('figcaption');
    curlerCaption.textContent = 'FlexStyle accessory lineup, including the Coanda auto-wrap curlers. I developed and optimized the curler geometry to use the Coanda effect to wrap hair around the barrel.';
    figure.append(image, curlerCaption);
    flexGallery.append(figure);
  }
}

const sensorcraftInternal = document.querySelector('img[alt="Sensorcraft internal fuselage structure"]');
if (sensorcraftInternal) {
  const caption = sensorcraftInternal.closest('figure')?.querySelector('figcaption');
  if (caption) caption.textContent = 'Fuselage internal structure and component packaging.';
}

const sensorcraftCad = document.querySelector('img[alt="Sensorcraft CAD render"]');
if (sensorcraftCad) {
  const caption = sensorcraftCad.closest('figure')?.querySelector('figcaption');
  if (caption) caption.textContent = 'Joined-wing Sensorcraft airframe CAD render.';
}

// The uploaded assembled-render image is effectively a duplicate of the airframe
// CAD view, so do not present it as a different technical image.
const duplicateSensorcraft = document.querySelector('img[alt="Assembled Sensorcraft render"]');
if (duplicateSensorcraft) duplicateSensorcraft.closest('figure')?.remove();
