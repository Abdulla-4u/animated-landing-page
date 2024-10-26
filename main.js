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


 // Refresh ScrollTrigger and Locomotive Scroll on resize
 window.addEventListener("resize", () => {
  setTimeout(() => {
    locoScroll.update(); 
    ScrollTrigger.refresh(); 
  }, 150); 
});


// Refresh Locomotive Scroll and ScrollTrigger
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// Smooth scrolling for nav links with Locomotive Scroll
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute("href"));
    if (target) {
      locoScroll.scrollTo(target); 
    }
  });
});

// Optional: Update active link based on scroll position
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



function animateNavbar() {
  gsap.from(".navbar", {
    duration: 1.5,
    y: -100, // Slide from top
    opacity: 0, // Start from transparent
    ease: "power4.out",
  });

  // Staggered animation for nav links
  gsap.from(".nav-link", {
    duration: 0.8,
    stagger: 2, // Animate each link with a delay
    ease: "power4.out",
  });

  // Button animation
  gsap.from(".nav-btn", {
    duration: 1,
    scale: 0.5, // Start small and grow
    opacity: 0,
    ease: "elastic.out(1, 0.75)",
    delay: 0.8, // Start after links animation
  });
}

animateNavbar()

// Function to animate the hero section when the page loads
function animateHeroSection() {
  // Animate the text content
  gsap.from(".hero-text", {
    opacity: 0,
    y: 50, // Slide up into view
    duration: 1.5,
    stagger: 0.6,
    ease: "power2.out",
    delay: 0.5, // Delay for better appearance timing
  });

  // Animate the hero image
  gsap.from(".hero-img img", {
    opacity: 0,
    x: 100, // Slide in from the right
    duration: 1.5,
    ease: "power2.out",
    delay: 0.8, // Slightly delay after the text animation
  });
}

animateHeroSection();

// Function to animate the feature section on scroll
function animateFeaturesOnScroll() {
  gsap.from("#feature-top img", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]", // Locomotive scroll container
      start: "top 30%", // Trigger when the top of #keyfeature is 80% down the viewport
      scrub: true, // Enable smooth scrubbing animation
    },
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });

  // Animate the main feature text
  gsap.from(".feature-item h2, .feature-item p", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]", // Locomotive scroll container
      start: "top 30%", // Trigger when the top of #keyfeature is 80% down the viewport
      scrub: true, // Enable smooth scrubbing animation
    },
    opacity: 0,
    y: 50, // Slide up animation
    duration: 1.2,
    ease: "power2.out",
  });

  // Animate each feature item individually
  gsap.from("#feature-1, #feature-2, #feature-3", {
    scrollTrigger: {
      trigger: "#keyfeature",
      scroller: "[data-scroll-container]", // Locomotive scroll container
      start: "top 30%", // Trigger when the top of #keyfeature is 80% down the viewport
      scrub: true, // Enable smooth scrubbing animation
    },
    opacity: 0,
    y: 100, // Elements will slide up from below
    stagger: 0.2, // Delay each feature for a sequential effect
    duration: 1,
    ease: "power2.out",
  });
}

animateFeaturesOnScroll();

// Animate common-text section
function animateCommonTextOnScroll() {
  // Animate the heading
  gsap.from("#common-text h2", {
    scrollTrigger: {
      trigger: "#common-text h2",
      scroller: "[data-scroll-container]", // Optional if using Locomotive Scroll
      start: "top 90%", // Starts when heading is near viewport
      end: "bottom top",
      toggleActions: "play none none reset", // Re-trigger on scroll back up
    },
    opacity: 0, // Start fully transparent
    x: -50, // Move from left by 50px
    duration: 1.5, // Smooth duration
    ease: "power3.out",
  });

  // Animate the paragraph
  gsap.from("#common-text p", {
    scrollTrigger: {
      trigger: "#common-text p",
      scroller: "[data-scroll-container]",
      start: "top 90%", // Starts when the paragraph is near viewport
      end: "bottom top",
      toggleActions: "play none none reset",
    },
    opacity: 0, // Start fully transparent
    x: 50, // Move from right by 50px
    duration: 1.5,
    ease: "power3.out",
    delay: 0.3, // Slight delay to stagger animation after heading
  });
}

animateCommonTextOnScroll();

function animateLearnMoreSection() {
  // Select elements in the learn more section
  const img = document.querySelector(".learn-more-section .hero-img");
  const heading = document.querySelector(".learn-more-section .hero-text h2");
  const paragraph = document.querySelector(".learn-more-section .hero-text p");
  const button = document.querySelector(".learn-more-section .hero-text button");

  // Animate image
  gsap.from(img, {
    scrollTrigger: {
      trigger: img, // Trigger animation when the section enters the viewport
      scroller: "[data-scroll-container]", // Locomotive scroll container
      start: "top 80%", // Start when the top of the section hits 80% of the viewport
      toggleActions: "play none none reset", // Play when entering, reset when leaving
      once: false, // Allow animation to re-trigger when scrolling back up
    },
    x: -100, // Slide in from the left
    opacity: 0, // Start invisible
    duration: 1, // Duration of the animation
    ease: "power2.out",
  });

  // Animate the heading
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading, // Use the same trigger as the image
      scroller: "[data-scroll-container]",
      start: "top 80%",
      toggleActions: "play none none reset", // Play when entering, reset when leaving
      once: false, // Allow animation to re-trigger when scrolling back up
    },
    opacity: 0,
    y: 50, // Slide up from 50px below
    duration: 1,
    ease: "power2.out",
  });




  // Animate the paragraph
  gsap.from(paragraph, {
    scrollTrigger: {
      trigger: paragraph,
      scroller: "[data-scroll-container]", // Locomotive scroll container if using
      start: "top 80%", // Start a little later for a staggered effect
      toggleActions: "play none none reset", // Play when entering, reset when leaving
      once: false, // Allow animation to re-trigger when scrolling back up
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  // Animate the button
  gsap.from(button, {
    scrollTrigger: {
      trigger: button,
      scroller: "[data-scroll-container]",
      start: "top 80%", // Animate after the text is mostly visible
      toggleActions: "play none none reset", // Play when entering, reset when leaving
      once: false, // Allow animation to re-trigger when scrolling back up
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });
}

animateLearnMoreSection();

// Function to animate service items and text
function animateServicesAndText() {
  // Animate the heading
  const heading = document.querySelector(".service-section h2");
  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%", // Start when the top of the heading hits 90% of the viewport
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: -50, // Move from 50px above
    duration: 1.5,
    ease: "power2.out",
  });

  // Animate the paragraph
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
    y: 20, // Move from 20px below
    duration: 1.5,
    ease: "power2.out",
  });

  // Animate service items
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

