const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const heroLinks = document.querySelector('.hero-links');
if (heroLinks && !heroLinks.querySelector('a[href*="Stephen_Murphy_Resume_2023.pdf"]')) {
  const resume = document.createElement('a');
  resume.className = 'button';
  resume.href = 'assets/resume/Stephen_Murphy_Resume_2023.pdf';
  resume.target = '_blank';
  resume.rel = 'noopener';
  resume.textContent = 'Résumé ↗';

  const linkedIn = heroLinks.querySelector('a[href*="linkedin.com"]');
  heroLinks.insertBefore(resume, linkedIn || null);
}
