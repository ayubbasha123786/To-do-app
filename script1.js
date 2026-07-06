const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// Load saved tasks
loadTasks();

// Add task
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Clear all tasks
clearBtn.addEventListener("click", function () {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskText, false);
    saveTasks();
    taskInput.value = "";
}

function createTask(taskText, completed) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    if (completed) {
        span.classList.add("completed");
    }

    span.addEventListener("click", function () {
        span.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (item) {
        tasks.push({
            text: item.querySelector("span").textContent,
            completed: item.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });
}