// Function to animate pricing section
function animatePricingSection() {
  // Animate the heading and paragraph
  const heading = document.querySelector("#pricing h2");
  const paragraph = document.querySelector("#pricing p");

  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%", // Start when the top of the heading hits 90% of the viewport
      end: "bottom top",
      scrub: 1,
    },
    opacity: 0,
    y: -50, // Move from 50px above
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
    y: 20, // Move from 20px below
    duration: 1.5,
    ease: "power2.out",
  });

  // Animate pricing cards
  const cards = document.querySelectorAll(".box");

  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        scroller: "[data-scroll-container]",
        start: "top 85%",      // Trigger a bit earlier for smoother appearance
        end: "bottom top",
        scrub: 1,              // Enable smooth scrubbing for parallax effect
      },
      opacity: 0,
      y: 50,                  // Move from below
      scale: 0.85,            // Slightly smaller scale for more depth
      rotateY: 10,            // Add slight 3D rotation on the Y-axis
      skewX: 10,              // Skew the card for a unique perspective
      duration: 1.5,
      ease: "power3.out",     // Use a smooth ease-out effect for natural flow
      delay: index * 0.15,    // Stagger the animation for each card
    });

    // Adding hover interaction to make it more dynamic
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,          // Slight scale-up on hover for interaction
        rotateY: 0,           // Reset any rotation on hover
        skewX: 0,             // Remove skew on hover for a clean look
        duration: 0.5,
        ease: "power2.out",   // Smooth and fast transition on hover
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 0.85,          // Return to original scale
        rotateY: 10,          // Reapply the 3D rotation
        skewX: 10,            // Reapply skew
        duration: 0.5,
        ease: "power2.in",    // Smooth transition on leaving
      });
    });
  });


}

animatePricingSection();

function animateHeader() {
  const heading = document.querySelector("#faq h2");
  const paragraph = document.querySelector("#faq p");

  gsap.from(heading, {
    scrollTrigger: {
      trigger: heading,
      scroller: "[data-scroll-container]",
      start: "top 90%", // Start when the top of the heading hits 90% of the viewport
      end: "bottom top",
      scrub: 1,
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
    },
    opacity: 0,
    y: -50, // Move from 50px above
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
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
    },
    opacity: 0,
    y: 20, // Move from 20px below
    duration: 1.5,
    ease: "power2.out",
  });
}
animateHeader();

function animateBottom() {
  gsap.from("#testimonial h2", {
    scrollTrigger: {
      trigger: "#testimonial",
      scroller: "[data-scroll-container]",
      start: "top 80%", // starts the animation when 80% of the section enters the viewport
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
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
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
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
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
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
      toggleActions: "play none none reset", // Reset and allow re-trigger
      once: false, // Re-trigger animation when scrolling back up
    },
    opacity: 0,
    x: 100,
    duration: 1,
  });
}
animateBottom();

function animateFooter() {
  const scrollContainer = "[data-scroll-container]"; // Locomotive Scroll container

  // General animation settings
  const generalAnimationSettings = {
    scrollTrigger: {
      trigger: "#footer",
      scroller: scrollContainer,
      start: "top 90%",  // Start animation earlier (was top 80%)
      end: "top 40%",    // Adjust end position accordingly
      toggleActions: "play none none reset",
      once: false,
    },
    opacity: 0,
    y: 30,
    duration: 1,
  };

  // Animate the logo
  gsap.from("#footer .logo", {
    ...generalAnimationSettings, // Use shared animation settings
    scrollTrigger: {
      ...generalAnimationSettings.scrollTrigger, // Shared ScrollTrigger settings
      end: "bottom 30%", // Specific end point for the logo
    },
  });

  // Animate the links
  gsap.from("#footer .links li", {
    ...generalAnimationSettings,
    scrollTrigger: {
      ...generalAnimationSettings.scrollTrigger,
      start: "top 95%", // Start even earlier for links
      end: "top 50%",   // Adjust end position
    },
    x: -50, // Slide from left
    stagger: 0.2, // Staggered effect for each link
  });

  // Animate the social icons
  gsap.from("#footer .social-icons i", {
    ...generalAnimationSettings,
    stagger: 0.2,
  });

  // Animate the copyright text
  gsap.from("#footer p", {
    ...generalAnimationSettings,
    delay: 1, // Delayed to appear after other elements
  });
}

animateFooter();






