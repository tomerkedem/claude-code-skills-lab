'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { formatTask, formatTaskList } = require('../src/format');

const tasks = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Write report', completed: true },
];

test('formatTask shows a status marker', () => {
  assert.strictEqual(formatTask(tasks[0]), '[ ] 1. Buy milk');
  assert.strictEqual(formatTask(tasks[1]), '[x] 2. Write report');
});

test('formatTaskList shows tasks and a completion summary', () => {
  assert.strictEqual(
    formatTaskList(tasks, tasks),
    '[ ] 1. Buy milk\n[x] 2. Write report\n\n1 of 2 tasks completed'
  );
});

test('formatTaskList explains an empty list', () => {
  assert.match(formatTaskList([], []), /^No tasks yet\. Add one with/);
});

test('formatTaskList explains an empty filtered view', () => {
  assert.strictEqual(formatTaskList([], [tasks[1]], 'pending'), 'No pending tasks.');
  assert.strictEqual(formatTaskList([], [tasks[0]], 'done'), 'No completed tasks.');
});
