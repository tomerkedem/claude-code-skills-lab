#!/usr/bin/env node
'use strict';

const { addTask, completeTask, removeTask, listTasks } = require('./tasks');
const { loadTasks, saveTasks } = require('./storage');

const USAGE = [
  'Usage:',
  '  npm start -- add <title>   Add a new task',
  '  npm start -- complete <id> Mark a task as completed',
  '  npm start -- remove <id>   Delete a task',
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
    case 'complete': {
      const result = completeTask(tasks, Number(rest[0]));
      saveTasks(result.tasks, filePath);
      return `Completed task ${result.task.id}: ${result.task.title}`;
    }
    case 'remove': {
      const result = removeTask(tasks, Number(rest[0]));
      saveTasks(result.tasks, filePath);
      return `Removed task ${result.task.id}: ${result.task.title}`;
    }
    case 'list': {
      const all = listTasks(tasks);
      if (all.length === 0) {
        return 'No tasks yet.';
      }
      return all
        .map((task) => `${task.id}. ${task.title}${task.completed ? ' (done)' : ''}`)
        .join('\n');
    }
    default:
      return USAGE;
  }
}

function main() {
  try {
    console.log(run(process.argv.slice(2), process.env.TASKS_FILE || undefined));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { run };
