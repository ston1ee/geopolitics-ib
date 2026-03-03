// Main JavaScript for GeoPolIB Platform

// Progress tracking - localStorage based
const STORAGE_KEY = 'geopol_progress';

function getProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {
    modules: {},
    quizScores: {},
    totalProgress: 0
  };
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateProgressDisplay();
}

function markModuleComplete(moduleNum) {
  const progress = getProgress();
  progress.modules[`m${moduleNum}`] = true;
  const totalModules = 8;
  const completed = Object.keys(progress.modules).length;
  progress.totalProgress = Math.round((completed / totalModules) * 100);
  saveProgress(progress);
}

function updateProgressDisplay() {
  const progress = getProgress();
  const bar = document.getElementById('overallBar');
  const label = document.getElementById('progressLabel');
  
  if (bar && label) {
    bar.style.width = progress.totalProgress + '%';
    label.textContent = progress.totalProgress + '% Complete';
  }
  
  // Mark completed module steps
  document.querySelectorAll('.prog-step').forEach(step => {
    const moduleNum = step.dataset.module;
    if (progress.modules[`m${moduleNum}`]) {
      step.classList.add('completed');
    }
  });
}

// Flashcard functionality
let currentCardIndex = 0;

function flipCard(card) {
  card.classList.toggle('flipped');
}

function showCard(index) {
  const cards = document.querySelectorAll('.flashcard');
  cards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
  
  const counter = document.getElementById('fcCounter');
  if (counter) {
    counter.textContent = `${index + 1} / ${cards.length}`;
  }
}

function nextCard() {
  const cards = document.querySelectorAll('.flashcard');
  currentCardIndex = (currentCardIndex + 1) % cards.length;
  showCard(currentCardIndex);
}

function prevCard() {
  const cards = document.querySelectorAll('.flashcard');
  currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
  showCard(currentCardIndex);
}

// Quiz functionality
function initQuiz(questions) {
  let currentQuestion = 0;
  let score = 0;
  
  function displayQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('questionNum').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'quiz-option';
      btn.onclick = () => selectAnswer(idx);
      optionsContainer.appendChild(btn);
    });
  }
  
  function selectAnswer(idx) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.quiz-option');
    
    if (idx === q.correct) {
      score++;
      buttons[idx].classList.add('correct');
    } else {
      buttons[idx].classList.add('wrong');
      buttons[q.correct].classList.add('correct');
    }
    
    buttons.forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        displayQuestion();
      } else {
        showResults();
      }
    }, 1500);
  }
  
  function showResults() {
    const percent = Math.round((score / questions.length) * 100);
    document.getElementById('quizContainer').innerHTML = `
      <div class="quiz-results">
        <h2>Quiz Complete!</h2>
        <div class="result-score">${score} / ${questions.length}</div>
        <div class="result-percent">${percent}%</div>
        <p>${percent >= 80 ? 'Excellent work!' : percent >= 60 ? 'Good job!' : 'Keep studying!'}</p>
        <button onclick="location.reload()" class="btn-restart">Try Again</button>
        <a href="../index.html" class="btn-home">Back to Home</a>
      </div>
    `;
    
    // Save score
    const progress = getProgress();
    const quizName = document.body.dataset.quizName || 'general';
    if (!progress.quizScores[quizName] || percent > progress.quizScores[quizName]) {
      progress.quizScores[quizName] = percent;
      saveProgress(progress);
    }
  }
  
  displayQuestion();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateProgressDisplay();
  
  // Show first flashcard if on home page
  if (document.getElementById('homeDeck')) {
    showCard(0);
  }
  
  // Mark module as viewed when user scrolls to bottom
  let hasScrolledToBottom = false;
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      if (!hasScrolledToBottom) {
        hasScrolledToBottom = true;
        const moduleMatch = window.location.pathname.match(/m(\d+)-/);
        if (moduleMatch) {
          markModuleComplete(parseInt(moduleMatch[1]));
        }
      }
    }
  });
});

// Export functions for use in other scripts
window.geoPolIB = {
  getProgress,
  saveProgress,
  markModuleComplete,
  updateProgressDisplay,
  flipCard,
  nextCard,
  prevCard,
  initQuiz
};
