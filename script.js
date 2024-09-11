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
    const li = document.createElement('li')
    const currentTaskId = taskId
    li.setAttribute('id', `li${currentTaskId}`)

    const div = document.createElement('div')
    div.setAttribute('id', 'taskDisp')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.addEventListener('change', () => toggle(checkbox, currentTaskId))

    const p = document.createElement('p')
    p.setAttribute('id', `task${currentTaskId}`)
    p.innerText = inputTask.value

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
