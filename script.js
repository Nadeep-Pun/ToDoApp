const inputTask = document.getElementById('inputTask')
const addBtn = document.getElementById('addBtn')

const taskLists = document.querySelector('ul')
let taskId = 0

inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})

addBtn.addEventListener('click', () => {
    addTask()
})

function addTask() {
    if (inputTask.value === '') return

    let isComplete = false

    const li = document.createElement('li')
    const currentTaskId = taskId
    li.setAttribute('id', `li${currentTaskId}`)

    const div = document.createElement('div')
    div.setAttribute('id', 'taskDisp')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => {
        isComplete = !isComplete
        toggle(checkbox, currentTaskId)
    })

    const p = document.createElement('p')
    p.setAttribute('id', `task${currentTaskId}`)
    p.innerText = capitalizeTask(inputTask.value)
    p.classList.add('notCompleted')

    p.addEventListener('click', () => editTask(p, isComplete))

    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', 'deleteBtn')
    deleteBtn.innerText = '-'
    deleteBtn.addEventListener('click', () => deleteTask(currentTaskId))

    div.appendChild(checkbox)
    div.appendChild(p)
    li.appendChild(div)
    li.appendChild(deleteBtn)
    taskLists.appendChild(li)

    inputTask.value = ''
    taskId++
}

function toggle(checkbox, id) {
    const task = document.getElementById(`task${id}`)
    if (checkbox.checked) {
        task.classList.add('completed')
    } else {
        task.classList.remove('completed')
    }
}

function deleteTask(id) {
    const task = document.getElementById(`li${id}`)
    task.remove()
}

function editTask(element, isComplete) {
    if (isComplete) return

    const currentTask = element.innerText
    const editTask = document.createElement('input')
    editTask.type = 'text'
    editTask.value = currentTask

    element.innerHTML = ''
    element.appendChild(editTask)
    editTask.focus()

    editTask.addEventListener('blur', () => {
        if (editTask.value !== '') {
            element.innerHTML = capitalizeTask(editTask.value)
        } else {
            element.innerHTML = currentTask
        }
    })

    editTask.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (editTask.value !== '') {
                element.innerHTML = editTask.value
            } else {
                element.innerHTML = currentTask
            }
        }
    })

}

function capitalizeTask(task) {
    return task.charAt(0).toUpperCase() + task.slice(1)
}