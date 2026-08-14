const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

// Keep X-BAT media self-hosted so the portfolio does not depend on third-party hotlinks.
const xbatImages=[
  ['img[alt="Shield AI X-BAT aircraft"]','assets/xbat/xbat-feature.webp'],
  ['img[src*="grandfleet.info"]','assets/xbat/xbat-vtol-cycle.webp'],
  ['img[src*="technews.tw"]','assets/xbat/xbat-footprint.webp'],
  ['img[src*="autoevolution.com"]','assets/xbat/xbat-propulsion.webp']
];
xbatImages.forEach(([selector,src])=>{const img=document.querySelector(selector);if(img)img.src=src;});
