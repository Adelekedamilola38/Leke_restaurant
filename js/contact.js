const form = document.getElementById("contactForm");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  statusText.textContent = "Sending...";
  statusText.style.color = "#333";

  // Simulate sending message
  setTimeout(() => {
    statusText.textContent = "Message sent successfully!";
    statusText.style.color = "green";
    form.reset();
  }, 1500);
});