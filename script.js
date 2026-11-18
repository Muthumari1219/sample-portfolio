/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - MUTHUMARI P
 * Handles interactive features:
 * 1. Mobile Navigation Toggle & Auto-Close
 * 2. Sticky Header with dynamic blur effect
 * 3. Active Nav Link Highlighting (IntersectionObserver)
 * 4. Scroll Reveal Animations
 * 5. Back to Top Button
 * 6. Contact Form Validation & Submission Feedback
 * 7. Dynamic Current Year in Footer
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
   * 1. MOBILE NAVIGATION MENU TOGGLE
   * ============================================================ */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      
      // Toggle between hamburger icon and close 'X' icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Auto-close menu when any navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  /* ============================================================
   * 2. STICKY HEADER SHADOW ON SCROLL
   * ============================================================ */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ============================================================
   * 3. ACTIVE NAVIGATION LINK ON SCROLL
   * Uses IntersectionObserver for smooth and accurate highlighting
   * ============================================================ */
  const sections = document.querySelectorAll('section[id]');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  /* ============================================================
   * 4. SCROLL REVEAL ANIMATIONS
   * Automatically adds reveal classes and animates elements as they enter viewport
   * ============================================================ */
  const animatedElements = document.querySelectorAll(
    '.hero-content, .hero-visual, .about-narrative, .about-info-cards, ' +
    '.timeline-item, .skill-category, .project-card, .experience-card, ' +
    '.achieve-card, .contact-info-card, .contact-form-card'
  );

  animatedElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once animated so it doesn't re-trigger unnecessarily
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => revealObserver.observe(el));

  /* ============================================================
   * 5. BACK TO TOP BUTTON
   * Shows when user scrolls down and smoothly scrolls back up
   * ============================================================ */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ============================================================
   * 6. CONTACT FORM VALIDATION & SUBMISSION SIMULATION
   * Validates name, email, subject, and message.
   * ============================================================ */
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  // Input elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Error message elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Email format regex validator
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (input, errorEl, condition, defaultText) => {
    if (!condition) {
      input.classList.add('invalid');
      errorEl.classList.add('visible');
      return false;
    } else {
      input.classList.remove('invalid');
      errorEl.classList.remove('visible');
      return true;
    }
  };

  // Real-time error removal on user input
  if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, nameError, nameInput.value.trim().length >= 2));
  if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, emailError, isValidEmail(emailInput.value.trim())));
  if (subjectInput) subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3));
  if (messageInput) messageInput.addEventListener('input', () => validateField(messageInput, messageError, messageInput.value.trim().length >= 10));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Run full form validations
      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3);
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields correctly before submitting.';
        return;
      }

      // Show submitting state
      formSubmitBtn.disabled = true;
      const originalBtnHTML = formSubmitBtn.innerHTML;
      formSubmitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';

      // Simulate a network dispatch (e.g. to Formspree, EmailJS, or custom API)
      setTimeout(() => {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnHTML;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been received. 
          I will review your message and reply via <em>${emailInput.value.trim()}</em> soon.
        `;

        // Reset form inputs
        contactForm.reset();

        // Clear status alert after 7 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 7000);
      }, 1000);
    });
  }

  /* ============================================================
   * 7. DYNAMIC CURRENT YEAR
   * ============================================================ */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
