// GSAP and ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: { smooth: true }, 
  tablet: { smooth: true }, 
});

// Update ScrollTrigger with Locomotive Scroll
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed",
});


 window.addEventListener("resize", () => {
  setTimeout(() => {
    locoScroll.update(); 
    ScrollTrigger.refresh(); 
  }, 150); 
});


// Refresh Locomotive Scroll and ScrollTrigger
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


locoScroll.on("scroll", () => {
  document.querySelectorAll("section").forEach(section => {
    const id = section.getAttribute("id");
    if (locoScroll.scroll.instance.scroll.y >= section.offsetTop - 50) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
});


document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute("href"));
    if (target) {
      locoScroll.scrollTo(target); 
    }
  });
});


// Navbar Animation
function animateNavbar() {
  gsap.from(".navbar", {
    duration: 1.5,
    y: -100,
    opacity: 0,
    ease: "power4.out",
  });

  gsap.from(".nav-link", {
    duration: 0.8,
    stagger: 2,
    ease: "power4.out",
  });

  gsap.from(".nav-btn", {
    duration: 1,
    scale: 0.5,
    opacity: 0,
    ease: "elastic.out(1, 0.75)",
    delay: 0.8,
  });
}

animateNavbar()

// Hero Section Animation
function animateHeroSection() {
  gsap.from(".hero-text", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    stagger: 0.6,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".hero-img img", {
    opacity: 0,
    x: 100,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.8,
  });
}

animateHeroSection();

// Animation
function animateFeaturesOnScroll() {
  gsap.from("#feature-top img", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]",
      start: "top 30%",
      scrub: true,
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(".feature-item h2, .feature-item p", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]",
      start: "top 30%",
      scrub: true,
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
  });

  gsap.from("#feature-1, #feature-2, #feature-3", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]",
      start: "top 30%",
      scrub: true,
    },
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
  });
}

animateFeaturesOnScroll();

// Text Animation
function animateCommonTextOnScroll() {
  gsap.from("#common-text h2", {
    scrollTrigger: {
      trigger: "#common-text h2",
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    x: -50,
    duration: 1.5,
    ease: "power3.out",
  });

  gsap.from("#common-text p", {
    scrollTrigger: {
      trigger: "#common-text p",
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      toggleActions: "play none none reset",
    },
    opacity: 0,
    x: 50,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.3,
  });
}

animateCommonTextOnScroll();

// Learn More Section Animation
function animateLearnMoreSection() {
  const img = document.querySelector(".learn-more-section .hero-img");
  const heading = document.querySelector(".learn-more-section .hero-text h2");
  const paragraph = document.querySelector(".learn-more-section .hero-text p");
  const button = document.querySelector(".learn-more-section .hero-text button");

  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset",
      once: false,
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(paragraph, {
    scrollTrigger: {
      trigger: paragraph,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(button, {
    scrollTrigger: {
      trigger: button,
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
}

animateLearnMoreSection();

// Services Section Animation
function animateServicesAndText() {
  const heading = document.querySelector(".service-section h2");
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power2.out",
  });

  const paragraph = document.querySelector(".service-section p");
  gsap.from(paragraph, {
    scrollTrigger: {
      trigger: paragraph,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: 20,
    duration: 1.5,
    ease: "power2.out",
  });

  const services = document.querySelectorAll(".skill-section .col-lg-4");

  services.forEach((service) => {
    gsap.from(service, {
      scrollTrigger: {
        trigger: service,
        scroller: "[data-scroll-container]",
        start: "top 90%",
        end: "bottom top",
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 1.5,
      ease: "bounce.out",
    });
  });
}

animateServicesAndText();

// Pricing Section Animation
function animatePricingSection() {
  const heading = document.querySelector("#pricing h2");
  const paragraph = document.querySelector("#pricing p");

  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power2.out",
  });

  gsap.from(paragraph, {
    scrollTrigger: {
      trigger: paragraph,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: 20,
    duration: 1.5,
    ease: "power2.out",
  });

  const cards = document.querySelectorAll(".box");

  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        scroller: "[data-scroll-container]",
        start: "top 85%",
        end: "bottom top",
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      scale: 0.85,
      rotateY: 10,
      skewX: 10,
      duration: 1.5,
      ease: "power3.out",
      delay: index * 0.15,
    });

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        rotateY: 0,
        skewX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 0.85,
        rotateY: 10,
        skewX: 10,
        duration: 0.5,
        ease: "power2.in",
      });
    });
  });
}

animatePricingSection();

// Header section Animation
function animateHeader() {
  const heading = document.querySelector("#faq h2");
  const paragraph = document.querySelector("#faq p");

  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power2.out",
  });

  gsap.from(paragraph, {
    scrollTrigger: {
      trigger: paragraph,
      scroller: "[data-scroll-container]",
      start: "top 90%",
      end: "bottom top",
      scrub: 1,
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 20,
    duration: 1.5,
    ease: "power2.out",
  });
}
animateHeader();

// Testimonial section Animation
function animateBottom() {
  gsap.from("#testimonial h2", {
    scrollTrigger: {
      trigger: "#testimonial",
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  gsap.from("#testimonial p", {
    scrollTrigger: {
      trigger: "#testimonial",
      scroller: "[data-scroll-container]",
      start: "top 75%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.3,
  });

  gsap.from("#play-store-img, #apple-store-img", {
    scrollTrigger: {
      trigger: "#testimonial",
      scroller: "[data-scroll-container]",
      start: "top 70%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    x: 80,
    duration: 1,
    delay: 0.6,
    stagger: 0.2,
  });

  gsap.from("#testimonialImage", {
    scrollTrigger: {
      trigger: "#testimonialImage",
      scroller: "[data-scroll-container]",
      start: "top 70%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    x: 100,
    duration: 1,
  });
}
animateBottom();


// Footer Animation
function animateFooter() {
  const scrollContainer = "[data-scroll-container]";

  const generalAnimationSettings = {
    scrollTrigger: {
      trigger: "#footer",
      scroller: scrollContainer,
      start: "top 90%",
      end: "top 40%",
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 30,
    duration: 1,
  };

  gsap.from("#footer .logo", {
    ...generalAnimationSettings,
    scrollTrigger: {
      ...generalAnimationSettings.scrollTrigger,
      end: "bottom 30%",
    },
  });

  gsap.from("#footer .links li", {
    ...generalAnimationSettings,
    scrollTrigger: {
      ...generalAnimationSettings.scrollTrigger,
      start: "top 95%",
      end: "top 50%",
    },
    x: -50,
    stagger: 0.2,
  });

  gsap.from("#footer .social-icons i", {
    ...generalAnimationSettings,
    stagger: 0.2,
  });

  gsap.from("#footer p", {
    ...generalAnimationSettings,
    delay: 1,
  });
}

animateFooter();









