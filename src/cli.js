#!/usr/bin/env node
'use strict';

const { addTask, completeTask, removeTask, listTasks, parseId } = require('./tasks');
const { loadTasks, saveTasks } = require('./storage');
const { formatTaskList } = require('./format');

const USAGE = [
  'Usage:',
  '  npm start -- add <title>        Add a new task',
  '  npm start -- complete <id>      Mark a task as completed',
  '  npm start -- remove <id>        Delete a task',
  '  npm start -- list               Show all tasks',
  '  npm start -- list --pending     Show only tasks that are not completed',
  '  npm start -- list --done        Show only completed tasks',
  '  npm start -- help               Show this message',
].join('\n');

const LIST_FILTERS = { '--pending': 'pending', '--done': 'done' };

// Reads the optional flag after "list" and returns the filter name.
function parseListFilter(flag) {
  if (flag === undefined) {
    return 'all';
  }
  if (!(flag in LIST_FILTERS)) {
    throw new Error(`Unknown option "${flag}". Run "npm start -- help" to see usage.`);
  }
  return LIST_FILTERS[flag];
}

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
      const result = completeTask(tasks, parseId(rest[0]));
      saveTasks(result.tasks, filePath);
      return `Completed task ${result.task.id}: ${result.task.title}`;
    }
    case 'remove': {
      const result = removeTask(tasks, parseId(rest[0]));
      saveTasks(result.tasks, filePath);
      return `Removed task ${result.task.id}: ${result.task.title}`;
    }
    case 'list': {
      const filter = parseListFilter(rest[0]);
      return formatTaskList(listTasks(tasks, filter), tasks, filter);
    }
    case undefined:
    case 'help':
      return USAGE;
    default:
      throw new Error(`Unknown command "${command}". Run "npm start -- help" to see usage.`);
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
