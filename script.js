const taskCategories = {
    inProgress: document.getElementById('inProgress'),
    notStarted: document.getElementById('notStarted'),
    completed: document.getElementById('completed')
  };
  
  const addTaskForm = document.getElementById('addTaskForm');
  const taskNameInput = document.getElementById('taskName');
  const taskStatusSelect = document.getElementById('taskStatus');
  
  addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
  });
  
  function addTask() {
    const taskName = taskNameInput.value.trim();
    const taskStatus = taskStatusSelect.value;
    
    if (taskName === '') {
      alert('Please enter a task name.');
      return;
    }
    
    const taskElement = createTaskElement(taskName);
    taskCategories[taskStatus].appendChild(taskElement);
    taskNameInput.value = '';
  }
  
  function createTaskElement(taskName) {
    const taskElement = document.createElement('div');
    taskElement.textContent = taskName;
    taskElement.classList.add('task');
    taskElement.draggable = true;
    taskElement.addEventListener('dragstart', dragStart);
    taskElement.addEventListener('dragend', dragEnd);
    return taskElement;
  }
  
  let draggedTask = null;
  
  function dragStart() {
    draggedTask = this;
    setTimeout(() => {
      this.style.opacity = '0.5';
    }, 0);
  }
  
  function dragEnd() {
    draggedTask.style.opacity = '1';
    draggedTask = null;
  }
  
  document.addEventListener('dragover', dragOver);
  document.addEventListener('dragenter', dragEnter);
  document.addEventListener('dragleave', dragLeave);
  document.addEventListener('drop', drop);
  document.addEventListener('dragover', allowDrop);
document.addEventListener('drop', drop);

  
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragEnter(e) {
    e.preventDefault();
  }
  
  function dragLeave() {
    // Add styles if needed
  }
  
  function drop() {
    if (draggedTask) {
      this.appendChild(draggedTask);
    }
  }
  // Function to count tasks in each category and display counts in respective divs
function countTasks() {
    const taskCounts = {
      inProgress: taskCategories.inProgress.querySelectorAll('.task').length,
      notStarted: taskCategories.notStarted.querySelectorAll('.task').length,
      completed: taskCategories.completed.querySelectorAll('.task').length
    };
  
    // Display the task counts in respective divs
    document.getElementById('inProgressCount').textContent = taskCounts.inProgress;
    document.getElementById('notStartedCount').textContent = taskCounts.notStarted;
    document.getElementById('completedCount').textContent = taskCounts.completed;
  }
  
  // Add event listener to count tasks when the document is loaded
  document.addEventListener('DOMContentLoaded', countTasks);
  
  // Create a button to count tasks
  const countButton = document.createElement('button');
  countButton.textContent = 'Count Tasks';
  countButton.addEventListener('click', countTasks);
  
  // Append the button to the document body or any desired location
  document.body.appendChild(countButton);
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drop(e) {
    e.preventDefault();
    const targetCategory = e.target.closest('.task-category');
    if (draggedTask && targetCategory) {
      targetCategory.appendChild(draggedTask);
    }
  }
  