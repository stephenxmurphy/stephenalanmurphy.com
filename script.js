const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

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
