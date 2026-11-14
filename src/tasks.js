'use strict';

// Pure task logic. Functions never read files or print anything,
// which keeps them easy to understand and to test.

const MAX_TITLE_LENGTH = 100;

// Returns the cleaned-up title or throws a clear error.
function validateTitle(title) {
  const cleaned = typeof title === 'string' ? title.trim() : '';
  if (cleaned.length === 0) {
    throw new Error('Task title cannot be empty');
  }
  if (cleaned.length > MAX_TITLE_LENGTH) {
    throw new Error(`Task title cannot be longer than ${MAX_TITLE_LENGTH} characters`);
  }
  return cleaned;
}

// Converts user input such as "3" into the number 3, or throws a clear error.
function parseId(value) {
  if (value === undefined || String(value).trim() === '') {
    throw new Error('Task id is required');
  }
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`Invalid task id "${value}": use a positive whole number`);
  }
  return id;
}

function nextId(tasks) {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

// Returns the updated list and the newly created task.
function addTask(tasks, title) {
  const task = { id: nextId(tasks), title: validateTitle(title), completed: false };
  return { tasks: [...tasks, task], task };
}

// Marks a task as completed. Returns the updated list and the changed task.
function completeTask(tasks, id) {
  const existing = tasks.find((task) => task.id === id);
  if (!existing) {
    throw new Error(`Task ${id} not found`);
  }
  const task = { ...existing, completed: true };
  return { tasks: tasks.map((item) => (item.id === id ? task : item)), task };
}

// Removes a task. Returns the updated list and the removed task.
function removeTask(tasks, id) {
  const task = tasks.find((item) => item.id === id);
  if (!task) {
    throw new Error(`Task ${id} not found`);
  }
  return { tasks: tasks.filter((item) => item.id !== id), task };
}

// Returns tasks, optionally filtered by status: "all", "pending" or "done".
function listTasks(tasks, filter = 'all') {
  switch (filter) {
    case 'all':
      return [...tasks];
    case 'pending':
      return tasks.filter((task) => !task.completed);
    case 'done':
      return tasks.filter((task) => task.completed);
    default:
      throw new Error(`Unknown filter "${filter}": use "all", "pending" or "done"`);
  }
}

module.exports = {
  addTask,
  completeTask,
  removeTask,
  listTasks,
  parseId,
  validateTitle,
  MAX_TITLE_LENGTH,
};
