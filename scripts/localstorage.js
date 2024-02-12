// FIRST FUNCTION
const getLocalStorage = () => {
    // getting our values from local storage
    let localStorageData = localStorage.getItem("taskList");

    // we check if that data is null, is so we return an empty array
    if(localStorageData == null){
        return [];
    }

    // we return an array of local storage
    return JSON.parse(localStorageData);
};

const saveToLocalStorage = (task) => {
    // taskList will get the current values in local storage
    // aka saves the array in taskList
    let taskList = getLocalStorage();

    // Find the index of the existing task with the same name (**will return -1 if not found)
    const existingTaskIndex = taskList.findIndex(existingTask => existingTask.name === task.name);

    // If the task already exists, update it; otherwise, add it to the taskList
    if (existingTaskIndex !== -1) {
        // Replace the existing task with the updated task
        taskList[existingTaskIndex] = task;
    } else {
        // Add the new task to the taskList
        taskList.push(task);
    }

    // JSON.stringify insures whatever we save into local storage is a string
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

const removeFromLocalStorage = (task) => {
    // we're saving local storage data into taskList variable
    let taskList = getLocalStorage();

    // Find the index of the existing task with the same name (**will return -1 if not found)
    const existingTaskIndex = taskList.findIndex(existingTask => existingTask.name === task.name);

    // remove the name from the array using the .splice method
    if(existingTaskIndex !== -1){
        taskList.splice(existingTaskIndex, 1);
    }

    // we set our new mutated taskList array inside our local storage
    localStorage.setItem("taskList", JSON.stringify(taskList));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };