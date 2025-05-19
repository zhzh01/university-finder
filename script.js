// --- Navigation Module ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main > section');

const showSection = (target) => {
  sections.forEach(sec => {
    if (sec.id === target) {
      sec.style.display = 'block';
      sec.classList.add('active');
    } else {
      sec.style.display = 'none';
      sec.classList.remove('active');
    }
  });
};

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const target = link.getAttribute('href').replace('#', '');
    showSection(target);
    // Focus main content for accessibility
    const main = document.getElementById('main-content');
    if (main) main.focus();
  });
});
// Show home by default
showSection('home');

// --- Home: Profession/University Finder Module ---
const professions = [
  'Computer Science',
  'Medicine',
  'Business',
  'Engineering',
  'Law'
];
const universities = [
  {
    name: 'MIT',
    professions: ['Computer Science', 'Engineering'],
    requirements: {
      SAT: '1500+',
      IELTS: '7.5+',
      GPA: '3.8+',
      language: 'English'
    },
    deadlines: {
      early: '2024-11-01',
      last: '2025-01-01'
    },
    included: ['Accommodation', 'Meals', 'Health Insurance'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 60000,
    discounts: ['Sibling discount: 10%', 'Early bird: 5%']
  },
  {
    name: 'Stanford University',
    professions: ['Computer Science', 'Business', 'Law'],
    requirements: {
      SAT: '1480+',
      IELTS: '7.0+',
      GPA: '3.7+',
      language: 'English'
    },
    deadlines: {
      early: '2024-10-15',
      last: '2025-01-05'
    },
    included: ['Accommodation', 'Meals'],
    notIncluded: ['Health Insurance', 'Travel'],
    grant: true,
    price: 58000,
    discounts: ['Merit-based: 15%']
  },
  {
    name: 'Technical University of Munich',
    professions: ['Engineering', 'Computer Science', 'Medicine'],
    requirements: {
      SAT: '1400+',
      IELTS: '6.5+',
      GPA: '3.5+',
      language: 'English or German'
    },
    deadlines: {
      early: '2024-09-01',
      last: '2024-12-01'
    },
    included: ['Meals'],
    notIncluded: ['Accommodation', 'Travel'],
    grant: false,
    price: 2000,
    discounts: ['None']
  },
  {
    name: 'Harvard University',
    professions: ['Law', 'Medicine', 'Business'],
    requirements: {
      SAT: '1490+',
      IELTS: '7.5+',
      GPA: '3.9+',
      language: 'English'
    },
    deadlines: {
      early: '2024-10-01',
      last: '2025-01-10'
    },
    included: ['Accommodation', 'Meals', 'Library Access'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 62000,
    discounts: ['Need-based: 20%']
  },
  {
    name: 'University of Oxford',
    professions: ['Law', 'Medicine', 'Engineering', 'Business'],
    requirements: {
      SAT: '1470+',
      IELTS: '7.5+',
      GPA: '3.8+',
      language: 'English'
    },
    deadlines: {
      early: '2024-10-15',
      last: '2025-01-15'
    },
    included: ['Accommodation', 'Meals', 'Library Access'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 45000,
    discounts: ['Merit-based: 10%']
  },
  {
    name: 'National University of Singapore',
    professions: ['Engineering', 'Computer Science', 'Business'],
    requirements: {
      SAT: '1420+',
      IELTS: '7.0+',
      GPA: '3.6+',
      language: 'English'
    },
    deadlines: {
      early: '2024-11-10',
      last: '2025-02-01'
    },
    included: ['Accommodation', 'Meals'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 30000,
    discounts: ['Early bird: 5%']
  },
  {
    name: 'University of Tokyo',
    professions: ['Engineering', 'Medicine', 'Business'],
    requirements: {
      SAT: '1450+',
      IELTS: '7.0+',
      GPA: '3.7+',
      language: 'English or Japanese'
    },
    deadlines: {
      early: '2024-10-20',
      last: '2025-01-20'
    },
    included: ['Accommodation', 'Meals'],
    notIncluded: ['Travel', 'Books'],
    grant: false,
    price: 4000,
    discounts: ['None']
  },
  {
    name: 'Middle East Technical University',
    professions: ['Engineering', 'Computer Science'],
    requirements: {
      SAT: '1350+',
      IELTS: '6.5+',
      GPA: '3.4+',
      language: 'English'
    },
    deadlines: {
      early: '2024-09-15',
      last: '2024-12-15'
    },
    included: ['Accommodation', 'Meals'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 6000,
    discounts: ['None']
  },
  {
    name: 'Boğaziçi University',
    professions: ['Engineering', 'Business', 'Computer Science'],
    requirements: {
      SAT: '1380+',
      IELTS: '6.5+',
      GPA: '3.5+',
      language: 'English'
    },
    deadlines: {
      early: '2024-09-10',
      last: '2024-12-10'
    },
    included: ['Accommodation', 'Meals'],
    notIncluded: ['Travel', 'Books'],
    grant: true,
    price: 7000,
    discounts: ['None']
  }
];
let selectedProfession = null;
let selectedGrant = null;

const professionList = document.getElementById('profession-list');
const professionForm = document.getElementById('profession-form');
const grantForm = document.getElementById('grant-form');
const stepUniversities = document.getElementById('step-universities');
const stepDetails = document.getElementById('step-details');
const universityList = document.getElementById('university-list');
const universityDetails = document.getElementById('university-details');
const backUniversities = document.getElementById('back-universities');

// Render profession buttons
const renderProfessions = () => {
  if (!professionList) return;
  professionList.innerHTML = '';
  professions.forEach(prof => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = prof;
    btn.setAttribute('aria-label', `Choose profession: ${prof}`);
    btn.onclick = () => handleProfessionSelect(prof);
    professionList.appendChild(btn);
  });
};

const handleProfessionSelect = prof => {
  selectedProfession = prof;
  professionForm.style.display = 'none';
  grantForm.style.display = 'block';
  grantForm.querySelector('button').focus();
};

grantForm && grantForm.addEventListener('click', e => {
  if (e.target.id === 'grant-yes' || e.target.id === 'grant-no') {
    selectedGrant = e.target.id === 'grant-yes';
    grantForm.style.display = 'none';
    renderUniversities();
  }
});

const renderUniversities = () => {
  stepUniversities.style.display = 'block';
  universityList.innerHTML = '';
  const filtered = universities.filter(u =>
    u.professions.includes(selectedProfession) && (selectedGrant ? u.grant : true)
  );
  if (filtered.length === 0) {
    universityList.innerHTML = '<li>No universities found for this selection.</li>';
    return;
  }
  filtered.forEach(uni => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', `View details for ${uni.name}`);
    li.innerHTML = highlightUniversity(uni.name);
    li.onclick = () => renderUniversityDetails(uni);
    li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') renderUniversityDetails(uni); };
    universityList.appendChild(li);
  });
};

const renderUniversityDetails = uni => {
  stepUniversities.style.display = 'none';
  stepDetails.style.display = 'block';
  let html = `<strong>Requirements:</strong><ul>`;
  for (const [key, value] of Object.entries(uni.requirements)) {
    html += `<li><b>${key}</b>: ${value}</li>`;
  }
  html += `</ul>`;
  html += `<strong>Deadlines:</strong><ul>`;
  html += `<li>Early: ${uni.deadlines.early}</li>`;
  html += `<li>Last: ${uni.deadlines.last}</li>`;
  html += `</ul>`;
  html += `<strong>Included:</strong> ${uni.included.join(', ')}<br>`;
  html += `<strong>Not Included:</strong> ${uni.notIncluded.join(', ')}<br>`;
  if (!selectedGrant) {
    html += `<strong>Price:</strong> $${uni.price}<br>`;
    html += `<strong>Discounts:</strong> ${uni.discounts.join(', ')}<br>`;
  }
  universityDetails.innerHTML = html;
  universityDetails.focus();
};

backUniversities && (backUniversities.onclick = () => {
  stepDetails.style.display = 'none';
  stepUniversities.style.display = 'block';
  universityList.querySelector('li')?.focus();
});

// Reset Home flow on section show
const homeSection = document.getElementById('home');
function resetHomeFlow() {
  if (professionForm) professionForm.style.display = 'block';
  if (grantForm) grantForm.style.display = 'none';
  if (stepUniversities) stepUniversities.style.display = 'none';
  if (stepDetails) stepDetails.style.display = 'none';
  renderProfessions();
  professionList?.querySelector('button')?.focus();
}
if (homeSection) {
  const observer = new MutationObserver(() => {
    if (homeSection.classList.contains('active')) {
      resetHomeFlow();
    }
  });
  observer.observe(homeSection, { attributes: true });
}
// Fallback: render professions on first load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', resetHomeFlow);
} else {
  resetHomeFlow();
}

// --- Chatbot/AI Assistant Module ---
const initChatbot = () => {
  const chatbotBox = document.getElementById('chatbot-box');
  if (!chatbotBox) return;
  chatbotBox.innerHTML = `
    <div id="chat-messages" class="chat-messages" aria-live="polite"></div>
    <div class="chat-input-row">
      <label for="chat-input" class="visually-hidden">Type your question</label>
      <input id="chat-input" type="text" placeholder="Type your question..." autocomplete="off" />
      <button id="chat-send" type="button">Send</button>
    </div>
  `;
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  const addMessage = (text, from) => {
    const msg = document.createElement('div');
    msg.className = 'chat-bubble ' + (from === 'bot' ? 'bot' : 'user');
    msg.innerHTML = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const botReply = userText => {
    const lower = userText.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
      return "Hello! 👋 How can I help you choose a profession or university?";
    }
    if (lower.includes('not sure') || lower.includes('help') || lower.includes('profession')) {
      return "Not sure about the profession? <b><a href='#career-test' class='nav-link'>Take the test!</a></b>";
    }
    if (lower.includes('compare')) {
      return "You can compare universities in the <b>Compare</b> section!";
    }
    if (lower.includes('grant')) {
      return "A grant is financial aid for your studies. You can choose to search for universities with or without grants in the Home section.";
    }
    if (lower.includes('gpa') || lower.includes('sat') || lower.includes('ielts')) {
      return "GPA, SAT, and IELTS are common requirements. See the Home section for details for each university.";
    }
    if (lower.includes('bye')) {
      return "Good luck with your search! If you need more help, just ask.";
    }
    return "I'm here to help! Try asking about professions, universities, or features of this site.";
  };

  // Greet on load
  addMessage("Hello! 👋 I'm your assistant. Not sure about the profession? <b><a href='#career-test' class='nav-link'>Take the test!</a></b>", 'bot');

  const sendUserMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    setTimeout(() => {
      addMessage(botReply(text), 'bot');
    }, 500);
    chatInput.value = '';
    chatInput.focus();
  };

  chatSend.onclick = sendUserMessage;
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendUserMessage();
  });
};

