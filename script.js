const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Replace the last three legacy remote image references with local repo assets.
const localImageReplacements = [
  ['img[alt="SkySafe MM2 system"], img[alt="SkySafe MM2 counter-UAS system"]', 'assets/projects/skysafe/mm2.jpg'],
  ['img[alt="Shark SpeedStyle hair dryer"]', 'assets/projects/shark/speedstyle.jpg'],
  ['img[alt="Shark SmoothStyle heated comb and dryer brush"]', 'assets/projects/shark/smoothstyle.jpg']
];

localImageReplacements.forEach(([selector, src]) => {
  document.querySelectorAll(selector).forEach((img) => {
    img.src = src;
  });
});
