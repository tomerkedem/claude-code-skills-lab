'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { run } = require('../src/cli');

function tempFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tasks-'));
  return path.join(dir, 'tasks.json');
}

test('list shows a friendly message when there are no tasks', () => {
  assert.strictEqual(run(['list'], tempFile()), 'No tasks yet.');
});

test('add stores a task that list then shows', () => {
  const file = tempFile();
  assert.strictEqual(run(['add', 'Buy', 'milk'], file), 'Added task 1: Buy milk');
  assert.strictEqual(run(['list'], file), '1. Buy milk');
});

test('unknown commands print usage', () => {
  assert.match(run(['unknown'], tempFile()), /Usage:/);
});

test('complete marks a task as done in the list', () => {
  const file = tempFile();
  run(['add', 'Write report'], file);
  assert.strictEqual(run(['complete', '1'], file), 'Completed task 1: Write report');
  assert.strictEqual(run(['list'], file), '1. Write report (done)');
});

test('complete reports an unknown task', () => {
  assert.throws(() => run(['complete', '9'], tempFile()), /Task 9 not found/);
});

test('remove deletes a task from the list', () => {
  const file = tempFile();
  run(['add', 'One'], file);
  run(['add', 'Two'], file);
  assert.strictEqual(run(['remove', '1'], file), 'Removed task 1: One');
  assert.strictEqual(run(['list'], file), '2. Two');
});

test('remove reports an unknown task', () => {
  assert.throws(() => run(['remove', '9'], tempFile()), /Task 9 not found/);
});

test('add rejects an empty title and saves nothing', () => {
  const file = tempFile();
  assert.throws(() => run(['add'], file), /cannot be empty/);
  assert.strictEqual(run(['list'], file), 'No tasks yet.');
});

test('complete and remove reject invalid ids', () => {
  const file = tempFile();
  assert.throws(() => run(['complete', 'abc'], file), /Invalid task id "abc"/);
  assert.throws(() => run(['remove'], file), /id is required/);
});
