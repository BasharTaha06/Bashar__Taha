// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Hero section animation
  const heroContent = document.querySelector(".hero-content")
  const quickLinks = document.querySelectorAll(".quick-links a")

  setTimeout(() => {
    heroContent.classList.add("animate-fade-in")
    heroContent.style.opacity = "1"
  }, 300)

  setTimeout(() => {
    quickLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.add("animate-slide-up")
        link.style.opacity = "1"
        link.style.transform = "translateY(0)"
      }, index * 100)
    })
  }, 800)

  // Set up intersection observer for other sections
  const animatedElements = document.querySelectorAll(".about-section, .projects-title, .project-card, .contact-section")

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"

    // Stagger project cards
    if (el.classList.contains("project-card")) {
      el.style.transitionDelay = `${(index % 6) * 0.1}s`
    }

    observer.observe(el)
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Copy email to clipboard function
function copyEmail() {
  const email = "eng.bashar.taha@gmail.com"
  navigator.clipboard
    .writeText(email)
    .then(() => {
      showToast()
    })
    .catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      showToast()
    })
}

// Show toast notification
function showToast() {
  const toast = document.getElementById("toast")
  toast.style.transform = "translateY(0)"
  toast.style.opacity = "1"

  setTimeout(() => {
    toast.style.transform = "translateY(100%)"
    toast.style.opacity = "0"
  }, 3000)
}

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".animate-float")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Respect reduced motion preference
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animationDuration = "0.01ms"
    el.style.animationIterationCount = "1"
    el.style.transitionDuration = "0.01ms"
  })
}

// Set favicon dynamically
function setFavicon(url) {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  setFavicon('/Bashar__Taha/logo.ico'); // Change to your icon path
});
