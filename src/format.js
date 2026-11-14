'use strict';

// Turns tasks into text for the terminal. No file access, no printing.

function formatTask(task) {
  return `[${task.completed ? 'x' : ' '}] ${task.id}. ${task.title}`;
}

// `visible` is the list to show; `all` is used for the summary line.
function formatTaskList(visible, all, filter = 'all') {
  if (all.length === 0) {
    return 'No tasks yet. Add one with: npm start -- add <title>';
  }
  if (visible.length === 0) {
    return filter === 'done' ? 'No completed tasks.' : 'No pending tasks.';
  }
  const doneCount = all.filter((task) => task.completed).length;
  const summary = `${doneCount} of ${all.length} tasks completed`;
  return [...visible.map(formatTask), '', summary].join('\n');
}

module.exports = { formatTask, formatTaskList };