const chatbotSection = document.getElementById('chatbot');
if (chatbotSection) {
  const observer = new MutationObserver(() => {
    if (chatbotSection.classList.contains('active')) {
      initChatbot();
      document.getElementById('chat-input')?.focus();
    }
  });
  observer.observe(chatbotSection, { attributes: true });
}

// --- Placeholder: Career Test, Compare, News, etc. ---
// Each feature will be modularized and implemented in this style.

// --- Career Guidance Test Module ---
const careerTestQuestions = [
  {
    q: 'Which activity do you enjoy most?',
    options: [
      { text: 'Solving puzzles or coding', value: 'Computer Science' },
      { text: 'Helping people with health', value: 'Medicine' },
      { text: 'Leading a team or starting a business', value: 'Business' },
      { text: 'Building or designing things', value: 'Engineering' },
      { text: 'Debating or understanding laws', value: 'Law' }
    ]
  },
  {
    q: 'Which school subject do you like best?',
    options: [
      { text: 'Math or Computer Science', value: 'Computer Science' },
      { text: 'Biology or Chemistry', value: 'Medicine' },
      { text: 'Economics or Social Studies', value: 'Business' },
      { text: 'Physics or Technology', value: 'Engineering' },
      { text: 'History or Literature', value: 'Law' }
    ]
  },
  {
    q: 'What is most important to you in your future career?',
    options: [
      { text: 'Innovation and technology', value: 'Computer Science' },
      { text: 'Helping others directly', value: 'Medicine' },
      { text: 'Financial success', value: 'Business' },
      { text: 'Creating or improving things', value: 'Engineering' },
      { text: 'Justice and fairness', value: 'Law' }
    ]
  }
];

