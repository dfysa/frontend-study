document.addEventListener("DOMContentLoaded", () => {
  const newTodoInput = document.querySelector("#newTodo") as HTMLInputElement;

  const todosList = document.querySelector("#todos") as HTMLUListElement;
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  const todos: Todo[] = [];
  const addTodo = () => {
    const newTodoText = newTodoInput.value.trim();
    if (newTodoText) {
      todos.push({ id: Date.now(), text: newTodoText, completed: false });
      renderTodos();
      newTodoInput.value = "";
    }
  };
  const renderTodos = () => {
    todosList.innerHTML = "";
    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
      });
      const text = document.createTextNode(todo.text);
      todoItem.appendChild(checkbox);
      todoItem.appendChild(text);
      todosList.appendChild(todoItem);
    });
  };
  document.querySelector("#addTodo")?.addEventListener("click", addTodo);
  newTodoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });
});