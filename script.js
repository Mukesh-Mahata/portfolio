// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for nav links
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const formData = new FormData(this);

  // Show success message
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Message Sent! ✓";
  submitBtn.style.background = "#48bb78";

  // Reset form
  this.reset();

  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = "";
  }, 3000);
});

// Update form data collection
const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea"
);
formInputs.forEach((input) => {
  input.addEventListener("input", function () {
    this.style.borderColor = "var(--primary-color)";
  });
});

// Scroll Animation for Elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe skill cards and project cards
const cards = document.querySelectorAll(".skill-card, .project-card");
cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Add active state to nav links on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Counter Animation for Stats
const stats = document.querySelectorAll(".stat h3");
const counters = [];

stats.forEach((stat) => {
  const count = parseInt(stat.textContent);
  counters.push({
    element: stat,
    count: count,
    current: 0,
  });
});

// Intersection Observer for Stats Counter
const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        animateCounters();
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".about-stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateCounters() {
  counters.forEach((counter) => {
    const increment = counter.count / 30;
    const timer = setInterval(() => {
      counter.current += increment;
      if (counter.current >= counter.count) {
        counter.element.textContent = counter.count + "+";
        clearInterval(timer);
      } else {
        counter.element.textContent = Math.floor(counter.current) + "+";
      }
    }, 50);
  });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Typing Effect for Hero Title (Optional)
const heroTitle = document.querySelector(".hero-title");
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  let index = 0;

  function typeText() {
    if (index < text.length) {
      heroTitle.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 50);
    }
  }

  // Start typing when page loads
  window.addEventListener("load", typeText);
}

// Project Link Handlers
const projectLinks = document.querySelectorAll(".project-link");
projectLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    alert("This would link to the full project details!");
  });
});

// Social Media Link Handlers
const socialIcons = document.querySelectorAll(".social-icon");
socialIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Social media link - connect to your actual social profiles!");
  });
});

// Lazy Load Images (if you add images)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Add navigation link active state styling
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

console.log("Portfolio site loaded successfully!");
