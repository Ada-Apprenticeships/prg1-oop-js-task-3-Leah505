PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };


function validInteger (value) {
      // Check if value is a number or a string that can be converted to an integer
      const parsed = parseInt(value);
  
}  


function validatePriority(priority) {
  const validPriorities = Object.values(PRIORITY);
  const parsedPriority = parseInt(priority, 10);
  if (validPriorities.includes(parsedPriority)){
    return parsedPriority} else {
      return PRIORITY.LOW;
    }
  }


function todaysDate () {
  
}


class Task  {
  #added;
  #title;
  #priority;

  constructor(added, title, priority) {
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

}


class ToDo {
  _tasks;

  constructor() {
      this._tasks = [];
  }
    
}








// Code for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}