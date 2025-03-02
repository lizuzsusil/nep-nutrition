document.addEventListener("DOMContentLoaded", function () {
    const banner = document.querySelector(".header.is-index");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 60) {
            banner.classList.add("bg-young-night", "shadow");
        } else {
            banner.classList.remove("bg-young-night", "shadow");
        }
    });

    setTimeout(function () {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }, 5000);

    $('.latest-product-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    $('.testimonial-slider').slick({
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '28vw',
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1441,
                settings: {
                    centerPadding: '20vw',
                }
            },
            {
                breakpoint: 1367,
                settings: {
                    centerPadding: '18vw',
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    dots: true
                }
            },
        ]
    });

    $('.hero-banner-container').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                }
            },
        ]
    });
});