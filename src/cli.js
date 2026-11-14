#!/usr/bin/env node
'use strict';

const { addTask, listTasks } = require('./tasks');
const { loadTasks, saveTasks } = require('./storage');

const USAGE = [
  'Usage:',
  '  npm start -- add <title>   Add a new task',
  '  npm start -- list          Show all tasks',
].join('\n');

// Runs one command and returns the text to print.
// `filePath` is optional and lets tests use a temporary file.
function run(args, filePath) {
  const [command, ...rest] = args;
  const tasks = loadTasks(filePath);

  switch (command) {
    case 'add': {
      const result = addTask(tasks, rest.join(' '));
      saveTasks(result.tasks, filePath);
      return `Added task ${result.task.id}: ${result.task.title}`;
    }
    case 'list': {
      const all = listTasks(tasks);
      if (all.length === 0) {
        return 'No tasks yet.';
      }
      return all.map((task) => `${task.id}. ${task.title}`).join('\n');
    }
    default:
      return USAGE;
  }
}

function main() {
  console.log(run(process.argv.slice(2), process.env.TASKS_FILE || undefined));
}

if (require.main === module) {
  main();
}

module.exports = { run };
