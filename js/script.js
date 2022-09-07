document.addEventListener("DOMContentLoaded", function (event) {
  loadTasks()
  bindAddTaskBtn()
  bindDefineTaskInput()
  bindDeleteCompletedBtn()

  taskStorage.forEach(task => {
    createTask(task.name, task.completed)
  })
})

let taskStorage = []

const loadTasks = () => {
  taskStorage = JSON.parse(localStorage.getItem('tasks'))
}

const saveTasks = () => {
  taskStorage = []
  const tasks = document.getElementById('todo--task-list').querySelectorAll('label')
  tasks.forEach(task => {
    taskStorage.push({
      name: task.querySelector('.todo--task-name').innerText,
      completed: task.querySelector('.todo--checkbox').checked
    })
  })

  localStorage.setItem('tasks', JSON.stringify(taskStorage))
}

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
    createTask(defTask.value, false)
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
  saveTasks()
}

const editTask = (event) => {
  const task = event.target.parentElement
  const taskName = task.querySelector('.todo--task-name')
  const editText = task.querySelector('.todo--task-edit-text')
  const checkbox = task.querySelector('.todo--checkbox')
  const editBtn = task.querySelector('.todo--edit-task-btn')

  task.classList.toggle('todo--edit-mode')

  if (task.classList.contains('todo--edit-mode')) {
    editText.value = taskName.innerText
    checkbox.disabled = true
    editBtn.innerText = 'Save'
  } else {
    taskName.innerText = editText.value
    checkbox.disabled = false
    editBtn.innerText = 'Edit'
    saveTasks()
  }
}

const deleteTask = (event) => {
  const taskList = document.getElementById('todo--task-list')
  const task = event.target.parentElement
  taskList.removeChild(task)
  saveTasks()
}

const deleteCompletedTasks = () => {
  const taskList = document.getElementById('todo--task-list')
  const completedTasks = document.querySelectorAll('.todo--completed')
  completedTasks.forEach(task => {
    taskList.removeChild(task)
  })
  saveTasks()
}

const createTask = (taskName, taskCompleted) => {
    const newLabel = document.createElement('label')
    newLabel.classList.add('list-group-item', 'd-flex', 'gap-3')

    const newCheckbox = document.createElement('input')
    newCheckbox.classList.add('form-check-input', 'flex-shrink-0', 'todo--checkbox')
    newCheckbox.setAttribute('type', 'checkbox')
    if (taskCompleted) {
      newCheckbox.setAttribute('checked', 'checked')
      newLabel.classList.add('todo--completed')
    }
    newLabel.appendChild(newCheckbox)
    newCheckbox.addEventListener('change', toggleTaskCheckbox)

    const newSpan = document.createElement('span')
    newSpan.classList.add('pt-1', 'form-checked-content', 'todo--task-name')
    newSpan.innerText = taskName
    newLabel.appendChild(newSpan)
    
    const newEditText = document.createElement('input')
    newEditText.classList.add('todo--task-edit-text')
    newLabel.appendChild(newEditText)

    const newEditBtn = document.createElement('button')
    newEditBtn.classList.add('btn', 'btn-outline-secondary', 'todo--edit-task-btn')
    newEditBtn.setAttribute('type', 'button')
    newEditBtn.innerText = "Edit"
    newLabel.appendChild(newEditBtn)
    newEditBtn.addEventListener('click', editTask)

    const newDeleteBtn = document.createElement('button')
    newDeleteBtn.classList.add('btn', 'btn-outline-secondary', 'todo--delete-task-btn')
    newDeleteBtn.setAttribute('type', 'button')
    newDeleteBtn.innerText = "Delete"
    newLabel.appendChild(newDeleteBtn)
    newDeleteBtn.addEventListener('click', deleteTask)

    const taskList = document.getElementById('todo--task-list')
    taskList.appendChild(newLabel)

    saveTasks()
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
