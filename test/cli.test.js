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
