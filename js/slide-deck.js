// Handles presentation slide navigation and keyboard controls.
const slides = [document.querySelector(".hero"), ...document.querySelectorAll("main > section")];
    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");
    const slideTitle = document.getElementById("slideTitle");
    const slideCount = document.getElementById("slideCount");
    const slideProgress = document.getElementById("slideProgress");
    let currentSlide = 0;

    const getSlideTitle = (slide) => {
      const heading = slide.querySelector("h1, h2");
      return heading ? heading.textContent.trim() : "Dubai Real Estate AI";
    };

    const showSlide = (index) => {
      currentSlide = Math.max(0, Math.min(index, slides.length - 1));

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentSlide;
        slide.classList.toggle("active-slide", isActive);
        if (isActive) {
          slide.scrollTop = 0;
          slide.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
        }
      });

      const title = getSlideTitle(slides[currentSlide]);
      slideTitle.textContent = title;
      slideCount.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
      slideProgress.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
      prevButton.disabled = currentSlide === 0;
      nextButton.textContent = currentSlide === slides.length - 1 ? "Restart" : "Next";

    };

    prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
    nextButton.addEventListener("click", () => {
      showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    });

    document.querySelectorAll("[data-go-slide]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showSlide(Number(link.dataset.goSlide));
      });
    });

    document.querySelectorAll("[data-go-id]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.dataset.goId || link.getAttribute("href")?.replace("#", "");
        const targetIndex = slides.findIndex((slide) => slide.id === id);
        if (targetIndex >= 0) {
          event.preventDefault();
          showSlide(targetIndex);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        showSlide(currentSlide - 1);
      }
    });

    showSlide(0);