const careerTestBox = document.getElementById('career-test-box');
let testState = { current: 0, answers: [] };

const renderCareerTest = () => {
  if (!careerTestBox) return;
  testState = { current: 0, answers: [] };
  showCareerTestQuestion();
};

const showCareerTestQuestion = () => {
  const qIdx = testState.current;
  const qObj = careerTestQuestions[qIdx];
  if (!qObj) return showCareerTestResult();
  let html = `<form id='career-test-form' aria-label='Career test question'>`;
  html += `<fieldset><legend>${qObj.q}</legend>`;
  qObj.options.forEach((opt, i) => {
    html += `
      <div>
        <input type='radio' id='ctopt${qIdx}_${i}' name='ctq' value='${opt.value}' />
        <label for='ctopt${qIdx}_${i}'>${opt.text}</label>
      </div>
    `;
  });
  html += `</fieldset>`;
  html += `<button type='submit'>Next</button>`;
  html += `</form>`;
  careerTestBox.innerHTML = html;
  const form = document.getElementById('career-test-form');
  form.onsubmit = e => {
    e.preventDefault();
    const selected = form.elements['ctq'].value;
    if (!selected) {
      alert('Please select an answer.');
      return;
    }
    testState.answers.push(selected);
    testState.current++;
    showCareerTestQuestion();
  };
  form.querySelector('input[type=radio]')?.focus();
};

