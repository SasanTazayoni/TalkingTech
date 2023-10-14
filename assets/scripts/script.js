const navbar = document.querySelector('.navbar');
const scrollToTop = document.querySelector('.scroll-up-link');

// Appearance of scroll-up link

window.addEventListener('scroll', function () {
    const scrollHeight = window.scrollY;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > (navHeight * 2)) {
        scrollToTop.classList.add('show-link');
    } else {
        scrollToTop.classList.remove('show-link');
    }
});