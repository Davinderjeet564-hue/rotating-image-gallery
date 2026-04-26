const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const next = document.querySelector(".next-button");
const prev = document.querySelector(".prev-button");

let angle = 0;

function rotateCarousel() {
  track.style.transform = `rotateY(${angle}deg)`;
}

function getActiveIndex() {
  // Normalize angle to positive value and find active card
  const normalizedAngle = ((angle % 360) + 360) % 360;
  return Math.round(normalizedAngle / 60) % cards.length;
}
 
function updateActiveCard() {
  cards.forEach((card, index) => {
    card.classList.toggle("active", index === getActiveIndex());
  });
}

updateActiveCard();

next.addEventListener("click", () => {
  angle += 60;
  rotateCarousel();
  updateActiveCard();
});

prev.addEventListener("click", () => {
  angle -= 60;
  rotateCarousel();
  updateActiveCard();
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    angle += 60;
    rotateCarousel();
    updateActiveCard();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    angle += 60;
    rotateCarousel();
    updateActiveCard();
  }
  if (e.key === "ArrowRight") {
    angle -= 60;
    rotateCarousel();
    updateActiveCard();
  }
});