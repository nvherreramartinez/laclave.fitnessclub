const sliders = document.querySelectorAll('.swiper');
sliders.forEach(slider => {
    new Swiper(slider, {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: slider.querySelector('.swiper-button-next'),
            prevEl: slider.querySelector('.swiper-button-prev'),
        }
    });
});