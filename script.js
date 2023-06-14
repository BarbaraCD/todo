const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".task-container");

const validateInput = () => inputElement.value.trim().length > 0;
let taskCount = 0;

const handleKeyDown = (event) => {
  if (event.key === "Enter") {
      handleAddTask();
  }
};


const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskCount++;
    taskContent.innerText = `${taskCount}) ${inputElement.value}`;

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("fa-regular");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();
};

const handleClick = (taskContent) => {
    taskContent.classList.toggle("completed");
    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer) => {
    taskItemContainer.remove();
    taskCount--;

    // Atualiza os números das tarefas restantes
    const taskItems = taskContainer.querySelectorAll(".task-item");
    taskItems.forEach((taskItem, index) => {
        const taskContent = taskItem.querySelector("p");
        taskContent.innerText = `${index + 1}) ${taskContent.innerText.substr(taskContent.innerText.indexOf(" ") + 1)}`;
    });

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = Array.from(taskContainer.querySelectorAll(".task-item"));

    const localStorageTasks = tasks.map((task) => {
        const taskContent = task.querySelector("p");
        const isCompleted = taskContent.classList.contains("completed");

        return { description: taskContent.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

    if (!tasksFromLocalStorage) return;

    taskCount = 0;

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");

        taskCount++;
        const taskContent = document.createElement("p");
        taskContent.innerText = (task.description);
        if (task.isCompleted) {
            taskContent.classList.add("completed");
        }

        taskContent.addEventListener("click", () => handleClick(taskContent));

        const deleteItem = document.createElement("i");
        deleteItem.classList.add("fa-regular");
        deleteItem.classList.add("fa-trash-alt");

        deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer));

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);

        taskContainer.appendChild(taskItemContainer);
    }
};

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("change", handleInputChange);
inputElement.addEventListener("keydown", handleKeyDown);