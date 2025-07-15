// Array to store all tasks
let tasks = [];

// Get DOM elements
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const taskTypeSelect = document.getElementById('taskType');
const taskList = document.getElementById('taskList');
const searchBar = document.getElementById('searchBar');
const filterType = document.getElementById('filterType');

// Statistics elements
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');
const inProgressTasksSpan = document.getElementById('inProgressTasks');
const pendingTasksSpan = document.getElementById('pendingTasks');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayTasks();
    updateStatistics();
    
    // Add event listeners
    taskForm.addEventListener('submit', addTask);
    searchBar.addEventListener('input', filterTasks);
    filterType.addEventListener('change', filterTasks);
    
    console.log('Task Manager Application initialized');
});

// Function to add a new task
function addTask(event) {
    event.preventDefault();
    
    const taskName = taskNameInput.value.trim();
    const taskType = taskTypeSelect.value;
    
    // Validate input
    if (!taskName || !taskType) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Create new task object
    const newTask = {
        id: Date.now(), //to generate unique ID to each task
        taskName: taskName,
        taskType: taskType,
        dateAdded: new Date()
    };
    
    // Add task to array using push()
    tasks.push(newTask);
    
    // Clear form
    taskNameInput.value = '';
    taskTypeSelect.value = '';
    
    // Update display
    displayTasks();
    updateStatistics();
    
    // Log to console
    console.log('Task added:', newTask);
    console.log('All tasks:', tasks);
    
    // Show success message
    alert('Task added successfully!');
}

// Function to display tasks in the DOM
function displayTasks(filteredTasks = null) {
    const tasksToShow = filteredTasks || tasks;
    
    // Clear existing tasks
    taskList.innerHTML = '';
    
    // Check if there are no tasks
    if (tasksToShow.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <h3>No tasks found</h3>
                <p>Add a new task to get started!</p>
            </div>
        `;
        return;
    }
    
    // Display each task
    tasksToShow.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
}

// Function to create a task element
function createTaskElement(task, index) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${getTaskClass(task.taskType)}`;
    
    // Format date
    const formattedDate = task.dateAdded.toLocaleDateString() + ' at ' + task.dateAdded.toLocaleTimeString();
    
    // Set task color based on type using conditional statements
    let taskColor;
    if (task.taskType === 'In Progress') {
        taskColor = 'in-progress';
    } else if (task.taskType === 'Done') {
        taskColor = 'done';
    } else {
        taskColor = 'task';
    }
    
    // Create task HTML using innerHTML
    taskDiv.innerHTML = `
        <div class="task-header">
            <div class="task-name">${task.taskName}</div>
            <div class="task-type ${taskColor}">${task.taskType}</div>
        </div>
        <div class="task-date">Added: ${formattedDate}</div>
        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    
    // Add click event for editing (as per requirement)
    taskDiv.addEventListener('click', function(e) {
        if (!e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
            editTask(task.id);
        }
    });
    
    return taskDiv;
}

// Function to get task class based on type
function getTaskClass(taskType) {
    switch (taskType) {
        case 'In Progress':
            return 'in-progress';
        case 'Done':
            return 'done';
        case 'Task':
        default:
            return 'task';
    }
}

// Function to edit a task
function editTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        alert('Task not found!');
        return;
    }
    
    const task = tasks[taskIndex];
    
    // Prompt for new task name
    const newTaskName = prompt('Edit task name:', task.taskName);
    
    if (newTaskName === null) {
        return; // User cancelled
    }
    
    if (newTaskName.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }
    
    // Prompt for new task type
    const taskTypes = ['Task', 'In Progress', 'Done'];
    let typeSelection = prompt(
        'Select task type:\n1. Task\n2. In Progress\n3. Done\n\nEnter number (1-3):', 
        taskTypes.indexOf(task.taskType) + 1
    );
    
    if (typeSelection === null) {
        return; // User cancelled
    }
    
    const typeIndex = parseInt(typeSelection) - 1;
    if (typeIndex < 0 || typeIndex >= taskTypes.length) {
        alert('Invalid selection!');
        return;
    }
    
    // Update task
    tasks[taskIndex].taskName = newTaskName.trim();
    tasks[taskIndex].taskType = taskTypes[typeIndex];
    
    // Re-display tasks
    displayTasks();
    updateStatistics();
    
    console.log('Task edited:', tasks[taskIndex]);
    alert('Task updated successfully!');
}

// Function to delete a task
function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        alert('Task not found!');
        return;
    }
    
    const task = tasks[taskIndex];
    
    // Confirm deletion
    if (confirm(`Are you sure you want to delete "${task.taskName}"?`)) {
        // Remove task from array using splice()
        tasks.splice(taskIndex, 1);
        
        // Re-display tasks
        displayTasks();
        updateStatistics();
        
        console.log('Task deleted:', task);
        alert('Task deleted successfully!');
    }
}

// Function to filter tasks based on search and filter criteria
function filterTasks() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedType = filterType.value;
    
    let filteredTasks = tasks;
    
    // Filter by search term
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
            task.taskName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by type
    if (selectedType) {
        filteredTasks = filteredTasks.filter(task => 
            task.taskType === selectedType
        );
    }
    
    displayTasks(filteredTasks);
    console.log('Filtered tasks:', filteredTasks);
}

// Function to update statistics
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.taskType === 'Done').length;
    const inProgress = tasks.filter(task => task.taskType === 'In Progress').length;
    const pending = tasks.filter(task => task.taskType === 'Task').length;
    
    // Update DOM elements using getElementById()
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    inProgressTasksSpan.textContent = inProgress;
    pendingTasksSpan.textContent = pending;
    
    // Log statistics
    console.log('Task Statistics:', {
        total: total,
        completed: completed,
        inProgress: inProgress,
        pending: pending
    });
}
// Function to get all tasks (for console testing)
function getAllTasks() {
    console.log('All tasks:', tasks);
    return tasks;
}
// Function to get tasks by type (for console testing)
function getTasksByType(type) {
    const filteredTasks = tasks.filter(task => task.taskType === type);
    console.log(`Tasks of type "${type}":`, filteredTasks);
    return filteredTasks;
}
// Function to clear all tasks (for console testing)
function clearAllTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        displayTasks();
        updateStatistics();
        console.log('All tasks cleared');
        alert('All tasks cleared!');
    }
}
// Export functions for console access
window.taskManager = {
    getAllTasks,
    getTasksByType,
    clearAllTasks,
    tasks: () => tasks
};

// Final result display on page load
console.log('=== Task Manager Application Loaded ===');
console.log('Available methods:');
console.log('- taskManager.getAllTasks()');
console.log('- taskManager.getTasksByType(type)');
console.log('- taskManager.clearAllTasks()');
console.log('- taskManager.tasks()');
console.log('=======================================');