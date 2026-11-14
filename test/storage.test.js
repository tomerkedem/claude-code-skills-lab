'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { loadTasks, saveTasks } = require('../src/storage');

function tempFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tasks-'));
  return path.join(dir, 'data', 'tasks.json');
}

test('loadTasks returns an empty list when the file is missing', () => {
  assert.deepStrictEqual(loadTasks(tempFile()), []);
});

test('saveTasks creates the folder and loadTasks reads the data back', () => {
  const file = tempFile();
  const tasks = [{ id: 1, title: 'Saved task' }];
  saveTasks(tasks, file);
  assert.deepStrictEqual(loadTasks(file), tasks);
});
