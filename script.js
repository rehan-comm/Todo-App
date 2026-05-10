const input = document.getElementsByClassName("input")[0];
const btn = document.getElementsByClassName("add")[0];
const todo_container = document.getElementsByClassName("todo-container")[0];
const desc = document.getElementsByClassName("desc")[0];
const no = document.getElementsByClassName("no-todo")[0];

const STORAGE_KEY = "todoTasks";
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveTodos = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

const renderTodos = () => {
    todo_container.innerHTML = "";

    if (todos.length === 0) {
        no.innerText = "No todo yet!";
        return;
    }

    no.innerText = "";

    todos.forEach((task, index) => {
        const item = document.createElement("div");
        item.className = "todo-item";

        const header = document.createElement("div");
        header.className = "todo-header";

        const title = document.createElement("h3");
        title.innerText = task.title;

        const remove = document.createElement("button");
        remove.className = "delete-btn";
        remove.type = "button";
        remove.innerText = "✕";
        remove.title = "Delete task";
        remove.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        header.appendChild(title);
        header.appendChild(remove);

        const para = document.createElement("p");
        para.innerText = task.desc;

        item.appendChild(header);
        item.appendChild(para);
        todo_container.appendChild(item);
    });
};

btn.addEventListener("click", function () {
    const titleText = input.value.trim();
    const descText = desc.value.trim();

    if (titleText === "") {
        alert("Please Enter the Todo");
        return;
    }

    todos.push({ title: titleText, desc: descText });
    saveTodos();
    renderTodos();

    input.value = "";
    desc.value = "";
});

window.addEventListener("DOMContentLoaded", renderTodos);