const showCareerTestResult = () => {
  // Count most frequent profession
  const counts = {};
  testState.answers.forEach(ans => { counts[ans] = (counts[ans] || 0) + 1; });
  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  let html = `<h3>Your Recommended Profession:</h3>`;
  if (best) {
    html += `<div class='career-result'><b>${best}</b></div>`;
    // Recommend universities for this profession
    const recUnis = universities.filter(u => u.professions.includes(best));
    if (recUnis.length) {
      html += `<h4>Recommended Universities:</h4><ul>`;
      recUnis.forEach(u => {
        html += `<li>${u.name}</li>`;
      });
      html += `</ul>`;
    }
  } else {
    html += `<div class='career-result'>No clear recommendation. Try again!</div>`;
  }
  html += `<button id='career-test-restart' type='button'>Restart Test</button> <button id='career-test-gohome' type='button'>Go to Home</button>`;
  careerTestBox.innerHTML = html;
  document.getElementById('career-test-restart').onclick = renderCareerTest;
  document.getElementById('career-test-gohome').onclick = () => {
    showSection('home');
    navLinks[0].focus();
  };
};

// Reset and render test on section show
const careerTestSection = document.getElementById('career-test');
if (careerTestSection) {
  const observer = new MutationObserver(() => {
    if (careerTestSection.classList.contains('active')) {
      renderCareerTest();
    }
  });
  observer.observe(careerTestSection, { attributes: true });
}

// --- University Comparison Module ---
const compareBox = document.getElementById('compare-box');
let compareSelected = [];

const renderCompareList = () => {
  if (!compareBox) return;
  compareSelected = [];
  let html = `<form id='compare-form' aria-label='Select universities to compare'>`;
  html += `<fieldset><legend>Select up to 3 universities to compare</legend><ul>`;
  universities.forEach((uni, i) => {
    html += `
      <li>
        <input type='checkbox' id='cmp${i}' name='cmp' value='${uni.name}' />
        <label for='cmp${i}'>${uni.name}</label>
      </li>
    `;
  });
  html += `</ul></fieldset>`;
  html += `<button type='submit'>Compare</button> <button type='button' id='compare-clear'>Clear</button>`;
  html += `</form><div id='compare-result'></div>`;
  compareBox.innerHTML = html;
  const form = document.getElementById('compare-form');
  const clearBtn = document.getElementById('compare-clear');
  form.onsubmit = e => {
    e.preventDefault();
    const checked = Array.from(form.elements['cmp']).filter(cb => cb.checked).map(cb => cb.value);
    if (checked.length < 2 || checked.length > 3) {
      alert('Please select 2 or 3 universities to compare.');
      return;
    }
    compareSelected = checked;
    renderCompareTable();
  };
  clearBtn.onclick = () => renderCompareList();
};

const renderCompareTable = () => {
  const resultDiv = document.getElementById('compare-result');
  if (!resultDiv) return;
  const selectedUnis = universities.filter(u => compareSelected.includes(u.name));
  let html = `<table class='compare-table' aria-label='University comparison'><thead><tr><th>Feature</th>`;
  selectedUnis.forEach(u => { html += `<th>${highlightUniversity(u.name)}</th>`; });
  html += `</tr></thead><tbody>`;
  // Requirements
  html += `<tr><td><b>Requirements</b></td>`;
  selectedUnis.forEach(u => {
    html += `<td>`;
    Object.entries(u.requirements).forEach(([k, v]) => {
      html += `<div><b>${k}:</b> ${v}</div>`;
    });
    html += `</td>`;
  });
  html += `</tr>`;
  // Price
  html += `<tr><td><b>Price</b></td>`;
  selectedUnis.forEach(u => {
    html += `<td>${u.price ? '$' + u.price : 'N/A'}</td>`;
  });
  html += `</tr>`;
  // Included
  html += `<tr><td><b>Included</b></td>`;
  selectedUnis.forEach(u => {
    html += `<td>${u.included.join(', ')}</td>`;
  });
  html += `</tr>`;
  // Not Included
  html += `<tr><td><b>Not Included</b></td>`;
  selectedUnis.forEach(u => {
    html += `<td>${u.notIncluded.join(', ')}</td>`;
  });
  html += `</tr>`;
  // Discounts
  html += `<tr><td><b>Discounts</b></td>`;
  selectedUnis.forEach(u => {
    html += `<td>${u.discounts.join(', ')}</td>`;
  });
  html += `</tr>`;
  html += `</tbody></table>`;
  resultDiv.innerHTML = html;
};

// Reset and render compare on section show
const compareSection = document.getElementById('compare');
if (compareSection) {
  const observer = new MutationObserver(() => {
    if (compareSection.classList.contains('active')) {
      renderCompareList();
    }
  });
  observer.observe(compareSection, { attributes: true });
}

// --- News & Updates Module ---
const newsBox = document.getElementById('news-box');
const newsItems = [
  {
    title: 'New Full Scholarships for 2024 Announced',
    date: '2024-05-10',
    summary: 'Several top universities have announced new full scholarships for international students. Apply before the deadline!',
    link: 'https://www.example.com/scholarships-2024'
  },
  {
    title: 'IELTS/TOEFL Waivers for Select Programs',
    date: '2024-04-28',
    summary: 'Some universities now accept alternative English proficiency proofs. Check if your program is eligible.',
    link: 'https://www.example.com/english-waivers'
  },
  {
    title: 'Early Application Deadlines Approaching',
    date: '2024-04-20',
    summary: 'Don\'t miss early deadlines for top US and European universities. Early applicants may get priority for grants.',
    link: 'https://www.example.com/early-deadlines'
  },
  {
    title: 'New STEM Grants for Women',
    date: '2024-03-30',
    summary: 'Special grants for women in STEM fields are now open for applications. See eligibility and apply soon.',
    link: 'https://www.example.com/stem-women-grants'
  }
];

