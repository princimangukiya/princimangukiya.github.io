// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Copy to clipboard functionality
  window.copyToClipboard = function (text) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        // Show success message
        showNotification("Copied to clipboard!", "success");
      })
      .catch(function (err) {
        console.error("Could not copy text: ", err);
        showNotification("Failed to copy to clipboard", "error");
      });
  };

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${
              type === "success"
                ? "#00ff88"
                : type === "error"
                ? "#ff4444"
                : "#00aaff"
            };
            color: ${type === "success" ? "#0a0a0a" : "#ffffff"};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".skill-item, .experience-item, .work-item, .testimonial-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Header background on scroll
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
    } else {
      header.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });

  // Add transition to header
  header.style.transition = "transform 0.3s ease, background-color 0.3s ease";

  // Typing animation for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
  }

  // Remove parallax effect for hero image to prevent scrolling issues
  // const heroImage = document.querySelector(".profile-img");
  // if (heroImage) {
  //   window.addEventListener("scroll", () => {
  //     const scrolled = window.pageYOffset;
  //     const parallax = scrolled * 0.5;
  //     heroImage.style.transform = `translateY(${parallax}px)`;
  //   });
  // }

  // Skill items hover effect
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Work item hover effects
  const workItems = document.querySelectorAll(".work-item");
  workItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 20px 40px rgba(0, 255, 136, 0.1)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });

  // Testimonial carousel (if you want to add more testimonials later)
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial-item");

  if (testimonials.length > 3) {
    // Hide extra testimonials initially
    testimonials.forEach((testimonial, index) => {
      if (index >= 3) {
        testimonial.style.display = "none";
      }
    });

    // Add navigation dots
    const testimonialsContainer = document.querySelector(".testimonials-grid");
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "testimonial-dots";
    dotsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
        `;

    for (let i = 0; i < Math.ceil(testimonials.length / 3); i++) {
      const dot = document.createElement("button");
      dot.className = "testimonial-dot";
      dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background-color: ${i === 0 ? "#00ff88" : "#2a2a2a"};
                cursor: pointer;
                transition: background-color 0.3s ease;
            `;

      dot.addEventListener("click", () => {
        showTestimonials(i);
        updateDots(i);
      });

      dotsContainer.appendChild(dot);
    }

    testimonialsContainer.parentNode.appendChild(dotsContainer);

    function showTestimonials(index) {
      testimonials.forEach((testimonial, i) => {
        if (i >= index * 3 && i < (index + 1) * 3) {
          testimonial.style.display = "block";
        } else {
          testimonial.style.display = "none";
        }
      });
    }

    function updateDots(activeIndex) {
      const dots = document.querySelectorAll(".testimonial-dot");
      dots.forEach((dot, index) => {
        dot.style.backgroundColor =
          index === activeIndex ? "#00ff88" : "#2a2a2a";
      });
    }
  }

  // Mobile menu toggle (for future mobile navigation)
  const createMobileMenu = () => {
    const nav = document.querySelector(".nav");
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.className = "mobile-menu-btn";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
        `;

    const headerContainer = document.querySelector(".header .container");
    headerContainer.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("mobile-open");
    });

    // Media query for mobile menu
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function handleMobileMenu(e) {
      if (e.matches) {
        mobileMenuBtn.style.display = "block";
        nav.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: rgba(10, 10, 10, 0.98);
                    backdrop-filter: blur(10px);
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                `;
      } else {
        mobileMenuBtn.style.display = "none";
        nav.style.cssText = "";
        nav.classList.remove("mobile-open");
      }
    }

    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);

    // Add mobile-open styles
    const style = document.createElement("style");
    style.textContent = `
            .nav.mobile-open {
                transform: translateY(0) !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
        `;
    document.head.appendChild(style);
  };

  createMobileMenu();

  // Download CV functionality
  const downloadBtn = document.querySelector(".btn-download");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      // Create a temporary link to trigger file download
      const link = document.createElement("a");
      link.href = "/assets/Princi_Resume.pdf"; // Update this path to your actual CV file
      link.download = "Princi_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // You can replace this with actual CV download logic
      //   showNotification("CV download will be available soon!", "info");
    });
  }

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Add loaded class styles
  const loadedStyles = document.createElement("style");
  loadedStyles.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
  document.head.appendChild(loadedStyles);
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization: Debounce scroll events
const debouncedScrollHandler = debounce(() => {
  // Any additional scroll-based functionality can be added here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
