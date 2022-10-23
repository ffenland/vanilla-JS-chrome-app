const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list");
const priority = document.querySelectorAll("input[name='priority']");
const todoChat = document.querySelector(".todo-chat");

const TODOS_KEY = "todos";

let todos = [];

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

const deleteTodo = (e) => {
  const li = e.target.parentElement;
  li.remove();
  const deletedTodos = todos.filter((item) => item.id + "" !== li.id);
  todos = deletedTodos;
  saveTodos();
};

const paintTodo = (todoObj) => {
  const li = document.createElement("li");
  li.id = todoObj.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerText = todoObj.text;
  button.innerText = "💥";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
};

const reviewTodo = (todos) => {
  const chatScreen = document.querySelector(".chat-screen");
  const todochatRow = document.createElement("div");
  todochatRow.className = "todo-chat__row";
  const todochatRowReview = document.createElement("div");
  todochatRowReview.className = "todo-chat__row__review";

  const span = document.createElement("span");
  span.innerText = "현재까지 등록한 todo입니다.";

  const todosUl = document.createElement("ul");
  todosUl.className = "todo-chat__todos";

  todos.forEach((todo) => {
    const todosLi = document.createElement("li");
    todosLi.className = "todos__li";
    todosLi.id = todo.id;
    const todosDetail = document.createElement("div");
    todosDetail.className = "todos__detail";
    const todochatTag = document.createElement("div");
    todochatTag.className = "todo-chat__row__set__tag";
    todochatTag.style.backgroundColor = todo.tag;
    const todosText = document.createElement("span");
    todosText.className = "todos__text";
    todosText.innerText = todo.text;
    todosDetail.appendChild(todochatTag);
    todosDetail.appendChild(todosText);
    const deleteButton = document.createElement("button");
    deleteButton.className = "todos__delete";
    deleteButton.innerText = "완료";
    deleteButton.addEventListener("click", deleteTodo);
    //
    todosLi.appendChild(todosDetail);
    todosLi.appendChild(deleteButton);
    todosUl.appendChild(todosLi);
  });
  todochatRowReview.appendChild(span);
  todochatRowReview.appendChild(todosUl);
  todochatRow.appendChild(todochatRowReview);
  todoChat.appendChild(todochatRow);
  chatScreen.scrollTop = chatScreen.scrollHeight;
};

const sendTodo = (todoObj) => {
  // 작성한 todo를 채팅창에 넣기
  const todochatRow = document.createElement("div");
  todochatRow.className = "todo-chat__row todo-chat__row-reverse";
  const todochatSet = document.createElement("div");
  todochatSet.className = "todo-chat__row__set";
  todochatSet.id = todoObj.id;
  const todochatText = document.createElement("span");
  todochatText.className = "todo-chat__row__set__text";
  todochatText.innerText = todoObj.text;
  const todochatTag = document.createElement("div");
  todochatTag.className = "todo-chat__row__set__tag";
  todochatTag.style.backgroundColor = todoObj.tag;
  todochatSet.appendChild(todochatTag);
  todochatSet.appendChild(todochatText);
  todochatRow.appendChild(todochatSet);
  todoChat.appendChild(todochatRow);
};

const getPriority = () => {
  for (const priorityButton of priority) {
    if (priorityButton.checked) {
      return priorityButton.value;
    }
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const tag = getPriority();
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    tag,
  };
  todos.push(newTodoObj);
  saveTodos();
  sendTodo(newTodoObj);
  reviewTodo(todos);
};

todoForm.addEventListener("submit", handleSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  reviewTodo(todos);
  //parsedTodos.forEach(paintTodo);
}

if (signedUser) {
  const welcome = document.querySelector(".todo-chat__row__review__welcome");
  welcome.innerText = `어서오세요 ${signedUser}`;
}
