'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { addTask, completeTask, removeTask, listTasks } = require('../src/tasks');

test('addTask gives the first task id 1', () => {
  const { task } = addTask([], 'Write report');
  assert.strictEqual(task.id, 1);
  assert.strictEqual(task.title, 'Write report');
});

test('addTask increments ids and trims the title', () => {
  const first = addTask([], 'One');
  const second = addTask(first.tasks, '  Two  ');
  assert.strictEqual(second.task.id, 2);
  assert.strictEqual(second.task.title, 'Two');
});

test('addTask does not modify the original list', () => {
  const original = [];
  addTask(original, 'Task');
  assert.strictEqual(original.length, 0);
});

test('listTasks returns all tasks', () => {
  const { tasks } = addTask([], 'Task');
  assert.deepStrictEqual(listTasks(tasks), tasks);
});

test('new tasks start as not completed', () => {
  const { task } = addTask([], 'Task');
  assert.strictEqual(task.completed, false);
});

test('completeTask marks only the chosen task as completed', () => {
  const first = addTask([], 'One');
  const second = addTask(first.tasks, 'Two');
  const result = completeTask(second.tasks, 1);
  assert.strictEqual(result.task.completed, true);
  assert.strictEqual(result.tasks[0].completed, true);
  assert.strictEqual(result.tasks[1].completed, false);
});

test('completeTask does not modify the original list', () => {
  const { tasks } = addTask([], 'Task');
  completeTask(tasks, 1);
  assert.strictEqual(tasks[0].completed, false);
});

test('completeTask throws when the task does not exist', () => {
  assert.throws(() => completeTask([], 5), /Task 5 not found/);
});

test('removeTask deletes only the chosen task', () => {
  const first = addTask([], 'One');
  const second = addTask(first.tasks, 'Two');
  const result = removeTask(second.tasks, 1);
  assert.strictEqual(result.task.title, 'One');
  assert.deepStrictEqual(result.tasks.map((task) => task.id), [2]);
});

test('new tasks keep getting increasing ids after an earlier task is removed', () => {
  const first = addTask([], 'One');
  const second = addTask(first.tasks, 'Two');
  const afterRemove = removeTask(second.tasks, 1);
  const third = addTask(afterRemove.tasks, 'Three');
  assert.strictEqual(third.task.id, 3);
});

test('removeTask does not modify the original list', () => {
  const { tasks } = addTask([], 'Task');
  removeTask(tasks, 1);
  assert.strictEqual(tasks.length, 1);
});

test('removeTask throws when the task does not exist', () => {
  assert.throws(() => removeTask([], 4), /Task 4 not found/);
});
