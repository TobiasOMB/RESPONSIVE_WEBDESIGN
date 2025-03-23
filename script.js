document.addEventListener("DOMContentLoaded", function () {
    // Rabatt und Lieferzeit Steuerung
    let rabattCall = document.getElementById('RabattCall');
    let lieferzeit = document.getElementById('Lieferzeit');

    function toggleVisibility(element, nextFunction) {
        element.classList.add('show');
        setTimeout(function() {
            element.classList.remove('show');
            nextFunction();
        }, 6000); // 6 Sekunden Anzeige
    }

    function showRabattCall() {
        toggleVisibility(rabattCall, showLieferzeit);
    }

    function showLieferzeit() {
        toggleVisibility(lieferzeit, showRabattCall);
    }

    showRabattCall(); // Starte mit RabattCall

    // Slideshow Steuerung
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let slideInterval = setInterval(nextSlide, 10000); // Wechsel alle 10 Sekunden

    function nextSlide() {
        changeSlide(1);
    }

    function changeSlide(n) {
        slides[slideIndex].classList.remove('active');
        dots[slideIndex].classList.remove('active');

        slideIndex = (slideIndex + n + slides.length) % slides.length;

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        resetInterval();
    }

    function goToSlide(n) {
        slides[slideIndex].classList.remove('active');
        dots[slideIndex].classList.remove('active');

        slideIndex = n;

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000);
    }

    // Event-Listener für Pfeile
    document.querySelector('.prev').addEventListener('click', function () {
        changeSlide(-1);
    });
    document.querySelector('.next').addEventListener('click', function () {
        changeSlide(1);
    });

    // Event-Listener für Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            goToSlide(index);
        });
    });

    // Steuerung für das Burger-Icon und das Seitenmenü
    const burgerIcon = document.querySelector('.burger-icon');
    const sideMenu = document.getElementById('side-menu');

    // Funktion zum Öffnen und Schließen des Menüs
    burgerIcon.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
        burgerIcon.classList.toggle('open'); // Wechsel zum X-Icon

        if (sideMenu.classList.contains('open')) {
            // Wenn das Menü geöffnet wird, nach 2 Sekunden die Menü-Punkte animieren
            setTimeout(function() {
                const menuLinks = sideMenu.querySelectorAll('a');
                menuLinks.forEach((link, index) => {
                    // Menü-Punkte zurücksetzen, um die Animation zu ermöglichen
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(-20px)';

                    // Animation für jeden Menüpunkt nach einer kurzen Verzögerung
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 200); // Verzögerung für jeden Menüpunkt
                });
            }, 500); // Verzögerung von 0.5s, bevor die Animation startet
        } else {
            // Wenn das Menü geschlossen wird, Menü-Punkte zurücksetzen
            const menuLinks = sideMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
            });
        }
    });

    // (Optional) Menü schließen, wenn ein Menüpunkt geklickt wird
    const menuLinks = sideMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            burgerIcon.classList.remove('open');
            
            // Menü-Punkte zurücksetzen, wenn das Menü geschlossen wird
            menuLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
            });
        });
    });
});
