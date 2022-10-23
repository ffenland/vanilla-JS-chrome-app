const clock = document.querySelector(".clock");
const clockHours = document.querySelector(".hours");
const clockMinutes = document.querySelector(".minutes");
const clockSecond = document.querySelector(".second");

const getClock = () => {
  const date = new Date();
  const hours =
    date.getHours() >= 13
      ? String(date.getHours() - 12).padStart(2, "0")
      : String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  if (clockHours.innerText !== hours) {
    clockHours.innerText = hours;
  }
  if (clockMinutes.innerText !== minutes) {
    clockMinutes.innerText = minutes;
  }
  if (clockSecond.innerText !== second) {
    clockSecond.innerText = second;
  }
};

const blinking = (e) => {
  if (e.target.innerText.length === 2) {
    e.target.animate(
      [
        { opacity: 0 },
        { opacity: 0.3 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 0.3 },
        { opacity: 0 },
      ],
      {
        duration: 1000,
      }
    );
  } else {
  }
};

clockSecond.addEventListener("DOMSubtreeModified", blinking);
clockMinutes.addEventListener("DOMSubtreeModified", blinking);
clockHours.addEventListener("DOMSubtreeModified", blinking);
getClock();
setInterval(getClock, 1000);
