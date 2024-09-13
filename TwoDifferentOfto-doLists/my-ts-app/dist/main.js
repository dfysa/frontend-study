"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    const newTodoInput = document.querySelector("#newTodo");
    const todosList = document.querySelector("#todos");
    const todos = [];
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
    (_a = document.querySelector("#addTodo")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTodo);
    newTodoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
});
