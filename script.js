
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Mobile navigation
  const menuBtn = document.getElementById("menu-btn");
  const navMenu = document.getElementById("nav-menu");

  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    const icon = menuBtn.querySelector("svg");

    if (icon) {
      icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      lucide.createIcons();
    }
  });

  // Close mobile menu after clicking a navigation link
  document.querySelectorAll(".nav-link, .mobile-hire").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation");

      const icon = menuBtn.querySelector("svg");

      if (icon) {
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    });
  });

  // Close mobile menu when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      navMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");

      const icon = menuBtn.querySelector("svg");

      if (icon) {
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    }
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Highlight active navigation link while scrolling
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const active =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", active);
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Smooth scroll for internal navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches ? "auto" : "smooth",
          block: "start"
        });

        // Update URL hash without an abrupt jump
        history.replaceState(null, "", targetId);
      }
    });
  });

  // Footer year can be updated automatically if needed
  console.log("Jakaria's portfolio is ready!");
});
