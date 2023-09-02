const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <span>${task}</span>
      <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
        taskList.appendChild(li);
    });

    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

// Add task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
}

// Delete task from the list
function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Attach event listeners
addTaskBtn.addEventListener('click', addTask);
displayTasks();