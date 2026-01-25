  document.getElementById("sendEmailButton").addEventListener("click", function () {
      window.location.href =
        "mailto:mdbappy1350@gmail.com?subject=Your%20Subject&body=Your%20message%20here";
    });

    const backToTopBtn = document.getElementById("backToTopBtn");

    // Show / hide button based on scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
      } else {
        backToTopBtn.classList.add("hidden");
      }
    });

    // Scroll to top smoothly
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    let currentProject = 0;
    let autoSlideInterval;

    const carousel = document.getElementById("projectCarousel");
    const slides = document.querySelectorAll("#projectCarousel > div");
    const indicatorsContainer = document.getElementById("projectIndicators");

    // ---------- CREATE INDICATORS ----------
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className =
        "w-3 h-3 rounded-full bg-gray-500 hover:bg-white transition";
      dot.addEventListener("click", () => {
        currentProject = index;
        updateCarousel();
        resetAutoSlide();
      });
      indicatorsContainer.appendChild(dot);
    });

    function updateIndicators() {
      [...indicatorsContainer.children].forEach((dot, index) => {
        dot.classList.toggle("bg-white", index === currentProject);
        dot.classList.toggle("bg-gray-500", index !== currentProject);
      });
    }

    // ---------- CAROUSEL LOGIC ----------
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentProject * 100}%)`;
      updateIndicators();
    }

    function nextProject() {
      currentProject = (currentProject + 1) % slides.length;
      updateCarousel();
      resetAutoSlide();
    }

    function prevProject() {
      currentProject =
        (currentProject - 1 + slides.length) % slides.length;
      updateCarousel();
      resetAutoSlide();
    }

    // ---------- AUTO SLIDE ----------
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentProject = (currentProject + 1) % slides.length;
        updateCarousel();
      }, 5000); // 5 seconds
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // ---------- INIT ----------
    updateCarousel();
    startAutoSlide();