const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

// Use Shield AI's own public media for X-BAT. These replace the old broken local/third-party sources.
const xbatImages=[
  ['img[alt="Shield AI X-BAT aircraft"]','https://shield.ai/wp-content/uploads/2026/05/X-BAT_podcast-scaled-e1779208523800.png'],
  ['img[src*="grandfleet.info"], img[src*="xbat-vtol-cycle"]','https://shield.ai/wp-content/uploads/2026/05/3-LRVs-scaled.png'],
  ['img[src*="technews.tw"], img[src*="xbat-footprint"]','https://shield.ai/wp-content/uploads/2026/05/LRVs-scaled-1.png'],
  ['img[src*="autoevolution.com"], img[src*="xbat-propulsion"]','https://shield.ai/wp-content/uploads/2026/07/2026_Jul_17_Aven_HERO-scaled.png']
];
xbatImages.forEach(([selector,src])=>{document.querySelectorAll(selector).forEach(img=>{img.src=src;});});