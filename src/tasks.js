'use strict';

// Pure task logic. Functions never read files or print anything,
// which keeps them easy to understand and to test.

function nextId(tasks) {
  return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

// Returns the updated list and the newly created task.
function addTask(tasks, title) {
  const task = { id: nextId(tasks), title: title.trim(), completed: false };
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

function listTasks(tasks) {
  return [...tasks];
}

module.exports = { addTask, completeTask, removeTask, listTasks };
