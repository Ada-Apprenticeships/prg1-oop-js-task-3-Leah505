const PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

/**
 * Validates if a value is a non-negative integer.
 * @param {string|number} value - Value to check.
 * @returns {boolean} - True if valid integer and non-negative, false otherwise.
 */
function validInteger(value) {
    const parsed = parseInt(value, 10);
    return !isNaN(parsed) && Number.isInteger(parsed) && String(parsed) === value.toString() && parsed >= 0;
}

/**
 * Validates priority; defaults to LOW if invalid.
 * @param {string|number} priority - Priority to validate.
 * @returns {number} - Validated priority level.
 */
function validatePriority(priority) {
    const validPriorities = Object.values(PRIORITY);
    const parsedPriority = parseInt(priority, 10);
    return validPriorities.includes(parsedPriority) ? parsedPriority : PRIORITY.LOW;
}

// Returns current date and time
function todaysDate() {
    const now = new Date();
    const pad = (n) => (n < 10 ? '0' : '') + n;
    return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

class Task {
    #added;
    #title;
    #priority;

    constructor(title, priority) {
        this.#added = todaysDate();
        this.#title = title;
        this.#priority = validatePriority(priority);
    }

    get added() {
        return this.#added;
    }

    get title() {
        return this.#title;
    }

    get priority() {
        return this.#priority;
    }

    set priority(newPriority) {
        this.#priority = validatePriority(newPriority);
    }
}

class ToDo {
    #tasks = [];

    /**
     * Adds a Task to the list.
     * @param {Task} task - Task to add.
     * @returns {number} - Updated length of task list.
     */
    add(task) {
        if (task instanceof Task) {
            this.#tasks.push(task);
            return this.#tasks.length;
        }
        return 0;
    }

    /**
     * Removes a Task by title.
     * @param {string} title - Title of the task to remove.
     * @returns {boolean} - True if task was removed; otherwise, false.
     */
    remove(title) {
        const taskIndex = this.#tasks.findIndex(task => task.title === title);
        if (taskIndex !== -1) {
            this.#tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }

    /**
     * Lists tasks, optionally filtering by priority.
     * @param {number} [priority=0] - Priority filter (0 to list all).
     * @returns {Array} - Array of task details: [added, title, priority].
     */
    list(priority = 0) {
        return this.#tasks
            .filter(task => priority === 0 || task.priority === priority)
            .map(task => [task.added, task.title, task.priority]);
    }

    /**
     * Finds a Task by title.
     * @param {string} title - Title of the task to find.
     * @returns {Task} - Found task.
     * @throws Will throw an error if the task is not found.
     */
    task(title) {
        const foundTask = this.#tasks.find(task => task.title === title);
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