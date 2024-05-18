document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('li').forEach(taskItem => {
            tasks.push(taskItem.querySelector('span').innerText);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;
        li.appendChild(taskSpan);

        const editButton = document.createElement('button');
        editButton.innerHTML = '&#9998;';
        editButton.classList.add('edit-task');
        editButton.onclick = () => editTask(taskSpan);
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#10005;';
        deleteButton.classList.add('delete-task');
        deleteButton.onclick = () => {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    };

    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    };

    const editTask = (taskSpan) => {
        const newTask = prompt('Edit Task:', taskSpan.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            taskSpan.textContent = newTask;
            saveTasks();
        }
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    loadTasks();
});
