'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

// Returns an empty list when the file does not exist yet.
function loadTasks(filePath = DEFAULT_FILE) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveTasks(tasks, filePath = DEFAULT_FILE) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2) + '\n');
}

module.exports = { loadTasks, saveTasks, DEFAULT_FILE };
