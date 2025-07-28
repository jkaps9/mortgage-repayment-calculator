import "./styles.css";

const mobileMenu = document.querySelector(".mobile-menu");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  hamburger.classList.toggle("close");
});
