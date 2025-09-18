// Navigation functionality
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  // Remove active class from all nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Add active class to corresponding nav link
  const activeLink = document.querySelector(
    `[onclick="showPage('${pageId}')"]`
  );
  if (activeLink && activeLink.classList.contains("nav-link")) {
    activeLink.classList.add("active");
  }

  // Add fade-in animation to new content
  const activePageElements = document.querySelectorAll(
    `#${pageId} .fade-in-up`
  );
  activePageElements.forEach((element, index) => {
    element.style.animation = "none";
    setTimeout(() => {
      element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    }, 50);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add smooth scrolling and hover effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effect to cards
  const cards = document.querySelectorAll(
    ".feature-card, .product-card, .info-card, .value-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll("button, .logo");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in-up");
  fadeElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

  // Mobile menu toggle (if needed)
  const navMenu = document.getElementById("navMenu");
  let mobileMenuOpen = false;

  // Add mobile menu button if screen is small
  if (window.innerWidth <= 768) {
    const mobileMenuButton = document.createElement("button");
    mobileMenuButton.innerHTML = "☰";
    mobileMenuButton.style.cssText =
      "background: none; border: none; font-size: 1.5rem; color: #333; cursor: pointer; display: block;";

    mobileMenuButton.addEventListener("click", () => {
      mobileMenuOpen = !mobileMenuOpen;
      navMenu.style.display = mobileMenuOpen ? "flex" : "none";
    });

    document.querySelector(".nav-container").appendChild(mobileMenuButton);
  }

  // Add product interaction
  const viewDetailsBtns = document.querySelectorAll(".view-details-btn");
  viewDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const productTitle =
        productCard.querySelector(".product-title").textContent;

      // Simple modal-like alert (you can replace with actual modal)
      alert(
        `More details for ${productTitle}:\n\n• Energy Star 5 Rating\n• 3 Year Warranty\n• Free Installation\n• 30-Day Money Back Guarantee\n\nContact us for pricing and availability!`
      );
    });
  });

  // Smooth scroll for CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    });
  }

  // Add dynamic stats counter animation
  const statNumbers = document.querySelectorAll(
    ".stat-number, .company-stat-number"
  );

  function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes("%");
    const isCurrency = target.includes("$");
    const isDecimal = target.includes(".");

    let numericTarget;
    if (isCurrency) {
      numericTarget = parseFloat(target.replace(/[$,]/g, ""));
    } else if (isDecimal) {
      numericTarget = parseFloat(target);
    } else {
      numericTarget = parseInt(target.replace(/[,%+]/g, ""));
    }

    if (isNaN(numericTarget)) return;

    let current = 0;
    const increment = numericTarget / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (isCurrency) {
        if (numericTarget >= 1000) {
          displayValue = `${(current / 1000).toFixed(1)}${
            target.includes("M") ? "M" : "K"
          }`;
        } else {
          displayValue = `${displayValue.toLocaleString()}`;
        }
      } else if (isDecimal) {
        displayValue = current.toFixed(1);
      } else if (target.includes("+")) {
        displayValue = `${displayValue.toLocaleString()}+`;
      } else if (isPercentage) {
        displayValue = `${displayValue}%`;
      }

      element.textContent = displayValue;
    }, 50);
  }

  // Trigger counter animation when stats come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Add parallax effect to hero sections
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSections = document.querySelectorAll(".hero, .about-hero");

    heroSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        section.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  });

  // Add loading animation
  document.body.style.opacity = "0";
  window.addEventListener("load", () => {
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = "1";
  });

  console.log("PowerWise Energy Solutions website loaded successfully!");
});

// Utility function for smooth page transitions
function smoothTransition(callback) {
  document.body.style.opacity = "0.8";
  setTimeout(() => {
    callback();
    document.body.style.opacity = "1";
  }, 200);
}

// Enhanced showPage function with transition
const originalShowPage = showPage;
showPage = function (pageId) {
  smoothTransition(() => originalShowPage(pageId));
};