const renderNews = () => {
  if (!newsBox) return;
  let html = `<button id='news-refresh' type='button' aria-label='Refresh news'>Refresh News</button>`;
  html += `<ul class='news-list' aria-label='News and updates'>`;
  newsItems.forEach(item => {
    html += `<li class='news-item'>
      <h4>${item.title}</h4>
      <div class='news-date'>${item.date}</div>
      <div class='news-summary'>${item.summary}</div>
      ${item.link ? `<a href='${item.link}' target='_blank' rel='noopener noreferrer'>Read more</a>` : ''}
    </li>`;
  });
  html += `</ul>`;
  newsBox.innerHTML = html;
  document.getElementById('news-refresh').onclick = renderNews;
};

// Render news on section show
const newsSection = document.getElementById('news');
if (newsSection) {
  const observer = new MutationObserver(() => {
    if (newsSection.classList.contains('active')) {
      renderNews();
    }
  });
  observer.observe(newsSection, { attributes: true });
}

// --- Cost Calculator Module ---
const costCalculatorBox = document.getElementById('cost-calculator-box');
const livingCosts = {
  USA: 18000,
  UK: 15000,
  Germany: 12000,
  Turkey: 8000
};

const renderCostCalculator = () => {
  if (!costCalculatorBox) return;
  let html = `<form id='cost-calc-form' aria-label='Cost calculator'>`;
  html += `<fieldset><legend>Estimate Your Total Education Cost</legend>`;
  html += `<label for='cc-country'>Country:</label> <select id='cc-country' name='country' required>`;
  Object.keys(livingCosts).forEach(country => {
    html += `<option value='${country}'>${country}</option>`;
  });
  html += `</select><br><br>`;
  html += `<label for='cc-tuition'>Tuition per year (USD):</label> <input id='cc-tuition' name='tuition' type='number' min='0' required><br><br>`;
  html += `<label for='cc-years'>Years of study:</label> <input id='cc-years' name='years' type='number' min='1' max='10' value='4' required><br><br>`;
  html += `<button type='submit'>Calculate</button>`;
  html += `</fieldset></form><div id='cost-calc-result'></div>`;
  costCalculatorBox.innerHTML = html;
  const form = document.getElementById('cost-calc-form');
  form.onsubmit = e => {
    e.preventDefault();
    const country = form.elements['country'].value;
    const tuition = parseFloat(form.elements['tuition'].value);
    const years = parseInt(form.elements['years'].value);
    if (!country || isNaN(tuition) || tuition < 0 || isNaN(years) || years < 1) {
      alert('Please enter valid values.');
      return;
    }
    const living = livingCosts[country] * years;
    const tuitionTotal = tuition * years;
    const total = living + tuitionTotal;
    let result = `<div class='cost-result'><b>Total Estimated Cost:</b> $${total.toLocaleString()}<br>`;
    result += `<small>Tuition: $${tuitionTotal.toLocaleString()}<br>Living: $${living.toLocaleString()} (${country}, ${years} years)</small></div>`;
    document.getElementById('cost-calc-result').innerHTML = result;
  };
};

// Render cost calculator on section show
const costCalcSection = document.getElementById('cost-calculator');
if (costCalcSection) {
  const observer = new MutationObserver(() => {
    if (costCalcSection.classList.contains('active')) {
      renderCostCalculator();
    }
  });
  observer.observe(costCalcSection, { attributes: true });
}

// --- Interactive Map Module ---
const mapBox = document.getElementById('map-box');
const universityLocations = [
  {
    name: 'MIT',
    country: 'USA',
    city: 'Cambridge, MA',
    lat: 42.3601,
    lng: -71.0942,
    climate: 'Temperate, snowy winters',
    safety: 'Very safe, student-friendly'
  },
  {
    name: 'Stanford University',
    country: 'USA',
    city: 'Stanford, CA',
    lat: 37.4275,
    lng: -122.1697,
    climate: 'Mild, Mediterranean',
    safety: 'Very safe, tech hub'
  },
  {
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    lat: 48.2622,
    lng: 11.6677,
    climate: 'Continental, cold winters',
    safety: 'Safe, vibrant city'
  },
  {
    name: 'Harvard University',
    country: 'USA',
    city: 'Cambridge, MA',
    lat: 42.3770,
    lng: -71.1167,
    climate: 'Temperate, snowy winters',
    safety: 'Very safe, historic area'
  }
];

