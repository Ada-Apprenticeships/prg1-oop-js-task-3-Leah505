const {
  PRIORITY,
  validPositiveInteger,
  validatePriority,
  Todo,
  todaysDate,
  TaskList,
} = require("./oop.js");

describe("OOP function tests", () => {

  describe('validPositiveInteger()',() => {
    test("T01 should check that input is a valid positive integer", () => {
      expect(validPositiveInteger(10)).toBe(true);
      expect(validPositiveInteger('10')).toBe(true);
  
      expect(validPositiveInteger(25)).toBe(true);
      expect(validPositiveInteger('25')).toBe(true);

      expect(validPositiveInteger(100)).toBe(true);
      expect(validPositiveInteger('100')).toBe(true);
      
      expect(validPositiveInteger(3)).toBe(true);
      expect(validPositiveInteger('3')).toBe(true);
  
      expect(validPositiveInteger(-100)).toBe(false);
      expect(validPositiveInteger(-25)).toBe(false)
  
      expect(validPositiveInteger(-0)).toBe(true);
      expect(validPositiveInteger(0.0)).toBe(true);
      expect(validPositiveInteger(1.0)).toBe(true);
  
      // test some invalid cases
      expect(validPositiveInteger(1.2)).toBe(false);
      expect(validPositiveInteger(-1.0)).toBe(false);
      expect(validPositiveInteger('-0')).toBe(false);
      expect(validPositiveInteger('A')).toBe(false);
      expect(validPositiveInteger('0A')).toBe(false);
      expect(validPositiveInteger('1.0')).toBe(false);
      expect(validPositiveInteger('')).toBe(false);
      expect(validPositiveInteger(' ')).toBe(false);
      expect(validPositiveInteger('.')).toBe(false);
    });
  });

  describe('validatePriority()',() => {
    test("T02 should handle valid properties", () => {
      expect(validatePriority(1)).toBe(1);
      expect(validatePriority(3)).toBe(3);
      expect(validatePriority(5)).toBe(5);
      expect(validatePriority(7)).toBe(7);
    });
    test('T03 should handle invalid priorities',() => {
      expect(validatePriority(0)).toBe(1);
      expect(validatePriority(2)).toBe(1);
      expect(validatePriority(4)).toBe(1);
      expect(validatePriority(6)).toBe(1);
      expect(validatePriority(8)).toBe(1);
      expect(validatePriority('A')).toBe(1);
      expect(validatePriority('A0')).toBe(1);
      expect(validatePriority('0A')).toBe(1);
      expect(validatePriority('.')).toBe(1);
      expect(validatePriority(' ')).toBe(1);
    });
  });

  describe('todaysDate()',() => {

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("T04 should return correct format for time and date", () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      jest.setSystemTime(mockDate);
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);

      expect(todaysDate()).toBe('02/01/2024 00:00:00');

      jest.advanceTimersByTime(24 * 60 * 60 * 1000);
      expect(todaysDate()).toBe('03/01/2024 00:00:00')
    });

  });

  describe('Todo constructor',() => {

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("T05 added, title and priority properties should be private", () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      const SECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
      jest.setSystemTime(mockDate);
      jest.advanceTimersByTime(SECONDS_IN_ONE_DAY);

      const task = new Todo("T1", PRIORITY["LOW"]);
      // now accessing private attributes
      expect(task['#added']).toBeUndefined();
      expect(task['#title']).toBeUndefined();
      expect(task['#priority']).toBeUndefined();
    });
  
    test("T06 added and title properties should be read-only", () => {
      const mockDate = new Date('2024-01-01T00:00:00.000Z');
      const SECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
      jest.setSystemTime(mockDate);
      
      const todo = new Todo("Test title", PRIORITY["LOW"]);
      expect(todo.added).toBe('01/01/2024 00:00:00');      

      jest.advanceTimersByTime(SECONDS_IN_ONE_DAY);
      todo.added = todaysDate();
      expect(todo.added).toBe('01/01/2024 00:00:00'); // added time is not changed
      
      todo.title = 'NEW UPDATED TITLE!';
      expect(todo.title).toBe('Test title');
    });
  
    test("T07 allows getting and setting priority", () => {
      const todo = new Todo("T1", PRIORITY["LOW"]);
      expect(todo.priority).toBe(PRIORITY["LOW"]);

      todo.priority = PRIORITY["HIGH"];
      expect(todo.priority).toBe(PRIORITY["HIGH"]);
      
      todo.priority = 0;
      expect(todo.priority).toBe(PRIORITY["LOW"]);

      todo.priority = 10;
      expect(todo.priority).toBe(PRIORITY["LOW"]);
    });
  });

  describe('TaskList constructor',() => {
    test("T08 should have add, remove, list and task methods", () => {
      const taskList = new TaskList();
      
      expect(taskList.add).toBeFunction();
      expect(taskList.remove).toBeFunction();
      expect(taskList.list).toBeFunction();
      expect(taskList.task).toBeFunction();
    });
  
    test("T09 should be able to add, remove and list tasks", () => {
      const taskList = new TaskList();
      const todo1 = new Todo("ACME T1", PRIORITY["LOW"]);
      const todo2 = new Todo("ACME T2", PRIORITY["MEDIUM"]);
      const todo3 = new Todo("ACME T3", PRIORITY["MEDIUM"]);
      const todo4 = new Todo("ACME T4", PRIORITY["HIGH"]);
      
      taskList.add(todo1);
      taskList.add(todo2);
      taskList.add(todo3);
      taskList.add(todo4);
      
      let list = taskList.list();
      expect(list.length).toBe(4);
      expect(list[0].length).toBe(3);
      expect(taskList.remove("ACME T5")).toBe(false);
      expect(taskList.remove("ACME T4")).toBe(true);

      list = taskList.list();
      expect(list.length).toBe(3);
      expect(taskList.list()[1][1]).toBe("ACME T2");
    });
  
    test("T10 should provide access and modification to tasks", () => {
      const taskList = new TaskList();
      const todo1 = new Todo("ACME T1", PRIORITY["LOW"]);
      const todo2 = new Todo("ACME T2", PRIORITY["MEDIUM"]);

      expect(taskList.add(todo1)).toBe(1);
      expect(taskList.add(todo2)).toBe(2);
      expect(() => {
        taskList.task("ACME T9");
      }).toThrow("TaskList 'ACME T9' Not Found");

      taskList.task("ACME T2").priority = PRIORITY["URGENT"];
      expect(taskList.task("ACME T2").priority).toBe(PRIORITY["URGENT"]);
    });
  });
});
