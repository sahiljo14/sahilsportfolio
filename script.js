var typed = new Typed('#element', {
    strings: ['an Electronics Student.', 'a Tech Enthusiast.', 'a Software Developer.'],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true
});

function revealSections() {
    const sections = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        // Check if section is in viewport
        if (sectionTop < windowHeight - 100 && sectionBottom > 100) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });
}

// Trigger on scroll and page load
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);