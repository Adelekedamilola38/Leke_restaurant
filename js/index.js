const heroBg = document.getElementById('heroBg');
const heroes = document.querySelectorAll('.hero');
const prevBtnHome = document.getElementById('prevBtnHome');
const nextBtnHome = document.getElementById('nextBtnHome');
const bars = document.querySelectorAll('.bar-home');

const backgroundImages = [
  "https://res.cloudinary.com/dedz0kba0/image/upload/v1761741501/side-view-penne-pasta-with-tomato-sauce-greens-plate_q56vcw.jpg",
  "https://res.cloudinary.com/dedz0kba0/image/upload/v1761741555/spaghetti-seafood_tszi8f.jpg",
  "https://res.cloudinary.com/dedz0kba0/image/upload/v1761741471/pasta-with-chicken-tomato-sauce-grated-cheese_klxscu.jpg"
];

let indexA = 0;
let autoSlide;

backgroundImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

heroBg.style.backgroundImage = `url(${backgroundImages[indexA]})`;

function restartAnimations(hero) {
  const elements = hero.querySelectorAll('h1, h2, p, .menu-btn');
  elements.forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow
    el.style.animation = '';
  });
}

const transitions = ["zoomOut", "fade-slide-left", "fade-slide-right"];

function changeSlide(newIndex) {
  newIndex = (newIndex + heroes.length) % heroes.length;

  heroes.forEach((slide, i) => {
    slide.classList.toggle('active', i === newIndex);
  });

  bars.forEach((dot, i) => {
    dot.classList.toggle('active', i === newIndex);
  });

  // background fade
  heroBg.classList.remove("fade", ...transitions);

  const transitionClass = transitions[newIndex % transitions.length];
  heroBg.classList.add(transitionClass);

  setTimeout(() => {
    heroBg.style.backgroundImage = `url(${backgroundImages[newIndex]})`;
    heroBg.classList.remove('fade');
  }, 100);

  setTimeout(() => {
    heroBg.classList.remove(transitionClass);
  }, 2000);

  indexA = newIndex;
  
  restartAnimations(heroes[newIndex]);
}

function nextSlide() {
  changeSlide(indexA + 1);
}
function prevSlide() {
  changeSlide(indexA - 1);
}

function startAuto() {
  stopAuto();
  autoSlide = setInterval(nextSlide, 8000);
}
function stopAuto() {
  clearInterval(autoSlide);
}

nextBtnHome.addEventListener('click', () => {
  nextSlide();
  startAuto();
});
prevBtnHome.addEventListener('click', () => {
  prevSlide();
  startAuto();
});
bars.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    changeSlide(i);
    startAuto();
  });
});

document.getElementById('eventSliderHome').addEventListener('mouseenter', stopAuto);
document.getElementById('eventSliderHome').addEventListener('mouseleave', startAuto);

startAuto();




window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-bar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});


document.addEventListener("scroll", function() {
  const parallax = document.querySelector(".overlay-section");
  let scrolled = window.pageYOffset;
  
  let offset = scrolled * 0.25;

  parallax.style.backgroundPosition = "center " + (-offset) + "px";
});


// Event time //
const eventDates = [
  new Date("Nov 21, 2025 20:00:00").getTime(),
  new Date("Nov 25, 2025 18:00:00").getTime(),
  new Date("Dec 05, 2025 19:30:00").getTime()
];

function updateCountDown() {
  const now = new Date().getTime();

  eventDates.forEach((date, i) => {
    const distance = date - now;

    const daysEl = document.getElementById(`days${i+1}`);
    const hoursEl = document.getElementById(`hours${i+1}`);
    const minutesEl = document.getElementById(`minutes${i+1}`);
    const secondsEl = document.getElementById(`seconds${i+1}`);

    if (!daysEl) return; // skip if not found

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  });
}

updateCountDown();
setInterval(updateCountDown, 1000);



const playBtn = document.getElementById('playVideo');
const popup = document.getElementById('videoPopup');
const closeButton = document.querySelector('.close-video-btn');
const iframe = document.getElementById('youtubeFrame');

const videoURL = "https://www.youtube.com/embed/xd-slRiRkEw?autoplay=1"

playBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('active');
  iframe.src = videoURL;
  document.body.style.overflow = 'hidden';

});

closeButton.addEventListener('click', () => {
  popup.classList.remove('active');
  iframe.src = "";
  document.body.style.overflow ='auto';
});



