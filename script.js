/* ── CUSTOM CURSOR ──────────────────────────────────────── */
const dot  = document.createElement('div');
const ring = document.createElement('div');
dot.className  = 'cursor-dot';
ring.className = 'cursor-ring';
document.body.append(dot, ring);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Ring follows with a lag
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow ring on hoverable elements
document.querySelectorAll('a, button, .project-card, .skills-list li').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});


/* ── PAGE TRANSITION ────────────────────────────────────── */
const overlay = document.createElement('div');
overlay.className = 'page-overlay';
document.body.appendChild(overlay);

// Fade in on load
window.addEventListener('load', () => {
  overlay.classList.remove('visible');
});

// Fade out on external link clicks
document.querySelectorAll('a[href^="http"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;
    overlay.classList.add('visible');
    setTimeout(() => window.open(href, '_blank'), 400);
    setTimeout(() => overlay.classList.remove('visible'), 800);
  });
});


/* ── NAV ────────────────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

toggle.addEventListener('click', () => navLinks.classList.toggle('open'));

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


/* ── ANIMATED HERO TEXT ─────────────────────────────────── */
const h1 = document.querySelector('#hero h1');
if (h1) {
  const words = h1.textContent.trim().split(' ');
  h1.innerHTML = words.map((w, i) =>
    `<span class="hero-word" style="animation-delay:${i * 0.1}s">${w}</span>`
  ).join(' ');
}


/* ── SCROLL FADE-IN ─────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  'section, .project-card, .skills-list li, .contact-link'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));