# claude-code-skills-lab

Hands-on Claude Code Skills training project.

This repository contains a small command-line task manager written in plain
JavaScript. It exists to give learners a real Git history to practice with.

## Requirements

- Node.js 18 or newer
- No npm packages are needed

## Run

Use `npm start --` followed by a command:

| Command | What it does |
| --- | --- |
| `npm start -- add <title>` | Add a new task |
| `npm start -- complete <id>` | Mark a task as completed |
| `npm start -- remove <id>` | Delete a task |
| `npm start -- list` | Show all tasks with a completion summary |
| `npm start -- list --pending` | Show only tasks that are not completed |
| `npm start -- list --done` | Show only completed tasks |
| `npm start -- help` | Show the usage message |

Example session:

```text
$ npm start -- add Buy milk
Added task 1: Buy milk
$ npm start -- add Write report
Added task 2: Write report
$ npm start -- complete 2
Completed task 2: Write report
$ npm start -- list
[ ] 1. Buy milk
[x] 2. Write report

1 of 2 tasks completed
```

Tasks are saved in `data/tasks.json`, which is created automatically and is
not tracked by Git. Set the `TASKS_FILE` environment variable to use a
different file.

## Input rules

- A task title must not be empty and can be at most 100 characters long.
- A task id must be a positive whole number, such as `3`.
- Invalid input prints an error message and exits with a non-zero code.

## Project layout

```text
src/tasks.js     Task logic: add, complete, remove, filter, validate
src/format.js    Turns tasks into text for the terminal
src/storage.js   Reads and writes data/tasks.json
src/cli.js       Command-line entry point
test/            Tests using Node's built-in test runner
```

## Test

```bash
npm test
```