document.addEventListener("scroll", () => {
  const parallaxSection = document.querySelector(".video-bg");
  let scrolled = window.pageYOffset;
  let offset = scrolled * 0.25;

  parallaxSection.style.backgroundPosition = `center ${-offset}px`;
});





const slider = document.getElementById('eventSlider');
const cards = slider.querySelectorAll('.event-card');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dots = slider.querySelectorAll('.bar');
const bg1 = document.getElementById('eventBg1');
const bg2 = document.getElementById('eventBg2');

let currentBg = 1;

const bgImages = [
  "images/restaurant-interior.jpg",
  "images/close-up-seafood-spaghetti-with-mussels-shrimp-tomato-sauce-parsley.jpg",
  "images/front-view-pasta-with-minced-meat-brown-floor.jpg"
]

let index = Array.from(cards).findIndex(c => c.classList.contains('active'));
if (index < 0) index = 0;

let interval = null;

bgImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// show slide i and force animation restart
function showSlide(i) {
  i = ((i % cards.length) + cards.length) % cards.length; // normalize
  cards.forEach((card, idx) => {
    if (idx === i) {
      // remove class then force reflow and re-add to restart CSS animation
      card.classList.remove('active');
      void card.offsetWidth; // <-- force reflow
      card.classList.add('active');
      card.style.zIndex = 2;
    } else {
      card.classList.remove('active');
      card.style.zIndex = 1;
    }
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === i);
  });

  const nextBg = currentBg === 1 ? bg2 : bg1;
  const prevBg = currentBg === 1 ? bg1 : bg2;

  nextBg.style.backgroundImage = `url(${bgImages[i]})`;


  prevBg.classList.remove('active');
  nextBg.classList.add('active');

  currentBg = currentBg === 1 ? 2 : 1;

  index = i;
}

// autoplay
function startAutoSlide() {
  stopAutoSlide(); // ensure no duplicate intervals
  interval = setInterval(() => {
    showSlide(index + 1);
  }, 8000);
}
function stopAutoSlide() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

// manual nav (reset autoplay so user has time to read)
nextBtn.addEventListener('click', () => {
  showSlide(index + 1);
  stopAutoSlide();
  startAutoSlide();
});
prevBtn.addEventListener('click', () => {
  showSlide(index - 1);
  stopAutoSlide();
  startAutoSlide();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const i = parseInt(dot.dataset.index, 10);
    showSlide(i);
    stopAutoSlide();
    startAutoSlide();
  });
});

// pause on hover, resume on leave
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// init
bg1.style.backgroundImage = `url(${bgImages[index]})`;
bg1.classList.add('active');

showSlide(index);
startAutoSlide();


const customerRv = document.querySelectorAll('.customer-review');
const prevBtnRv = document.getElementById('prevBtnReview');
const nextBtnRv = document.getElementById('nextBtnReview');
const rvBars = document.querySelectorAll('.bar-review');

let indexB = 0;
let autoSlid;

function rsAnimation(custReview) {
  const elements = custReview.querySelectorAll('img, p, span, h4');
  elements.forEach(li => {
    li.style.animation = 'none';
    void li.offsetWidth;
    li.style.animation = '';
  });
}

function chngSlide(reviewIndex) {
  reviewIndex = (reviewIndex + customerRv.length) % customerRv.length;

  customerRv.forEach((slid, i) => {
    slid.classList.toggle('active', i === reviewIndex);

  });

  rvBars.forEach((dt, i) => {
    dt.classList.toggle('active', i === reviewIndex);
  });

  indexB = reviewIndex;

  rsAnimation(customerRv[reviewIndex]);
}

function nxtSlid() {
  chngSlide(indexB + 1);
}
function prvSlid() {
  chngSlide(indexB - 1);
}

function strtAuto() {
  stpAuto();
  autoSlid = setInterval(nxtSlid, 5000);
}
function stpAuto() {
  clearInterval(autoSlid);
}

nextBtnRv.addEventListener('click', () => {
  nxtSlid();
  strtAuto();
});
prevBtnRv.addEventListener('click', () => {
  prvSlid();
  strtAuto();
});
rvBars.forEach((dt, i) => {
  dt.addEventListener('click', () => {
    chngSlide(i);
    strtAuto();
  });
});


document.getElementById('reviewSlider').addEventListener('mouseenter', stpAuto);
document.getElementById('reviewSlider').addEventListener('mouseleave', strtAuto);

strtAuto();