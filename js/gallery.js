const filterButtons = document.querySelectorAll('.filter-btn');
const gallery = document.querySelector('.gallery');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

const columns = 3;
const gap = 20;

function layout() {
  let visibleItems = galleryItems.filter(i => !i.classList.contains('hide'));
  visibleItems.forEach((item, index) => {
    const x = (index % columns) * (item.offsetWidth + gap);
    const y = Math.floor(index / columns) * (item.offsetHeight + gap);
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
  const rows = Math.ceil(visibleItems.length / columns);
  gallery.style.height = `${rows * (visibleItems[0].offsetHeight + gap)}px`;
}

// initial layout
layout();

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;

    galleryItems.forEach(item => {
      if (cat === 'all' || item.dataset.category === cat) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });

    // reflow after hiding to animate properly
    setTimeout(layout, 400);
  });
});

window.addEventListener('resize', layout);


// Lightbox effect
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let currentindex = 0;

function getVisibleItems() {
    return galleryItems.filter(item => !item.classList.contains('hide'));
}

function openLightBox(index) {
    const visible = getVisibleItems();
    if (!visible.length) return;
    currentindex = index;
    lightboxImg.src = visible[currentindex].querySelector('img').src;
    lightbox.classList.add('active', 'fade-in');
    lightbox.classList.remove('fade-out');
}

function closeLightBox() {
    lightbox.classList.remove('active', 'fade-in', 'fade-out');
}


function switchImage(item) {
    lightbox.classList.remove('fade-in');
    lightbox.classList.add('fade-out');
    setTimeout(() => {
        lightboxImg.src = item.querySelector('img').src;
        lightbox.classList.remove('fade-out');
        lightbox.classList.add('fade-in');
    }, 200);
}

function showNext() {
    const visible = getVisibleItems();
    currentindex = (currentindex + 1) % visible.length;
    switchImage(visible[currentindex]);
}

function showPrev() {
    const visible = getVisibleItems();
    currentindex = (currentindex -1 + visible.length) % visible.length;
    switchImage(visible[currentindex]);
}

galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const visible = getVisibleItems();
        const visibleIndex = visible.indexOf(item);
        openLightBox(visibleIndex);
    });
});



closeBtn.addEventListener('click', closeLightBox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightBox();
});

// keyboard support
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightBox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

// Optional: close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

