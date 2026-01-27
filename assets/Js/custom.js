// 1.0 Header Section
// left-sidebar
function open_aside() {
  "use strict";
  const sidepanel = document.getElementById("mySidenav");
  if (sidepanel) {
    sidepanel.style.left = "0";
  } else {
    console.error("Error: Side panel element not found!");
  }
}
function close_aside() {
  "use strict";
  const sidepanel = document.getElementById("mySidenav");
  if (sidepanel) {
    sidepanel.style.left = "-355px";
  } else {
    console.error("Error: Side panel element not found!");
  }
}
//  Video-Section Slider
(() => {
  const slider = document.getElementById("videoSlider");
  if (!slider) return;

  function getScrollAmount() {
    // On small screens show exactly one slide at a time (use container width)
    if (window.matchMedia("(max-width:767.98px)").matches) {
      return slider.clientWidth;
    }
    const firstSlide = slider.querySelector(".flex-shrink-0");
    if (!firstSlide) return Math.round(slider.offsetWidth * 0.6);
    const slideWidth = firstSlide.getBoundingClientRect().width;
    const style = window.getComputedStyle(slider);
    const gap = parseFloat(style.gap || style.columnGap || "24") || 24;
    return Math.round(slideWidth + gap);
  }

  let scrollAmount = getScrollAmount();
  let raf;
  window.addEventListener("resize", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      scrollAmount = getScrollAmount();
    });
  });

  let autoId = null;
  function startAuto() {
    stopAuto();
    autoId = setInterval(() => {
      // recompute scroll amount each tick (handles responsive changes)
      scrollAmount = getScrollAmount();
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScroll - 2) {
        // wrap back to start
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3500);
  }
  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }

  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  startAuto();
})();

/* Reviews Slider */
(function () {
  const reviewsSlider = document.getElementById("reviewsSlider");
  const prev = document.getElementById("reviewsPrev");
  const next = document.getElementById("reviewsNext");
  const progressFill = document.getElementById("reviewsProgressFill");

  if (!reviewsSlider || !prev || !next || !progressFill) return;

  function visibleCount() {
    if (window.matchMedia("(max-width:767.98px)").matches) return 1;
    if (window.matchMedia("(max-width:991.98px)").matches) return 2;
    return 3;
  }

  function slideWidthWithGap() {
    const first = reviewsSlider.querySelector(".flex-shrink-0");
    if (!first) return reviewsSlider.offsetWidth;
    const style = window.getComputedStyle(reviewsSlider);
    const gap = parseFloat(style.gap || "24") || 24;
    return Math.round(first.getBoundingClientRect().width + gap);
  }

  let currentIndex = 0;
  const items = reviewsSlider.querySelectorAll(".flex-shrink-0");
  const total = items.length;

  function updateProgress() {
    const visible = visibleCount();

    const maxSteps = Math.max(1, total - visible);
    const pct = maxSteps === 0 ? 100 : (currentIndex / maxSteps) * 100;
    progressFill.style.width = pct + "%";
  }

  function goTo(index) {
    const maxIndex = Math.max(0, total - visibleCount());
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const amount = currentIndex * slideWidthWithGap();
    reviewsSlider.scrollTo({ left: amount, behavior: "smooth" });
    updateProgress();
  }

  next.addEventListener("click", () => goTo(currentIndex + 1));
  prev.addEventListener("click", () => goTo(currentIndex - 1));

  // autoplay
  let autoPlayId = null;
  function startAuto() {
    stopAuto();
    autoPlayId = setInterval(() => {
      const maxIndex = Math.max(0, total - visibleCount());
      if (currentIndex >= maxIndex) goTo(0);
      else goTo(currentIndex + 1);
    }, 4000);
  }
  function stopAuto() {
    if (autoPlayId) {
      clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }
  reviewsSlider.addEventListener("mouseenter", stopAuto);
  reviewsSlider.addEventListener("mouseleave", startAuto);
  let rafId;
  window.addEventListener("resize", () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const maxIndex = Math.max(0, total - visibleCount());
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      const amount = currentIndex * slideWidthWithGap();
      reviewsSlider.scrollTo({ left: amount, behavior: "instant" });
      updateProgress();
    });
  });
  updateProgress();
  startAuto();
})();
