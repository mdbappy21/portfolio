document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const menuButton = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  menuButton?.addEventListener('click', () => {
    if (!mobileNav) return;

    const isOpen = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');

      if (menuButton) {
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // Application filters
  const filterButtons = document.querySelectorAll('.filter-chip');
  const appCards = document.querySelectorAll('.app-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      appCards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.status !== filter;
      });
    });
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');

  contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      alert('Please complete all fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=mdbappy21.cse@gmail.com&su=${subject}&body=${body}`;

    window.open(gmailUrl, '_blank');
  });

  // Dynamic footer year
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
  }
});
