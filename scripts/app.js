import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// Header Button
let addTaskBtn = document.getElementById("addTaskBtn");

// Title Counts
let toDoCount = document.getElementById("toDoCount");
let inProgressCount = document.getElementById("inProgressCount");
let completedCount = document.getElementById("completedCount");

// ID Divs for Creating Elements
let toDo = document.getElementById("toDo");
let inProgress = document.getElementById("inProgress");
let completed = document.getElementById("completed");
// JavaScript Variable
let statusDiv = [toDo, inProgress, completed];

// Task Modal IDs
let task = {
    name: document.getElementById("name"),
    status: document.getElementById("status"),
    description: document.getElementById("description"),
    priority: document.getElementById("priority"),
    dueDate: document.getElementById("dueDate")
};

let taskNameForDelete = document.getElementById("taskNameForDelete");

// Buttons
let saveTaskInfo = document.getElementById("saveTaskInfo");
let closeTaskInfo = document.getElementById("closeTaskInfo");
let deleteBtn = document.getElementById("deleteBtn");
let yesDeleteBtn = document.getElementById("yesDeleteBtn");
let noDeleteBtn = document.getElementById("noDeleteBtn");
let confirmDeletionDiv = document.getElementById("confirmDeletionDiv");

// Creating Task Elements Function
function createTask(statusDiv, taskLocal) {
    let div = document.createElement('div');
    div.classList.add("bgTask");

    let h4 = document.createElement('h4');
    h4.textContent = taskLocal.name;

    let p = document.createElement('p');
    p.textContent = taskLocal.description;

    let button = document.createElement('button');
    button.innerHTML = "View/ Edit Task"
    button.classList.add("btn", "btn-dark");

    div.append(h4, p, button);
    statusDiv.appendChild(div);

    button.addEventListener('click', () => {
        addTaskBtn.click();
        task.name.value = taskLocal.name;
        task.status.value = taskLocal.status;
        task.description.value = taskLocal.description;
        task.priority.value = taskLocal.priority;
        task.dueDate.value = taskLocal.dueDate;
    });
}

// Populate Page Function
function populate() {
    // this retrieves our data from local storage and stores it into favorites variable
    let taskList = getLocalStorage();

    // establish counters
    let toDoCounter = 0;
    let inProgressCounter = 0;
    let completedCounter = 0;

    // clears div so the array displayed will not constantly repeat    
    statusDiv.forEach(status => { status.textContent = ""; });

    // map through each element in our array
    taskList.map(task => {
        if (task.status == "toDo") {
            createTask(toDo, task);
            toDoCounter++;
        } else if (task.status == "inProgress") {
            createTask(inProgress, task);
            inProgressCounter++;
        } else if (task.status == "completed") {
            createTask(completed, task);
            completedCounter++;
        }
    });

    toDoCount.textContent = toDoCounter;
    inProgressCount.textContent = inProgressCounter;
    completedCount.textContentt = completedCounter;
}

// Onload
window.addEventListener('load', function() {
    populate();
});

// AddEventListenr for Add Task - Save Button
saveTaskInfo.addEventListener('click', () => {
    if (task.name.value && task.status.value) {
        saveToLocalStorage({
            name: task.name.value,
            status: task.status.value,
            description: task.description.value,
            priority: task.priority.value,
            dueDate: task.dueDate.value,
        });

        populate();
    }
});


// Delete Task on Modal
yesDeleteBtn.addEventListener('click', () => {
    removeFromLocalStorage({
        name: task.name.value,
        status: task.status.value,
        description: task.description.value,
        priority: task.priority.value,
        dueDate: task.dueDate.value,
    });

    task.name.value = "";
    task.status.value = "";
    task.description.value = "";
    task.priority.value = "";
    task.dueDate.value = "";
    removeDeleteMessage();
    populate();
});

deleteBtn.addEventListener('click', () => {
    if (task.name.value) {
        confirmDeletionDiv.classList.remove("d-none");
        confirmDeletionDiv.classList.add("d-block");
        taskNameForDelete.textContent = task.name.value;
    }
});

noDeleteBtn.addEventListener('click', () => {
    removeDeleteMessage();
});

function removeDeleteMessage() {
    confirmDeletionDiv.classList.remove("d-block");
    confirmDeletionDiv.classList.add("d-none");
}

// Close Modal
closeTaskInfo.addEventListener('click', () => {
    removeDeleteMessage();
});

//Open Modal
addTaskBtn.addEventListener('click', () => {
    task.name.value = "";
    task.status.value = "";
    task.description.value = "";
    task.priority.value = "";
    task.dueDate.value = "";
    removeDeleteMessage();
});