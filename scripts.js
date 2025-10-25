// Minimal demo data (replace with your own)
const sampleQuestions = [
    { id:256, title: "A proof of without prime ideals?", tags:["math","ring-theory","noetherian"], votes:632, posted:"2013-04-11", url:"https://math.stackexchange.com/questions/358423" },
    { id:257, title: "Is there a bijection ... forward map connected?", tags:["math","topology"], votes:185, posted:"2014-09-30", url:"https://math.stackexchange.com/questions/..." },
    { id:258, title: "Does every ring of integers sit inside a ring ... ?", tags:["number-theory","ring-theory"], votes:142, posted:"2016-04-22", url:"https://math.stackexchange.com/questions/..." },
    // repeat / add more
  ];
  
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // render question cards
  function renderQuestions(list){
    const container = document.getElementById('questions');
    container.innerHTML = '';
    list.forEach(q=>{
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3><a href="${q.url}" target="_blank" rel="noopener">${q.title}</a></h3>
        <p class="meta"><span>Votes: ${q.votes}</span><span>Posted: ${q.posted}</span></p>
        <div class="tags">${q.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <p style="margin-top:.6rem"><a href="${q.url}" target="_blank" rel="noopener">View original</a></p>
      `;
      container.appendChild(el);
    });
  }
  
  renderQuestions(sampleQuestions);
  
  // very small UI: tabs & search
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', e=>{
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      btn.classList.add('active');
      // simple filter by tag
      const cat = btn.dataset.cat;
      if(cat==='all') renderQuestions(sampleQuestions);
      else renderQuestions(sampleQuestions.filter(q=>q.tags.includes(cat)));
    });
  });
  
  document.getElementById('qSearch').addEventListener('input', e=>{
    const q = e.target.value.toLowerCase().trim();
    if(!q) return renderQuestions(sampleQuestions);
    renderQuestions(sampleQuestions.filter(it => (it.title + ' ' + it.tags.join(' ')).toLowerCase().includes(q)));
  });
  