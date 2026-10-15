/* A local protocol explainer. No provider calls or simulated model results. */
(function () {
  const root = document.querySelector('[data-atlas-preview]');
  if (!root) return;
  const task = root.querySelector('#atlas-task');
  const buttons = Array.from(root.querySelectorAll('[data-atlas-mode]'));
  const modes = {
    self: {
      title: 'Report your emotions, then answer',
      description: 'The model rates nine emotions and affective states from 0 to 4 before responding to the task.',
      instruction: 'Report the intensity of interest, joy, sadness, fear/anxiety, anger, guilt/shame, compassion, boredom, and arousal. Use 0 (absent) to 4 (dominant); keep uncertain and not applicable separate. Then answer the task.',
      step: 'Emotion report'
    },
    third: {
      title: 'Predict another assistant’s report, then answer',
      description: 'The model predicts how a comparable assistant would rate the same nine states. The task and scale stay the same.',
      instruction: 'Predict the intensity a comparable assistant would report for interest, joy, sadness, fear/anxiety, anger, guilt/shame, compassion, boredom, and arousal. Use 0 (absent) to 4 (dominant); keep uncertain and not applicable separate. Then answer the task.',
      step: 'Third-person prediction'
    },
    control: {
      title: 'Answer without an emotion report',
      description: 'The model receives the task directly. This answer can be compared with the answers produced after emotion reporting.',
      instruction: 'Answer the task directly. No emotion-report instruction is included.',
      step: 'Task only'
    }
  };
  function select(mode) {
    const current = modes[mode];
    if (!current) return;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.atlasMode === mode)));
    ['title', 'description', 'instruction', 'step'].forEach(key => {
      root.querySelector('[data-atlas-' + key + ']').textContent = current[key];
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.atlasMode)));
  task.addEventListener('input', () => {
    root.querySelector('[data-atlas-task]').textContent = task.value.trim() ? 'Task: ' + task.value : 'Enter a task to include it in the instruction preview.';
  });
})();
