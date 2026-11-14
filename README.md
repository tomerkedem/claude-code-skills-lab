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

## Test

```bash
npm test
```
