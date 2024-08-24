const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input[type='text']");
const todoList = document.querySelector("#todo-list");

let todos = [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(index) {
  todos.splice(index, 1); // Remove the todo from the array
  saveTodos();            // Save the updated array to localStorage
  renderTodos();          // Re-render the list
}

function editTodo() {
  const todoItem = this.parentNode.parentNode;
  const todoText = todoItem.firstChild.textContent;
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todoText;
  todoItem.replaceChild(editInput, todoItem.firstChild);

  const saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.classList.add("save-btn");
  todoItem.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    const newTodoText = editInput.value;
    if (newTodoText === "") {
      alert("Please enter a valid todo.");
    } else {
      const todoTextElement = document.createElement("span");
      todoTextElement.classList.add("todo-text");
      todoTextElement.textContent = newTodoText;
      todoItem.replaceChild(todoTextElement, editInput);
      todoItem.removeChild(saveButton);
      todoItem.classList.remove("editing");
    }
  });

  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.classList.add("cancel-btn");
  todoItem.appendChild(cancelButton);

  cancelButton.addEventListener("click", () => {
    const todoTextElement = document.createElement("span");
    todoTextElement.classList.add("todo-text");
    todoTextElement.textContent = todoText;
    todoItem.replaceChild(todoTextElement, editInput);
    todoItem.removeChild(saveButton);
    todoItem.removeChild(cancelButton);
    todoItem.classList.remove("editing");
  });

  todoItem.classList.add("editing");
}

function updateTodo() {
  const liIndex = parseInt(todoForm.getAttribute("data-index"));
  const newTitle = todoInput.value;
  todos[liIndex].title = newTitle;
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoForm.removeAttribute("data-index");
  todoForm.querySelector("button[type='submit']").classList.remove("edit-btn");
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.id = todo.id;
    const div = document.createElement("div");
    div.classList.add("todo-item");
    const span = document.createElement("span");
    span.textContent = todo.title;
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editTodo);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(index)); // Pass the correct index here
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);
    div.appendChild(span);
    div.appendChild(btnContainer);
    li.appendChild(div);
    todoList.appendChild(li);
  });
}

function init() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

init();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = todoInput.value.trim();
  if (title === "") {
    return;
  }
  if (todoForm.getAttribute("data-index")) {
    updateTodo();
    return;
  }
  const todo = {
    id: Date.now(),
    title: title,
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
  todoInput.value = "";
});

function editTodo() {

  const todoItem = this.parentNode.parentNode;
  const todoText = todoItem.firstChild.textContent;
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todoText;

  // Apply inline styles
  editInput.style.width = "100%";
  editInput.style.padding = "10px";
  editInput.style.marginRight = "10px";
  editInput.style.borderRadius = "5px";
  editInput.style.border = "1px solid #ccc";
  editInput.style.boxSizing = "border-box";
  editInput.style.outline = "none";

  todoItem.replaceChild(editInput, todoItem.firstChild);

  const editBtn = this;
  const deleteBtn = todoItem.querySelector(".btn-container button:nth-child(2)");

  const saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.classList.add("save-btn");
  todoItem.querySelector(".btn-container").appendChild(saveButton);

  // Hide the Edit and Delete buttons during editing
  editBtn.style.display = "none";
  deleteBtn.style.display = "none";

  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.classList.add("cancel-btn");
  todoItem.querySelector(".btn-container").appendChild(cancelButton);

  cancelButton.addEventListener("click", () => {
    const todoTextElement = document.createElement("span");
    todoTextElement.classList.add("todo-text");
    todoTextElement.textContent = todoText;
    todoItem.replaceChild(todoTextElement, editInput);

    // Remove the Save and Cancel buttons and reset to original state
    saveButton.remove();
    cancelButton.remove();
    editBtn.style.display = ""; // Show the Edit button again
    deleteBtn.style.display = ""; // Show the Delete button again

    todoItem.classList.remove("editing");
  });

  saveButton.addEventListener("click", () => {
    const newTodoText = editInput.value.trim();
    if (newTodoText === "") {
      alert("Please enter a valid todo.");
    } else {
      const todoTextElement = document.createElement("span");
      todoTextElement.classList.add("todo-text");
      todoTextElement.textContent = newTodoText;
      todoItem.replaceChild(todoTextElement, editInput);

      // Remove the Save and Cancel buttons and reset to original state
      saveButton.remove();
      cancelButton.remove();
      editBtn.style.display = ""; // Show the Edit button again
      deleteBtn.style.display = ""; // Show the Delete button again

      todoItem.classList.remove("editing");
    }
  });
  todoItem.classList.add("editing");
}