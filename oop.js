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

// del after
console.log(validInteger ( '10' )) // returns True
validInteger ( 10 ) // returns True 
validInteger ( '-10' ) // returns False
validInteger ( -10 ) // returns False
validInteger ( 0.0 ) // returns False
validInteger ( 10.0 ) // returns False
validInteger ( -10.0 ) // returns False
console.log(validatePriority ( 0 )) // returns 1
validatePriority ( 1 ) // returns 1
validatePriority ( 'A' ) // returns 1
validatePriority ( '7' ) // returns 7
console.log(validatePriority ( '3' )) // returns 1
todaysDate() // returns the current date and time, whatever it is. E.g. 28/03/2023 09:30:04 


const taskList = new ToDo() // creates an instance of a ToDo() object name taskList
console.log(taskList.add(new Task ('Get Pasta', PRIORITY ['MEDIUM']))) // returns 1 as 1 task in list
console.log(taskList.add (new Task ('Get Breakfast Cereal', PRIORITY ['MEDIUM'] ))) // returns 2 as 2 tasks in list
console.log(taskList.task('Get Pasta'))
console.log(taskList.list(PRIORITY [ 'MEDIUM' ] ))
console.log(taskList.remove ('Get Breakfast Cereal')) // returns true (as task exists, and then removes it

// Code for the automated tests
module.exports = {
    PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
};

//ADD comments