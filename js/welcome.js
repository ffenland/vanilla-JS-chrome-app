const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const welcome = document.querySelector("#welcome");

// string 변수는 대문자로 쓰도록 하자.
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const paintGreetings = (username) => {
  welcome.innerText = `안녕하세요. ${username}`;
  welcome.classList.remove(HIDDEN_CLASSNAME);
};

const onLoginSubmit = (e) => {
  e.preventDefault();
  const username = loginInput.value;
  console.log(username);
  localStorage.setItem(USERNAME_KEY, username);
  loginForm.classList.add(HIDDEN_CLASSNAME);
  paintGreetings(username);
};

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
