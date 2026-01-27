// Swiper Slider 
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  
  var swiper = new Swiper(".mSwiper", {
    slidesPerGroup: 2,
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  
  
  var swiper = new Swiper(".mySwip", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    freeMode: true, 
    speed: 4000, 
    autoplay: {
      delay: 0,
      disableOnInteraction: false, 
    },
  });