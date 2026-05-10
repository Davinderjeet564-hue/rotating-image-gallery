const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const next = document.querySelector(".next-button");
const prev = document.querySelector(".prev-button");
const images = document.querySelectorAll(".card img");

let angle = 0;
let touchStartX = 0;
let touchEndX = 0;
let isSwipe = false;

// Image error handling
images.forEach((img, index) => {
  img.addEventListener('error', function() {
    handleImageError(this, index);
  });
  
  img.addEventListener('load', function() {
    this.parentElement.classList.remove('error-state');
    this.parentElement.classList.add('loaded');
  });
});

function handleImageError(img, index) {
  const card = img.parentElement;
  card.classList.add('error-state');
  
  // Create placeholder
  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.innerHTML = `
    <div class="placeholder-icon">🖼️</div>
    <div class="placeholder-text">Image not available</div>
  `;
  
  img.style.display = 'none';
  card.appendChild(placeholder);
}

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

// Touch/swipe support
track.addEventListener('touchstart', handleTouchStart, { passive: true });
track.addEventListener('touchend', handleTouchEnd, { passive: true });
track.addEventListener('touchmove', handleTouchMove, { passive: true });

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
  isSwipe = false;
}

function handleTouchMove(e) {
  if (!touchStartX) return;
  
  const touchX = e.touches[0].clientX;
  const diff = touchStartX - touchX;
  
  // Detect swipe gesture (threshold of 50px)
  if (Math.abs(diff) > 50) {
    isSwipe = true;
  }
}

function handleTouchEnd(e) {
  if (!touchStartX || !isSwipe) return;
  
  touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;
  
  // Swipe left (next)
  if (diff > 50) {
    angle += 60;
    rotateCarousel();
    updateActiveCard();
  }
  // Swipe right (previous)
  else if (diff < -50) {
    angle -= 60;
    rotateCarousel();
    updateActiveCard();
  }
  
  touchStartX = 0;
  touchEndX = 0;
  isSwipe = false;
}

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