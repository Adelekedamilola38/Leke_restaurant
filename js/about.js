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


