$(document).ready(function () {
    // ****** Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function (event) {
        event.stopPropagation();
        $('.nav').toggleClass('menu-mobile-active');
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
    });

    // ****** Fermer le menu au click du lien
    $('.nav ul.menu a').on('click', function () {
        $('.nav').removeClass('menu-mobile-active');
        $('.navbar-toggler .btn-menu').toggleClass('d-none');
    });

    // ****** Déchenchement effet sur les titles
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const title = entry.target;

            if (entry.isIntersecting && !title.classList.contains('animated')) {
                // Ajoute l'animation la première fois qu'on voit le titre
                title.classList.add(title.dataset.animClass, 'animated');
                title.classList.remove('hidden-title');

                // Stoppe l'observation après la première animation
                observer.unobserve(title);
            }
        });
    }, observerOptions);

    // Sélectionne les titres et ajoute l'observateur
    const titles = document.querySelectorAll('.hidden-title');
    titles.forEach(title => {
        // Définit la classe d'animation en fonction de la classe présente sur le titre
        if (title.classList.contains('title-one')) {
            title.dataset.animClass = 'line-up-title';
        } else if (title.classList.contains('title-two')) {
            title.dataset.animClass = 'line-up-title-reverse';
        }
        observer.observe(title);
    });

    // Pour transtion fluide vers les links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ne pas appliquer pour ces liens
            if (this.classList.contains('no-offset-scroll')) {
                return;
            }

            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ****** Météo: applique l'image de fond correspondante
    $('.weather-icon').each(function () {
        var weatherIcon = $(this).attr('data');
        var $meteoModule = $(this).closest('.meteo-module');
        var baseUrl = $meteoModule.data('url');

        // Vérifie si weatherIcon est défini et non vide
        if (weatherIcon && weatherIcon.trim() !== '') {
            var iconPath = baseUrl + weatherIcon + '.jpg';

            // Ajoute une classe basée sur l'icône météo
            $meteoModule.addClass('weather-' + weatherIcon);
        } else {
            // Image par défaut si aucune icône n'est trouvée
            var iconPath = baseUrl + 'clear-day.jpg';

            // Ajoute une classe par défaut si souhaité
            $meteoModule.addClass('weather-clear-day');
        }

        // Applique l'image de fond
        $meteoModule.css({
            'background-image': 'url(' + iconPath + ')',
            'background-size': 'cover'
        });
    });

    // ****** SCEA
    // Voir plus SCEA
    $(".list-scea .service-scea").hide();
    $(".list-scea .service-scea").slice(0, 10).show();

    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".list-scea .service-scea:hidden").slideDown();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".list-scea .service-scea").not(":lt(10)").slideUp();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // ****** Galerie actions
    // Fonction pour mettre à jour l'image dans la div big-photo-contain
    function updateBigPhotoContain(src, alt) {
        $('#active-image').attr('src', src).attr('alt', alt);
    }

    // Gestion du clic sur une image de la galerie
    $('.slider-gallery').on('click', 'img', function () {
        var clickedImageSrc = $(this).attr('src');
        var clickedImageAlt = $(this).attr('alt');

        updateBigPhotoContain(clickedImageSrc, clickedImageAlt);
    });

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });
});

$(document).ready(function () {
    $('.slider-options').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>", "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "],
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>", "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "],
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>", "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "],
        margin: 0,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
    $('.slider-giftcards').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: true,
        navText: ["<span class='indic-nav'><i class='las la-arrow-left'></i> AVANT </span>", "<span class='indic-nav'> APRES <i class='las la-arrow-right'></i></span> "],
        margin: 0,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: true,
            },
        }
    });
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: true,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 4,
                margin: 5,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            768: {
                items: 6,
                margin: 10,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
            1024: {
                items: 8,
                margin: 10,
                touchDrag: true,
                mouseDrag: true,
                dots: false,
                nav: false,

            },
            1220: {
                items: 8,
                margin: 10,
                touchDrag: false,
                mouseDrag: true,
                dots: false,
                nav: false,
            },
        }
    });
});