const renderMap = () => {
  if (!mapBox) return;
  // Use a static map image with markers for demo (for offline use)
  let html = `<div class='map-img-wrap'>
    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular-projection.jpg/600px-Equirectangular-projection.jpg' alt='World map with university locations marked' class='map-img' />
    <div class='map-markers'>`;
  // Place demo markers (absolute positioning for demo only)
  universityLocations.forEach((u, i) => {
    // Simple mapping: USA (left), Germany (center-right)
    let left = u.country === 'USA' ? 18 : u.country === 'Germany' ? 62 : 40;
    let top = u.country === 'USA' ? (u.name === 'Stanford University' ? 60 : 45) : 38;
    if (u.name === 'Harvard University') top = 42;
    html += `<span class='map-marker' style='left:${left}%;top:${top}%;' title='${u.name}' aria-label='${u.name}'></span>`;
  });
  html += `</div></div>`;
  html += `<ul class='map-uni-list' aria-label='Universities on map'>`;
  universityLocations.forEach(u => {
    html += `<li><b>${highlightUniversity(u.name)}</b> (${u.city}, ${u.country})<br>
      <span class='map-info'>Climate: ${u.climate} | Safety: ${u.safety}</span></li>`;
  });
  html += `</ul>`;
  mapBox.innerHTML = html;
};

// Render map on section show
const mapSection = document.getElementById('map');
if (mapSection) {
  const observer = new MutationObserver(() => {
    if (mapSection.classList.contains('active')) {
      renderMap();
    }
  });
  observer.observe(mapSection, { attributes: true });
}

// --- Reviews & Success Stories Module ---
const reviewsBox = document.getElementById('reviews-box');
const reviewsData = [
  {
    name: 'Aigerim S.',
    university: 'MIT',
    profession: 'Computer Science',
    story: 'I never thought I could get into MIT, but with a strong application and lots of practice for the SAT, I made it! The campus is amazing and the professors are inspiring. My advice: believe in yourself and use all the resources you can find.'
  },
  {
    name: 'Elena T.',
    university: 'Technical University of Munich',
    profession: 'Engineering',
    story: 'Studying in Germany was a dream come true. The education is top-notch and living in Munich is both safe and fun. I recommend learning some German before you go!'
  },
  {
    name: 'Samir K.',
    university: 'Harvard University',
    profession: 'Law',
    story: 'Harvard was challenging, but the community and support made all the difference. I got a partial grant and worked part-time. Don\'t be afraid to ask for help and apply for every scholarship you can.'
  }
];

const renderReviews = () => {
  if (!reviewsBox) return;
  let html = `<ul class='reviews-list' aria-label='Graduate stories'>`;
  reviewsData.forEach((r, i) => {
    html += `<li class='review-item'>
      <div class='review-header'><b>${r.name}</b> &mdash; <span>${highlightUniversity(r.university)}</span> <span class='review-prof'>(${r.profession})</span></div>
      <button class='review-toggle' aria-expanded='false' aria-controls='review-story-${i}' id='review-btn-${i}'>Show Story</button>
      <div class='review-story' id='review-story-${i}' hidden>${r.story}</div>
    </li>`;
  });
  html += `</ul>`;
  reviewsBox.innerHTML = html;
  // Add toggle logic
  reviewsData.forEach((_, i) => {
    const btn = document.getElementById(`review-btn-${i}`);
    const story = document.getElementById(`review-story-${i}`);
    btn.onclick = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      btn.textContent = expanded ? 'Show Story' : 'Hide Story';
      if (expanded) {
        story.setAttribute('hidden', '');
      } else {
        story.removeAttribute('hidden');
        story.focus();
      }
    };
  });
};

// Render reviews on section show
const reviewsSection = document.getElementById('reviews');
if (reviewsSection) {
  const observer = new MutationObserver(() => {
    if (reviewsSection.classList.contains('active')) {
      renderReviews();
    }
  });
  observer.observe(reviewsSection, { attributes: true });
}

// --- FAQ & Glossary Module ---
const faqBox = document.getElementById('faq-box');
const faqData = [
  {
    q: 'What is GPA?',
    a: 'GPA stands for Grade Point Average. It is a number that represents your average academic performance, usually on a 4.0 scale.'
  },
  {
    q: 'What is the SAT?',
    a: 'The SAT is a standardized test widely used for college admissions in the United States. It tests math, reading, and writing.'
  },
  {
    q: 'What is IELTS?',
    a: 'IELTS is the International English Language Testing System, used to assess English proficiency for non-native speakers.'
  },
  {
    q: 'What is TOEFL?',
    a: 'TOEFL is the Test of English as a Foreign Language, another common English proficiency test for university admissions.'
  },
  {
    q: 'What is a grant?',
    a: 'A grant is financial aid given to students to help pay for their education. Grants do not need to be repaid.'
  },
  {
    q: 'What is an early application?',
    a: 'Early application means applying to a university before the regular deadline, often with a chance for priority consideration.'
  },
  {
    q: 'What documents are usually required for admission?',
    a: 'Common documents include transcripts, test scores, recommendation letters, a motivation letter, and proof of language proficiency.'
  }
];

