const initialTodos = [
  {
    id: 1,
    title: "Go to Gym",
  },
  {
    id: 2,
    title: "Buy Groceries",
  },
  {
    id: 3,
    title: "Prepare Lunch",
  },
  {
    id: 4,
    title: "Clean Dishes",
  },
];

let todos = [...initialTodos];

function addTodo() {
  const todoTitle = document.querySelector("input").value;
  if (todoTitle.trim() !== "") {
    todos.push({
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    });
    render();
    document.querySelector("input").value = "";
  }
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== Number(id));
  render();
}

function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === Number(id) ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

let editTodoId = null;

function editTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  document.querySelector("#editTaskInput").value = todo.title;
  editTodoId = id;
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

function saveEditTodo() {
  const newTitle = document.querySelector("#editTaskInput").value;
  if (newTitle.trim() !== "") {
    todos = todos.map((todo) =>
      todo.id === editTodoId ? { ...todo, title: newTitle } : todo
    );
    render();
    editTodoId = null;
    const editModal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    editModal.hide();
  }
}

function render() {
  const todosDiv = document.querySelector(".todos");
  todosDiv.innerHTML = "";

  todos.map((todo) => {
    const div = document.createElement("div");
    div.className = `list-group-item todo-item ${
      todo.completed ? "completed" : ""
    }`;

    const titleSpan = document.createElement("span");
    titleSpan.className = "todo-title";
    titleSpan.innerHTML = todo.title;

    const completeBtn = document.createElement("button");
    completeBtn.className = "btn btn-success btn-sm me-2";
    completeBtn.innerHTML = todo.completed ? "Unmark" : "Complete";
    completeBtn.setAttribute("onclick", `toggleComplete(${todo.id})`);

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning btn-sm me-2";
    editBtn.innerHTML = "Edit";
    editBtn.setAttribute("onclick", `editTodo(${todo.id})`);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("onclick", `deleteTodo(${todo.id})`);

    div.appendChild(titleSpan);
    div.appendChild(completeBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    todosDiv.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", render);
