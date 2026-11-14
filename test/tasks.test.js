'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { addTask, listTasks } = require('../src/tasks');

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
