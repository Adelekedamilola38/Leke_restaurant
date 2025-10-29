document.addEventListener("scroll", function() {
  const parallax = document.querySelector(".bg-image");
  let scrolled = window.pageYOffset;
  
  let offset = scrolled * 0.25;

  parallax.style.backgroundPosition = "center " + (-offset) + "px";
});

document.addEventListener("scroll", function() {
  const parallax = document.querySelector(".bg-image2");
  let scrolled = window.pageYOffset;
  
  let offset = scrolled * 0.25;

  parallax.style.backgroundPosition = "center " + (-offset) + "px";
});