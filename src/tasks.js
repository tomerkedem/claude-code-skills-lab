'use strict';

// Pure task logic. Functions never read files or print anything,
// which keeps them easy to understand and to test.

function nextId(tasks) {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

// Returns the updated list and the newly created task.
function addTask(tasks, title) {
  const task = { id: nextId(tasks), title: title.trim() };
  return { tasks: [...tasks, task], task };
}

function listTasks(tasks) {
  return [...tasks];
}

module.exports = { addTask, listTasks };
