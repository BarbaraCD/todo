const inputElement = document.querySelector(".newtask-input");
const addTaskButton = document.querySelector('.newtask-button');

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();


  if (!inputIsValid){
    return inputElement.classList.add("error");
  }

};

addTaskButton.addEventListener("click", () => handleAddTask());