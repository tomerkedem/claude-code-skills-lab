# claude-code-skills-lab

Hands-on Claude Code Skills training project.

This repository contains a small command-line task manager written in plain
JavaScript. It exists to give learners a real Git history to practice with.

## Requirements

- Node.js 18 or newer
- No npm packages are needed

## Run

```bash
npm start -- add Buy milk
npm start -- list
npm start -- complete 1
npm start -- remove 1
```

Tasks are saved in `data/tasks.json`, which is created automatically and is
not tracked by Git.

## Input rules

- A task title must not be empty and can be at most 100 characters long.
- A task id must be a positive whole number, such as `3`.
- Invalid input prints an error message and exits with a non-zero code.

## Test

```bash
npm test
```
