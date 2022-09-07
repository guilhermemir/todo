document.addEventListener("DOMContentLoaded", function (event) {
  bindAddTaskBtn()
  bindDefineTaskInput()
  bindDeleteCompletedBtn()
  createTask("Task 1")
})

const bindAddTaskBtn = () => {
  const addBtn = document.getElementById("todo--add-task")
  addBtn.addEventListener("click", addTask)
}

const bindDefineTaskInput = () => {
  const defTask = document.getElementById("todo--define-task")
  defTask.addEventListener("keypress", addTaskIfEnter)
}

const bindDeleteCompletedBtn = () => {
  const btn = document.getElementById("todo--delete-completed-btn")
  btn.addEventListener("click", deleteCompletedTasks)
}

const addTaskIfEnter = (event) => {
  if (event.key === 'Enter') {
    addTask()
  }
}

const addTask = () => {
  const defTask = document.getElementById("todo--define-task")
  if (defTask.value != '') {
    createTask(defTask.value)
    defTask.value = ''
  }
}

const toggleTaskCheckbox = (event) => {
  const checkbox = event.target
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add('todo--completed')
  } else {
    checkbox.parentElement.classList.remove('todo--completed')
  }
}

const deleteTask = (event) => {
  const taskList = document.getElementById('todo--task-list')
  const task = event.target.parentElement
  taskList.removeChild(task)
}

const deleteCompletedTasks = () => {
  const taskList = document.getElementById('todo--task-list')
  const completedTasks = document.querySelectorAll('.todo--completed')
  completedTasks.forEach(task => {
    taskList.removeChild(task)
  })
}

const createTask = (taskName) => {
    const newLabel = document.createElement('label')
    newLabel.classList.add('list-group-item', 'd-flex', 'gap-3')

    const newInput = document.createElement('input')
    newInput.classList.add('form-check-input', 'flex-shrink-0', 'todo--checkbox')
    newInput.setAttribute('type', 'checkbox')
    newLabel.appendChild(newInput)
    newInput.addEventListener('change', toggleTaskCheckbox)

    const newSpan = document.createElement('span')
    newSpan.classList.add('pt-1', 'form-checked-content', 'todo--task-name')
    newSpan.innerText = taskName
    newLabel.appendChild(newSpan)

    const newEditBtn = document.createElement('button')
    newEditBtn.classList.add('btn', 'btn-outline-secondary', 'todo--edit-task-btn')
    newEditBtn.setAttribute('type', 'button')
    newEditBtn.innerText = "Edit"
    newLabel.appendChild(newEditBtn)

    const newDeleteBtn = document.createElement('button')
    newDeleteBtn.classList.add('btn', 'btn-outline-secondary', 'todo--delete-task-btn')
    newDeleteBtn.setAttribute('type', 'button')
    newDeleteBtn.innerText = "Delete"
    newLabel.appendChild(newDeleteBtn)
    newDeleteBtn.addEventListener('click', deleteTask)

    const taskList = document.getElementById('todo--task-list')
    taskList.appendChild(newLabel)
}

/*
<label class="list-group-item d-flex gap-3">
          <input
            class="form-check-input flex-shrink-0 todo--checkbox"
            type="checkbox"
          />
          <span class="pt-1 form-checked-content todo--task-name">
            Task
          </span>
          <button
            class="btn btn-outline-secondary todo--edit-task-btn"
            type="button"
          >
            Edit
          </button>
          <button
            class="btn btn-outline-secondary todo--delete-task-btn"
            type="button"
          >
            Delete
          </button>
        </label>
*/
