const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const next = document.querySelector(".next-button");
const prev = document.querySelector(".prev-button");

let angle = 0;


next.addEventListener("click", () => {
  angle -= 60;
  track.style.transform = `rotateY(${angle}deg)`;
});

prev.addEventListener("click", () => {
  angle += 60;
  track.style.transform = `rotateY(${angle}deg)`;
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const cardAngle = card.style.getPropertyValue("--x");
    angle = parseInt(cardAngle);
    track.style.transform = `rotateY(${angle}deg)`;
  });
});