// AbsenceBench example tasks
const exampleTasks = [
  {
    id: 1,
    type: "arguments",
    title: "Missing Function Parameter",
    description: "Identify which required parameter is missing from this function call.",
    example: "def calculate_total(items, tax_rate):\n    return sum(items) * (1 + tax_rate)\n\n# Function call:\ntotal = calculate_total([10, 20, 30])\n# What's missing?",
    category: "arguments"
  },
  {
    id: 2,
    type: "context",
    title: "Missing Background Context",
    description: "What crucial information is missing to understand this statement?",
    example: "She decided not to attend the meeting because of the incident.\n\n# What context is missing?",
    category: "context"
  },
  {
    id: 3,
    type: "steps",
    title: "Missing Procedural Step",
    description: "Identify which step is missing from this recipe.",
    example: "1. Preheat oven to 350°F\n2. Mix flour, sugar, and eggs\n3. Bake for 25 minutes\n4. Let cool and serve\n\n# What step is missing?",
    category: "steps"
  },
  {
    id: 4,
    type: "definitions",
    title: "Undefined Term",
    description: "Which term is used without definition?",
    example: "The algorithm uses memoization to improve performance by caching results in a DAG structure.\n\n# What term needs definition?",
    category: "definitions"
  },
  {
    id: 5,
    type: "arguments",
    title: "Incomplete API Call",
    description: "What required field is missing from this API request?",
    example: "POST /api/users\n{\n  'username': 'john_doe',\n  'email': 'john@example.com'\n}\n\n# Missing required field?",
    category: "arguments"
  },
  {
    id: 6,
    type: "context",
    title: "Ambiguous Reference",
    description: "What information is needed to understand this reference?",
    example: "Based on the previous results, we adjusted the parameters accordingly.\n\n# What's missing?",
    category: "context"
  }
];

// Model leaderboard data (from AbsenceBench paper results)
// Models with asterisks (*) used thinking mode
const leaderboardData = [
  { rank: 1, model: "Gemini-2.5-flash (thinking)", poetry: 87.3, numerical: 95.4, github: 30.9, average: 71.2 },
  { rank: 2, model: "Claude-3.7-Sonnet (thinking)", poetry: 72.7, numerical: 96.0, github: 40.0, average: 69.6 },
  { rank: 3, model: "Claude-3.7-Sonnet", poetry: 73.5, numerical: 91.4, github: 35.7, average: 66.9 },
  { rank: 4, model: "Gemini-2.5-flash", poetry: 79.3, numerical: 85.2, github: 26.2, average: 63.6 },
  { rank: 5, model: "o3-mini (thinking)", poetry: 65.0, numerical: 78.1, github: 38.9, average: 60.7 },
  { rank: 6, model: "GPT-4.1", poetry: 54.3, numerical: 57.5, github: 36.2, average: 49.3 },
  { rank: 7, model: "Grok-3-mini-Beta (thinking)", poetry: 40.7, numerical: 56.3, github: 36.4, average: 44.5 },
  { rank: 8, model: "GPT-4o", poetry: 38.4, numerical: 48.1, github: 39.4, average: 42.0 },
  { rank: 9, model: "QwQ-32B (thinking)", poetry: 32.1, numerical: 57.7, github: 31.6, average: 40.5 },
  { rank: 10, model: "Llama-4-Maverick", poetry: 32.8, numerical: 58.7, github: 29.0, average: 40.2 },
  { rank: 11, model: "GPT-4.1-mini", poetry: 30.2, numerical: 45.0, github: 31.3, average: 35.5 },
  { rank: 12, model: "Llama-3.3-70B-Instruct", poetry: 25.3, numerical: 37.7, github: 28.7, average: 30.6 },
  { rank: 13, model: "Qwen2.5-72B-Instruct", poetry: 19.0, numerical: 45.4, github: 26.8, average: 30.4 },
  { rank: 14, model: "DeepSeek-R1 (thinking)", poetry: 38.7, numerical: 29.5, github: 23.1, average: 30.4 },
  { rank: 15, model: "Qwen3-235B (thinking)", poetry: 26.1, numerical: 18.5, github: 24.6, average: 23.1 },
  { rank: 16, model: "Mixtral-8x7B-Instruct", poetry: 4.9, numerical: 21.9, github: 17.3, average: 14.7 }
];

document.getElementById('year').textContent = new Date().getFullYear();
  
// Render example task cards
function renderExamples(list) {
  const container = document.getElementById('examplesList');
  container.innerHTML = '';
  list.forEach(task => {
    const el = document.createElement('article');
    el.className = 'example-card';
    el.innerHTML = `
      <span class="example-type">${task.type.toUpperCase()}</span>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <div class="example-text">${task.example.replace(/\n/g, '<br>')}</div>
    `;
    container.appendChild(el);
  });
}

// Render leaderboard table
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardTableBody');
  tbody.innerHTML = '';
  leaderboardData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.rank}</td>
      <td><strong>${row.model}</strong></td>
      <td>${row.poetry}</td>
      <td>${row.numerical}</td>
      <td>${row.github}</td>
      <td><strong>${row.average}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

// Initialize
renderExamples(exampleTasks);
renderLeaderboard();

// Tab filtering for examples
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    if (cat === 'all') {
      renderExamples(exampleTasks);
    } else {
      renderExamples(exampleTasks.filter(task => task.category === cat));
    }
  });
});
  