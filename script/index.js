const startBtn = document.querySelector(".main__wrapper-btn");
let display = document.querySelector(".main__display");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  display.style.display = "flex";
});
