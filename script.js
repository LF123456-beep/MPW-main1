// Navbar Ein- und Ausblenden beim Scrollen
let lastScrollTop = 0;
const header = document.getElementById('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar-Effekt beim Scrollen
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        // Nach unten scrollen - Navbar ausblenden
        header.style.top = `-${headerHeight}px`;
    } else {
        // Nach oben scrollen - Navbar einblenden
        header.style.top = '0';
    }

    // Transparente Navbar beim Öffnen, dunkler Hintergrund bei Scrollen
    header.classList.toggle('scrolled', scrollTop > 0);

    lastScrollTop = scrollTop;
});

// Carousel-Funktionalität
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');
let currentSlideIndex = 0;

const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
};

nextButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlidePosition();
});

prevButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
});

// Cookie-Consent-Funktionalität
document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    // Überprüfen, ob der Benutzer bereits eine Entscheidung getroffen hat
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        cookieConsent.style.display = 'none';
    });
});

// Kontaktformular mit AJAX
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(response => response.text().then(text => ({
                status: response.status,
                text: text
            })))
            .then(result => {
                formMessages.textContent = result.text;
                formMessages.style.color = result.status === 200 ? 'green' : 'red';
                if (result.status === 200) form.reset();
            })
            .catch(() => {
                formMessages.textContent = 'Es gab ein Problem beim Senden des Formulars.';
                formMessages.style.color = 'red';
            });
    });
});

// Menü-Umschaltfunktion für mobile Ansicht und Schließen der Navigation bei Link-Klick
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header");
    const navLinks = document.querySelectorAll("nav ul li a");

    // Menü-Umschaltfunktion für das Hamburger-Icon
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
    });

    // Schließen der Navigation, wenn ein Link geklickt wird
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav-open");
        });
    });
});

// Animation beim Scrollen
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
