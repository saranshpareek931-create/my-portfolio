const preloader = document.querySelector('.preloader');
const fill = document.querySelector('.preloader__fill');
const percentage = document.querySelector('.preloader__percentage');

let count = 0;
const loaderTimer = setInterval(() => {
  count += 1;
  const value = Math.min(count, 100);
  fill.style.width = `${value}%`;
  percentage.textContent = `${value}%`;

  if (value >= 100) {
    clearInterval(loaderTimer);
    setTimeout(() => preloader.classList.add('is-hidden'), 450);
  }
}, 24);

const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove', (event) => {
  if (cursor) {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  }

  document.querySelectorAll('.portrait-wrap, .project__visual').forEach((target) => {
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const y = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
    target.style.transform = `perspective(1200px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translate3d(${(x * 8).toFixed(2)}px, ${(y * 8).toFixed(2)}px, 0)`;
  });
});

window.addEventListener('mouseleave', () => {
  document.querySelectorAll('.portrait-wrap, .project__visual').forEach((target) => {
    target.style.transform = '';
  });
});

const magneticButtons = document.querySelectorAll('.magnetic');

magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    if (cursor) cursor.classList.add('is-hovering');
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
    if (cursor) cursor.classList.remove('is-hovering');
  });
});

const revealElements = document.querySelectorAll('.reveal, .reveal-card, .reveal-text');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

window.addEventListener('pointerdown', () => {
  if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

window.addEventListener('pointerup', () => {
  if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});
