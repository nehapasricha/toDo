const addButton = document.getElementById("add");
const task = document.getElementById("task");
let tasks = [];

addButton.addEventListener("click", (e) => {
  const newTask = task.value;
  if (newTask && newTask.length) {
    let tasks = getTodoTasks();
    tasks.push(newTask);
    saveData(tasks, getDoneTasks());
    task.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.innerHTML);
}

function drop(ev) {
  ev.preventDefault();
  var item = ev.dataTransfer.getData("text");
  let todoTasks = getTodoTasks();
  todoTasks = todoTasks.filter((todo) => todo !== item);
  let doneTasks = getDoneTasks();
  doneTasks.push(item);
  saveData(todoTasks, doneTasks);
}

function dropToDo(ev) {
  ev.preventDefault();
  var item = ev.dataTransfer.getData("text");
  let doneTasks = getDoneTasks();
  doneTasks = doneTasks.filter((done) => done !== item);
  let todoTasks = getTodoTasks();
  todoTasks.push(item);
  saveData(todoTasks, doneTasks);
}

function updateUI() {
  let html = "";
  let todoTasks = getTodoTasks();
  if (todoTasks && todoTasks.length) {
    todoTasks.forEach((item) => {
      html += `<div class="todo-task"  draggable="true" ondragstart="drag(event)">${item}</div>`;
    });
  }

  let doneTasks = getDoneTasks();
  let done = "";
  if (doneTasks && doneTasks.length) {
    doneTasks.forEach((item) => {
      done += `<div class="done-task"  draggable="true" ondragstart="drag(event)">${item}</div>`;
    });
  }

  document.querySelector(".todo-tasks").innerHTML = html;
  document.querySelector(".done-tasks").innerHTML = done;
}

function getTodoTasks() {
  let data = localStorage.getItem("task");
  let todoTasks = [];
  if (data) {
    data = JSON.parse(data);
    todoTasks = data.todo || [];
  }
  return todoTasks;
}

function getDoneTasks() {
  let data = localStorage.getItem("task");
  let doneTasks = [];
  if (data) {
    data = JSON.parse(data);
    doneTasks = data.done || [];
  }
  return doneTasks;
}

function saveData(toDoTasks, doneTasks) {
  const dataToSave = JSON.stringify({ todo: toDoTasks, done: doneTasks });
  localStorage.setItem("task", dataToSave);
  updateUI();
}
