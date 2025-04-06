var typed = new Typed('#element', {
    strings: ['an Electronics Student.', 'a Tech Enthusiast.', 'a Software Developer.'],
    typeSpeed: 70,
});

function reveal() {
    var reveals = document.querySelectorAll(".secondSection, .ThirdSection, .fourthSection, .fifthSection");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("show");
        } else {
            reveals[i].classList.remove("show");
        }
    }
}
window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", reveal);