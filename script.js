//Ui
const moonIcon = document.querySelector(".icon");
const modeBtn = document.querySelector(".btn");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  moonIcon.classList.toggle("fa-moon");
  moonIcon.classList.toggle("fa-sun");
});

//counter

let targetTime = 900000;
let totalTime = targetTime;
let intervalId;
let isPaused = true;
const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const circle = document.querySelector(".progress-ring__circle");
const timerForm = document.querySelector(".form");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;
const mainHeading = document.querySelector(".main-heading");

//audio
const audio = document.querySelector(".audio");

//updateCircle
function updateCircle() {
  const progress = targetTime / totalTime;
  const offset = circumference * progress;
  circle.style.strokeDashoffset = offset;
}

//updateTime
function updateTime() {
  const minutes = Math.floor(targetTime / 60000);
  const seconds = Math.floor((targetTime % 60000) / 1000);
  timer.textContent = `${String(minutes).padStart(2, "0")} : ${String(
    seconds
  ).padStart(2, "0")}`;
}

//countDown
function countDown() {
  if (intervalId) return; // prevent multiple intervals
  intervalId = setInterval(() => {
    targetTime -= 1000;
    updateTime();
    updateCircle();

    if (targetTime <= 0) {
      timer.textContent = "Time's Up!";
      timer.classList.add("blink");
      clearInterval(intervalId);
      startBtn.disabled = true;
      audio.currentTime = 0;
      audio.play();
    }
  }, 1000);
}

//startbtn
startBtn.addEventListener("click", () => {
  if (isPaused) {
    document.querySelector(".pause").classList.remove("fa-play");
    document.querySelector(".pause").classList.add("fa-pause");
    countDown();
  } else {
    document.querySelector(".pause").classList.add("fa-play");
    document.querySelector(".pause").classList.remove("fa-pause");
    clearInterval(intervalId);
    intervalId = null;
  }
  isPaused = !isPaused;
});

//reStart btn
restartBtn.addEventListener("click", () => {
  targetTime = 900000;
  updateTime();
  circle.style.strokeDashoffset = circumference;
  updateCircle();
  clearInterval(intervalId);
  intervalId = null;
  totalTime = targetTime;
  startBtn.disabled = false;
  document.querySelector(".pause").classList.add("fa-play");
  document.querySelector(".pause").classList.remove("fa-pause");
});

//custom timer-form
timerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const timeInput = document.querySelector(".timeInput");
  const newTime = timeInput.value;
  const target = newTime * 60 * 1000;

  if (target > 5400000 || target < 60000) {
    document.querySelector(".error-msg").style.display = "block";
    return;
  }
  document.querySelector(".error-msg").style.display = "none";
  targetTime = target;
  totalTime = target;
  updateTime();
  updateCircle();
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
  isPaused = true;
  document.querySelector(".pause").classList.add("fa-play");
  document.querySelector(".pause").classList.remove("fa-pause");
});
