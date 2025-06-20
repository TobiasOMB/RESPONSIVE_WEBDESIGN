document.addEventListener("DOMContentLoaded", function () {
    // Rabatt und Lieferzeit Steuerung
    let rabattCall = document.getElementById('RabattCall');
    let lieferzeit = document.getElementById('Lieferzeit');
    let firstBestellung = document.getElementById('FirstBestellung');

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
        toggleVisibility(lieferzeit, showFirstBestellung);
    }

    function showFirstBestellung() {
        toggleVisibility(firstBestellung, showRabattCall);
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
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(-20px)';

                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, index * 200); // Verzögerung für jeden Menüpunkt
                });
            }, 500); 
        } else {
            const menuLinks = sideMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
            });
        }
    });

    // Menü schließen, wenn ein Menüpunkt geklickt wird
    const menuLinks = sideMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            burgerIcon.classList.remove('open');

            menuLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(-20px)';
            });
        });
    });

    // Scroll-Up Button Steuerung
    const scrollUpBtn = document.createElement("button");
    scrollUpBtn.id = "scrollUpBtn";
    scrollUpBtn.innerHTML = '<img src="images/up-square-svgrepo-com.svg" alt="Nach oben">';
    document.body.appendChild(scrollUpBtn);

    let lastScrollY = window.scrollY;
    let isVisible = false;

    window.addEventListener("scroll", () => {
        let currentScrollY = window.scrollY;

        if (currentScrollY > 300 && currentScrollY < lastScrollY) {
            scrollUpBtn.classList.add("show");
            isVisible = true;
        } else if (currentScrollY < 100 || currentScrollY > lastScrollY) {
            scrollUpBtn.classList.remove("show");
            isVisible = false;
        }

        lastScrollY = currentScrollY;
    });

    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // **Warenkorb-Funktionalität**
    const produkte = {
        "Produkt1": { 
            name: "Provence Energy", 
            gewicht: "0,5 l", 
            geschmack: "Lavendel", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe mit Lernblättern und lila Licht im Hinterg 493448.jpg"
        },
        "Produkt2": { 
            name: "Tulipe Energy", 
            gewicht: "0,5 l", 
            geschmack: "Tulpe", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe mit Lernblättern und orange, rosa, rot Bel 493448.jpg"
        },
        "Produkt3": { 
            name: "LimEd - ZENERGY", 
            gewicht: "1,5 l", 
            geschmack: "chinesische Rose", 
            preis: 19.99,
            bild: "images/Firefly_3 Energy drink dosen, auf Tisch in einem Cafe mit Lernblättern und beige, gold Beleuc 493448.jpg"
        },
        "Produkt4": { 
            name: "Camélia Boost", 
            gewicht: "0,5 l", 
            geschmack: "Kamelien", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe mit Lernblättern und rosa-rot Beleuchtung  971876.jpg"
        },
        "Produkt5": { 
            name: "Zestador", 
            gewicht: "0,5 l", 
            geschmack: "chinesische Orange", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe und orange-grün Licht im Hintergrund, Oran 493448.jpg"
        },
        "Produkt6": { 
            name: "Sage Storm", 
            gewicht: "0,5 l", 
            geschmack: "Salbei & Schwertlilie", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe mit Lernblättern und Saphire blau-lila Bel 79690.jpg"
        },
        "Produkt7": { 
            name: "Oud Charge", 
            gewicht: "0,5 l", 
            geschmack: "grüner Kardamom", 
            preis: 3.49,
            bild: "images/Firefly_Energy drink dose, auf Tisch in einem Cafe mit Lernblättern und grün-braun Beleuchtun 493448.jpg"
        }
    };

    let warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];

    function zeigeWarenkorb() {
        const inhaltDiv = document.getElementById("warenkorb-inhalt");
        inhaltDiv.innerHTML = `
            <img src="images/xmark-svgrepo-com.svg" id="schließen-warenkorb" alt="Schließen" class="close-icon">
        `;

        let gesamtPreis = 0;

        warenkorb.forEach((item, index) => {
            const produkt = produkte[item.name];
            const produktPreis = item.menge * produkt.preis;
            gesamtPreis += produktPreis;

            inhaltDiv.innerHTML += `
                <div class="produkt">
                    <img src="${produkt.bild}" alt="${produkt.name}" class="produkt-bild">
                    <div class="produkt-info">
                        <span><strong>${produkt.name}</strong></span>
                        <span>${produkt.gewicht}</span>
                        <span><strong>Geschmack:</strong> ${produkt.geschmack}</span>
                        <span><strong>Preis:</strong> ${produkt.preis.toFixed(2)} €</span>
                        <span><strong>Menge:</strong> ${item.menge}</span>
                    </div>
                    <img src="images/xmark-svgrepo-com.svg" class="entfernen" data-index="${index}" alt="Löschen">
                </div>
            `;
        });

        inhaltDiv.innerHTML += `
            <div class="gesamtpreis">
                <span><strong>Gesamtpreis:</strong> ${gesamtPreis.toFixed(2)} €</span>
            </div>
        `;

        document.getElementById("warenkorb-popup").style.display = "block";
        document.getElementById("overlayWK").style.display = "block";

        document.querySelectorAll(".entfernen").forEach(btn => {
            btn.addEventListener("click", function () {
                entferneProdukt(btn.dataset.index);
            });
        });
    }

    function hinzufuegenZumWarenkorb(id) {
        let produkt = produkte[id];
        let warenkorbItem = warenkorb.find(item => item.name === id);

        if (warenkorbItem) {
            warenkorbItem.menge += 1;
        } else {
            warenkorb.push({ name: id, menge: 1 });
        }

        localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
        updateWarenkorbBadge(); // Badge aktualisieren
    }

    function entferneProdukt(index) {
        if (warenkorb[index].menge > 1) {
            warenkorb[index].menge -= 1;
        } else {
            warenkorb.splice(index, 1);
        }

        localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
        zeigeWarenkorb();
        updateWarenkorbBadge(); // Badge aktualisieren
    }

    function loescheWarenkorb() {
        warenkorb = [];
        localStorage.removeItem("warenkorb");
        zeigeWarenkorb();
        updateWarenkorbBadge(); // Badge aktualisieren
    }

    // Funktion zum Bezahlen (wird den Warenkorb schließen und das Bestellbestätigungs-Pop-up anzeigen)
    function bezahlen() {
        // Warenkorb schließen
        document.getElementById("warenkorb-popup").style.display = "none";
        document.getElementById("overlayWK").style.display = "none";

        // Warenkorb löschen
        loescheWarenkorb();

        // Zufällige Bestellnummer generieren
        const bestellnummer = generateRandomID(20);

        // Bestellbestätigung anzeigen
        zeigeBestellBestaetigung(bestellnummer);
    }

    // Funktion zur Generierung einer zufälligen Bestellnummer (20 Zeichen)
    function generateRandomID(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomID = "";
        for (let i = 0; i < length; i++) {
            randomID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomID;
    }

    // Funktion zur Anzeige des Bestellbestätigungs-Pop-ups
    function zeigeBestellBestaetigung(bestellnummer) {
        // Bestellbestätigungs-Pop-up anzeigen
        document.getElementById("bestaetigung-popup").style.display = "block";
        document.getElementById("overlayWK-bestaetigung").style.display = "block";
        document.getElementById("bestellnummer").textContent = bestellnummer;

        // Bestellbestätigung schließt den Warenkorb-Pop-up
        document.getElementById("warenkorb-popup").style.display = "none";
        document.getElementById("overlayWK").style.display = "none";

        // Event-Listener für den Schließen-Button (Über das Schließen-Icon)
        document.getElementById("bestaetigung-schliessen").addEventListener("click", function () {
            document.getElementById("bestaetigung-popup").style.display = "none";
            document.getElementById("overlayWK-bestaetigung").style.display = "none";
        });
    }

    // Event-Listener für das Schließen der Bestellbestätigung (Über das X-Symbol)
    document.getElementById("bestaetigung-schliessen").addEventListener("click", function () {
        document.getElementById("bestaetigung-popup").style.display = "none";
        document.getElementById("overlayWK-bestaetigung").style.display = "none";
    });

    // **Schließen des Warenkorbs**
    function schließeWarenkorb() {
        document.getElementById("warenkorb-popup").style.display = "none";
        document.getElementById("overlayWK").style.display = "none";
    }

    // Event-Listener für Schließen-Icon und Overlay
    document.addEventListener("click", function (event) {
        if (event.target.id === "schließen-warenkorb" || event.target.id === "overlayWK") {
            schließeWarenkorb();
        }
    });

    // Event-Listener für Produkte hinzufügen
    document.querySelectorAll("img[id^='Produkt']").forEach(icon => {
        icon.addEventListener("click", () => hinzufuegenZumWarenkorb(icon.id));
    });

    // Event-Listener für Warenkorb anzeigen
    document.querySelector(".einkauf-icon").addEventListener("click", () => zeigeWarenkorb());

    // Event-Listener für Löschen des gesamten Warenkorbs
    document.getElementById("loeschen").addEventListener("click", () => loescheWarenkorb());

    // Event-Listener für Bezahlen
    document.getElementById("bezahlen").addEventListener("click", () => bezahlen());

    function updateWarenkorbBadge() {
        const warenkorbIcon = document.querySelector(".einkauf-icon");

        if (warenkorb.length > 0) {
            warenkorbIcon.classList.add("has-items"); // Badge anzeigen
        } else {
            warenkorbIcon.classList.remove("has-items"); // Badge ausblenden
        }
    }


    //---------------------------------------

    const testimonials = [
        {
          name: "Larissa",
          role: "Wirtschaftsinformatik Studentin",
          flavor: "Camélia Boost",
          stars: 5,
          review: "Perfekt zum konzentrierten Lernen. Ich fühl mich danach wach – aber nicht nervös.",
          img: "https://randomuser.me/api/portraits/women/66.jpg"
        },
        {
          name: "Jakob",
          role: "Allgemeine Informatik Student",
          flavor: "Oud Charge",
          stars: 4,
          review: "Hilft mir mega beim Coden neuer Projekte und schmeckt zugleich richtig gut.",
          img: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
          name: "Tim",
          role: "Grafik und Design Student",
          flavor: "Provence Energy",
          stars: 4,
          review: "Regt bei mir die Fantasie zum erstellen von Grafiken an.",
          img: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        {
          name: "Justin",
          role: "BWL Student",
          flavor: "Zestador",
          stars: 3,
          review: "Nach langen Arbeitsnächten hilft mir dieser Drink auch noch die Vorlesung am Morgen zu überleben.",
          img: "https://randomuser.me/api/portraits/men/7.jpg"
        }
      ];
      
      const grid = document.getElementById("testimonialGrid");
      
      testimonials.forEach(person => {
        const card = document.createElement("div");
        card.className = "testimonial-card";
      
        const stars = "★".repeat(person.stars) + "☆".repeat(5 - person.stars);
      
        card.innerHTML = `
          <img src="${person.img}" alt="${person.name}" class="profile-pic" />
          <div class="name">${person.name}</div>
          <div class="role">${person.role}</div>
          <div class="stars">${stars}</div>
          <div class="review">„${person.review}“</div>
          <div class="flavor"><strong>${person.flavor}</strong></div>
        `;
      
        grid.appendChild(card);
      });
      
});
