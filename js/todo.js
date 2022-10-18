const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list");

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

const handleSubmit = (e) => {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);

  saveTodos();
};

todoForm.addEventListener("submit", handleSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
