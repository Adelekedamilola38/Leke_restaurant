function loadComponent(id, file, callback) {
  fetch(`./components/${file}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error("Component load error:", err));
}

loadComponent("header", "header.html", () => {
  initNavScrollEffect();
  initBurgerMenu();
  initScrollToTop();
});

loadComponent("footer", "footer.html");






function initNavScrollEffect() {
  const nav = document.querySelector(".nav-bar");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}
  




function initBurgerMenu() {
  const burger = document.getElementById('burger');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  if (!burger || !sideMenu) return;

  function openMenu() {
    sideMenu.classList.add('show');
    overlay.classList.add('show');
    burger.classList.add('active');
    sideMenu.setAttribute('aria-hidden','false');
  }

  function closeMenu() {
    sideMenu.classList.remove('show');
    overlay.classList.remove('show');
    burger.classList.remove('active');
    sideMenu.setAttribute('aria-hidden','true');
  }

  burger.addEventListener('click', function () {
    if (sideMenu.classList.contains('show')) closeMenu();
    else openMenu();
  });

  window.addEventListener('scroll', function() {
    if (sideMenu.classList.contains('show')) closeMenu();

  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // close when link clicked (optional)
  document.querySelectorAll('.side-menu a').forEach(a => a.addEventListener('click', closeMenu));

  // debug: log references so you can inspect them if not working
  console.log('menu init', {burger, sideMenu, overlay, closeBtn});

}



function initScrollToTop() {

  const myBtn = document.getElementById("myBtn");

  if (!myBtn) return;

  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 500) {
      myBtn.style.display = "block";
    } else {
      myBtn.style.display ="none";
    }
  };

  myBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}

