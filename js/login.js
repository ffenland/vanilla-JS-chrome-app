const nameForm = document.querySelector(".login-form");
const nameInput = nameForm.querySelector("input");
const leftScreen = document.querySelector(".left-screen");
const rightScreen = document.querySelector(".right-screen");

// string 변수는 대문자로 쓰도록 하자.
const HIDE_CLASSNAME = "hide";
const RIGHT_HIDE_CALSSNAME = "right-hide";
const LEFT_HIDE_CLASSNAME = "left-hide";
const USERNAME_KEY = "username";

const handleLoginSubmit = (e) => {
  e.preventDefault();
  const username = nameInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  nameForm.classList.add(HIDE_CLASSNAME);
  leftScreen.classList.add(LEFT_HIDE_CLASSNAME);
  rightScreen.classList.add(RIGHT_HIDE_CALSSNAME);
};

nameForm.addEventListener("submit", handleLoginSubmit);

const signedUser = localStorage.getItem(USERNAME_KEY);

if (signedUser) {
  nameForm.classList.add(HIDE_CLASSNAME);
  leftScreen.classList.add(LEFT_HIDE_CLASSNAME);
  rightScreen.classList.add(RIGHT_HIDE_CALSSNAME);
}
