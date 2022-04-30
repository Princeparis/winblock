const bodyTag = document.querySelector("body")
const navTrigger = document.querySelector(".nav-toggle")

navTrigger.addEventListener("click", function(event) {
    bodyTag.classList.toggle("nav-open")
    event.preventDefault();
})