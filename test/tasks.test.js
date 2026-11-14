'use strict';

const test = require('node:test');
const assert = require('node:assert');
const {
  addTask,
  completeTask,
  removeTask,
  listTasks,
  parseId,
  validateTitle,
  MAX_TITLE_LENGTH,
} = require('../src/tasks');

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

test('listTasks can filter by status', () => {
  const first = addTask([], 'One');
  const second = addTask(first.tasks, 'Two');
  const { tasks } = completeTask(second.tasks, 1);
  assert.deepStrictEqual(listTasks(tasks, 'pending').map((t) => t.id), [2]);
  assert.deepStrictEqual(listTasks(tasks, 'done').map((t) => t.id), [1]);
  assert.throws(() => listTasks(tasks, 'later'), /Unknown filter/);
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

test('validateTitle rejects empty and whitespace-only titles', () => {
  assert.throws(() => validateTitle(''), /cannot be empty/);
  assert.throws(() => validateTitle('   '), /cannot be empty/);
  assert.throws(() => validateTitle(undefined), /cannot be empty/);
});

test('validateTitle rejects titles that are too long', () => {
  assert.throws(() => validateTitle('a'.repeat(MAX_TITLE_LENGTH + 1)), /longer than 100/);
  assert.strictEqual(validateTitle('a'.repeat(MAX_TITLE_LENGTH)).length, MAX_TITLE_LENGTH);
});

test('addTask does not accept an invalid title', () => {
  assert.throws(() => addTask([], '  '), /cannot be empty/);
});

test('parseId accepts positive whole numbers', () => {
  assert.strictEqual(parseId('3'), 3);
  assert.strictEqual(parseId(7), 7);
});

test('parseId rejects missing, non-numeric, decimal, zero and negative ids', () => {
  assert.throws(() => parseId(undefined), /id is required/);
  assert.throws(() => parseId('abc'), /Invalid task id "abc"/);
  assert.throws(() => parseId('1.5'), /Invalid task id "1.5"/);
  assert.throws(() => parseId('0'), /Invalid task id "0"/);
  assert.throws(() => parseId('-2'), /Invalid task id "-2"/);
});
