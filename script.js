document.addEventListener('DOMContentLoaded', () => {
    gsap.to('.navbar', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.5
    });
    
    gsap.to('.hero h1', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.7
    });
    
    gsap.to('.hero p', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.9
    });
    
    gsap.to('.contact-links', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2.1
    });
    
    gsap.to('.scroll-down', {
      opacity: 1,
      duration: 0.8,
      delay: 2.3
    });
    
    setTimeout(() => {
      const preloader = document.querySelector('.preloader');
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
        initializeAnimations();
        initCarousel();
        initTestimonialCarousel();
      }, 500);
    }, 1500);
  });
  
  function initializeAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.to(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8
      });
    });
    
    gsap.utils.toArray('.about-content').forEach(content => {
      gsap.to(content, {
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3
      });
    });
    
    gsap.utils.toArray('.skills-box').forEach((box, index) => {
      gsap.to(box, {
        scrollTrigger: {
          trigger: box,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 * index
      });
    });
    
    gsap.utils.toArray('.experience-card').forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1 * (index % 3)
      });
    });
    
    gsap.utils.toArray('.experience-throwback').forEach(container => {
      gsap.to(container, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3
      });
    });
    
    gsap.utils.toArray('.strategy-container').forEach(container => {
      gsap.to(container, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8
      });
    });
    
    gsap.utils.toArray('footer p').forEach(footer => {
      gsap.to(footer, {
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8
      });
    });
  }
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.querySelectorAll('.experience-card'));
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    const cardsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i+1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
    
    function updateCardWidths() {
      const newCardsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
      const cardWidth = 100 / newCardsPerSlide;
      
      cards.forEach(card => {
        card.style.width = `${cardWidth}%`;
        card.style.padding = '0 1rem';
      });
      
      return newCardsPerSlide;
    }
    
    function updateCardPositions() {
      const currentCardsPerSlide = updateCardWidths();
      const totalNewSlides = Math.ceil(cards.length / currentCardsPerSlide);
      
      if (currentSlide >= totalNewSlides) {
        currentSlide = totalNewSlides - 1;
      }
      
      const slideOffset = currentSlide * (100 / currentCardsPerSlide) * currentCardsPerSlide;
      track.style.transform = `translateX(-${slideOffset}%)`;
      
      const dots = Array.from(dotsContainer.children);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === totalNewSlides - 1;
    }
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updateCardPositions();
    }
    
    nextButton.addEventListener('click', () => {
      const currentCardsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
      const totalNewSlides = Math.ceil(cards.length / currentCardsPerSlide);
      
      if (currentSlide < totalNewSlides - 1) {
        currentSlide++;
        updateCardPositions();
      }
    });
    
    prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCardPositions();
      }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const currentCardsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
      const totalNewSlides = Math.ceil(cards.length / currentCardsPerSlide);
      
      if (touchEndX < touchStartX - swipeThreshold) {
        if (currentSlide < totalNewSlides - 1) {
          currentSlide++;
          updateCardPositions();
        }
      } else if (touchEndX > touchStartX + swipeThreshold) {
        if (currentSlide > 0) {
          currentSlide--;
          updateCardPositions();
        }
      }
    }
    
    updateCardPositions();
    
    window.addEventListener('resize', () => {
      const newCardsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 992 ? 2 : 3;
      const totalNewSlides = Math.ceil(cards.length / newCardsPerSlide);
      
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === currentSlide) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${i+1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
      
      updateCardPositions();
    });
  }
  
  function initTestimonialCarousel() {
    const track = document.querySelector('.testimonials-track');
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    const nextButton = document.querySelector('.next-testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to testimonial ${i+1}`);
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
    
    cards.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card.parentElement,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    function updatePositions() {
      const slideOffset = currentSlide * 100;
      track.style.transform = `translateX(-${slideOffset}%)`;
      
      const dots = Array.from(dotsContainer.children);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === totalSlides - 1;
    }
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      updatePositions();
    }
    
    nextButton.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updatePositions();
      }
    });
    
    prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updatePositions();
      }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updatePositions();
        }
      } else if (touchEndX > touchStartX + swipeThreshold) {
        if (currentSlide > 0) {
          currentSlide--;
          updatePositions();
        }
      }
    }
    
    updatePositions();
    
    window.addEventListener('resize', updatePositions);
  }