const renderFAQ = () => {
  if (!faqBox) return;
  let html = `<ul class='faq-list' aria-label='FAQ and glossary'>`;
  faqData.forEach((item, i) => {
    html += `<li class='faq-item'>
      <button class='faq-toggle' aria-expanded='false' aria-controls='faq-a-${i}' id='faq-btn-${i}'>${item.q}</button>
      <div class='faq-answer' id='faq-a-${i}' hidden>${item.a}</div>
    </li>`;
  });
  html += `</ul>`;
  faqBox.innerHTML = html;
  // Add toggle logic
  faqData.forEach((_, i) => {
    const btn = document.getElementById(`faq-btn-${i}`);
    const ans = document.getElementById(`faq-a-${i}`);
    btn.onclick = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      if (expanded) {
        ans.setAttribute('hidden', '');
      } else {
        ans.removeAttribute('hidden');
        ans.focus();
      }
    };
  });
};

// Render FAQ on section show
const faqSection = document.getElementById('faq');
if (faqSection) {
  const observer = new MutationObserver(() => {
    if (faqSection.classList.contains('active')) {
      renderFAQ();
    }
  });
  observer.observe(faqSection, { attributes: true });
}

// --- Preparation Block Module ---
const preparationBox = document.getElementById('preparation-box');
const prepResources = [
  { name: 'IELTS Official Practice', url: 'https://www.ielts.org/about-ielts/ielts-practice-test' },
  { name: 'SAT Practice (Khan Academy)', url: 'https://www.khanacademy.org/sat' },
  { name: 'TOEFL Free Resources', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare.html' },
  { name: 'Common App Guide', url: 'https://www.commonapp.org/' }
];
const prepChecklist = [
  'Prepare your transcripts and certificates',
  'Take required tests (SAT, IELTS, TOEFL, etc.)',
  'Write your motivation letter',
  'Request recommendation letters',
  'Prepare a CV/resume',
  'Check application deadlines',
  'Submit your application online',
  'Track your application status'
];

const renderPreparation = () => {
  if (!preparationBox) return;
  let html = `<h3>Free Preparation Resources</h3><ul class='prep-res-list'>`;
  prepResources.forEach(r => {
    html += `<li><a href='${r.url}' target='_blank' rel='noopener noreferrer'>${r.name}</a></li>`;
  });
  html += `</ul><h3>Application Checklist</h3><ul class='prep-checklist'>`;
  prepChecklist.forEach(item => {
    html += `<li><input type='checkbox' aria-label='${item}' disabled> ${item}</li>`;
  });
  html += `</ul>`;
  preparationBox.innerHTML = html;
};

// Render preparation on section show
const prepSection = document.getElementById('preparation');
if (prepSection) {
  const observer = new MutationObserver(() => {
    if (prepSection.classList.contains('active')) {
      renderPreparation();
    }
  });
  observer.observe(prepSection, { attributes: true });
}

// --- Reminders Subscription Module ---
const remindersBox = document.getElementById('reminders-box');
const reminderTypes = [
  { id: 'deadlines', label: 'Application Deadlines' },
  { id: 'grants', label: 'New Grants & Scholarships' },
  { id: 'news', label: 'News & Updates' }
];

const renderReminders = () => {
  if (!remindersBox) return;
  let html = `<form id='reminder-form' aria-label='Reminders subscription'>`;
  html += `<fieldset><legend>Subscribe to Reminders</legend>`;
  html += `<label for='reminder-email'>Email:</label> <input id='reminder-email' name='email' type='email' required placeholder='you@email.com' autocomplete='email'><br><br>`;
  html += `<span>Remind me about:</span><br>`;
  reminderTypes.forEach(r => {
    html += `<input type='checkbox' id='reminder-${r.id}' name='reminder-type' value='${r.id}'> <label for='reminder-${r.id}'>${r.label}</label><br>`;
  });
  html += `<button type='submit'>Subscribe</button>`;
  html += `</fieldset></form><div id='reminder-result'></div>`;
  remindersBox.innerHTML = html;
  const form = document.getElementById('reminder-form');
  form.onsubmit = e => {
    e.preventDefault();
    const email = form.elements['email'].value.trim();
    const checked = Array.from(form.elements['reminder-type']).filter(cb => cb.checked).map(cb => cb.value);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (checked.length === 0) {
      alert('Please select at least one reminder type.');
      return;
    }
    document.getElementById('reminder-result').innerHTML = `<div class='reminder-success'>Thank you! You will receive reminders at <b>${email}</b> (demo only).</div>`;
    form.reset();
  };
};

// Render reminders on section show
const remindersSection = document.getElementById('reminders');
if (remindersSection) {
  const observer = new MutationObserver(() => {
    if (remindersSection.classList.contains('active')) {
      renderReminders();
    }
  });
  observer.observe(remindersSection, { attributes: true });
}

// --- Payback Calculator Module ---
const paybackBox = document.getElementById('payback-box');

const renderPayback = () => {
  if (!paybackBox) return;
  let html = `<form id='payback-form' aria-label='Payback calculator'>`;
  html += `<fieldset><legend>Payback Calculator</legend>`;
  html += `<label for='payback-cost'>Total Education Cost (USD):</label> <input id='payback-cost' name='cost' type='number' min='0' required><br><br>`;
  html += `<label for='payback-salary'>Expected Annual Salary (USD):</label> <input id='payback-salary' name='salary' type='number' min='0' required><br><br>`;
  html += `<label for='payback-save'>Percent of Salary Saved (%):</label> <input id='payback-save' name='save' type='number' min='1' max='100' value='20' required><br><br>`;
  html += `<button type='submit'>Calculate</button>`;
  html += `</fieldset></form><div id='payback-result'></div>`;
  paybackBox.innerHTML = html;
  const form = document.getElementById('payback-form');
  form.onsubmit = e => {
    e.preventDefault();
    const cost = parseFloat(form.elements['cost'].value);
    const salary = parseFloat(form.elements['salary'].value);
    const save = parseFloat(form.elements['save'].value);
    if (isNaN(cost) || cost <= 0 || isNaN(salary) || salary <= 0 || isNaN(save) || save <= 0 || save > 100) {
      alert('Please enter valid values.');
      return;
    }
    const annualSaved = salary * (save / 100);
    if (annualSaved <= 0) {
      document.getElementById('payback-result').innerHTML = `<div class='payback-result'>You need to save some of your salary to pay back your education.</div>`;
      return;
    }
    const years = Math.ceil(cost / annualSaved * 10) / 10;
    let result = `<div class='payback-result'><b>Estimated Payback Time:</b> ${years} years<br>`;
    result += `<small>Assuming you save $${annualSaved.toLocaleString()} per year (${save}% of $${salary.toLocaleString()})</small></div>`;
    document.getElementById('payback-result').innerHTML = result;
  };
};

// Render payback calculator on section show
const paybackSection = document.getElementById('payback');
if (paybackSection) {
  const observer = new MutationObserver(() => {
    if (paybackSection.classList.contains('active')) {
      renderPayback();
    }
  });
  observer.observe(paybackSection, { attributes: true });
}

// --- Document Upload & Check Module ---
const uploadBox = document.getElementById('upload-box');
const docTypes = [
  { id: 'recommendation', label: 'Recommendation Letter' },
  { id: 'motivation', label: 'Motivation Letter' },
  { id: 'cv', label: 'CV/Resume' },
  { id: 'transcript', label: 'Transcript' }
];

const renderUpload = () => {
  if (!uploadBox) return;
  let html = `<form id='upload-form' aria-label='Document upload and check' enctype='multipart/form-data'>`;
  html += `<fieldset><legend>Upload and Check Your Document</legend>`;
  html += `<label for='upload-type'>Document Type:</label> <select id='upload-type' name='type' required>`;
  docTypes.forEach(d => {
    html += `<option value='${d.id}'>${d.label}</option>`;
  });
  html += `</select><br><br>`;
  html += `<label for='upload-file'>Choose File:</label> <input id='upload-file' name='file' type='file' accept='.pdf,.doc,.docx' required><br><br>`;
  html += `<button type='submit'>Upload & Check</button>`;
  html += `</fieldset></form><div id='upload-result'></div>`;
  uploadBox.innerHTML = html;
  const form = document.getElementById('upload-form');
  form.onsubmit = e => {
    e.preventDefault();
    const fileInput = form.elements['file'];
    const type = form.elements['type'].value;
    if (!fileInput.files.length) {
      alert('Please select a file to upload.');
      return;
    }
    const file = fileInput.files[0];
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|docx?|DOCX?)$/)) {
      alert('Please upload a PDF or Word document.');
      return;
    }
    // Demo check: just show a success message
    document.getElementById('upload-result').innerHTML = `<div class='upload-success'>File <b>${file.name}</b> (${type.replace(/\b\w/g, l => l.toUpperCase())}) received. Format looks correct! (Demo only)</div>`;
    form.reset();
  };
};

// Render upload on section show
const uploadSection = document.getElementById('upload');
if (uploadSection) {
  const observer = new MutationObserver(() => {
    if (uploadSection.classList.contains('active')) {
      renderUpload();
    }
  });
  observer.observe(uploadSection, { attributes: true });
}

// Helper to highlight 'University' in names
function highlightUniversity(name) {
  return name.replace(/(University)/gi, "<span class='uni-highlight'>$1</span>");
} 