fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('question-container');
    container.innerHTML = '';

    const categories = {};

    data.forEach(q => {
      if (!categories[q.category]) categories[q.category] = [];
      categories[q.category].push(q);
    });

    for (const category in categories) {
      const catDiv = document.createElement('div');
      catDiv.className = 'category';

      const heading = document.createElement('h2');
      heading.textContent = category;
      catDiv.appendChild(heading);

      categories[category].forEach(q => {
        const item = document.createElement('div');
        item.className = 'question-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `q-${q.id}`;
        checkbox.checked = localStorage.getItem(`q-${q.id}`) === 'true';
        checkbox.addEventListener('change', () => {
          localStorage.setItem(`q-${q.id}`, checkbox.checked);
        });

        const info = document.createElement('div');
        info.className = 'info';

        const link = document.createElement('a');
        link.href = q.link;
        link.target = '_blank';
        link.innerText = `${q.title} — Click here to go to the question`;

        const diff = document.createElement('div');
        diff.className = 'difficulty';
        diff.innerText = `Difficulty: ${q.difficulty}`;

        info.appendChild(link);
        info.appendChild(diff);
        item.appendChild(checkbox);
        item.appendChild(info);

        catDiv.appendChild(item);
      });

      container.appendChild(catDiv);
    }
  })
  .catch(err => {
    document.getElementById('question-container').innerText = "Failed to load questions.";
    console.error(err);
  });
