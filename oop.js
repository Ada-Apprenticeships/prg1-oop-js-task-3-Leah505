const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger(value) {
    // Check if value is a number or a string that can be converted to an integer
    const parsed = parseInt(value, 10);
    return !isNaN(parsed) && Number.isInteger(parsed) && String(parsed) === value.toString() && parsed >= 0;
}

function validatePriority(priority) {
    const validPriorities = Object.values(PRIORITY);
    const parsedPriority = parseInt(priority, 10);
    return validPriorities.includes(parsedPriority) ? parsedPriority : PRIORITY.LOW;
}

function todaysDate() {
    const now = new Date();
    const pad = (n) => (n < 10 ? '0' : '') + n;
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

class Task {
    _added;
    _title;
    _priority;

    constructor(title, priority) {
        this._added = todaysDate();
        this._title = title;
        this._priority = validatePriority(priority);
    }

    get added() {
        return this._added;
    }

    get title() {
        return this._title;
    }

    get priority() {
        return this._priority;
    }

    set priority(newPriority) {
        this._priority = validatePriority(newPriority);
    }
}

class ToDo {
    _tasks;

    constructor() {
        this._tasks = [];
    }

    // Method to add a task to the ToDo list
    add(task) {
        if (task instanceof Task) {
            this._tasks.push(task);
            return this._tasks.length;
        }
        return 0;
    }

    // Method to remove a task by title
    remove(title) {
        const taskIndex = this._tasks.findIndex(task => task.title === title);
        if (taskIndex !== -1) {
            this._tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }

    // Method to list tasks, filtered by priority if provided
    list(priority = 0) {
        return this._tasks
            .filter(task => priority === 0 || task.priority === priority)
            .map(task => [task.added, task.title, task.priority]);
    }

    // Method to find and return a task by title
    task(title) {
        const foundTask = this._tasks.find(task => task.title === title);
        if (!foundTask) {
            throw new Error(`Task '${title}' Not Found`);
        }
        return foundTask;
    }
}

// Code for the automated tests
module.exports = {
    PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};

//ADD comments