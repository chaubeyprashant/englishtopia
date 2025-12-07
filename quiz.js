let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = Date.now();

// Initialize quiz
function initializeQuiz() {
  const quizData = localStorage.getItem('currentQuiz');
  if (!quizData) {
    alert('No quiz data found. Redirecting to quizzes page.');
    window.location.href = 'quizzes.html';
    return;
  }

  currentQuiz = JSON.parse(quizData);
  userAnswers = new Array(currentQuiz.questions.length).fill(null);

  document.getElementById('quiz-title').textContent = currentQuiz.title;
  document.getElementById('quiz-info').textContent =
    `${currentQuiz.questions.length} questions • Practice Quiz`;

  renderQuestion();
}

function renderQuestion() {
  const question = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  document.getElementById('progress-fill').style.width = `${progress}%`;

  let html = `
    <div class="question-header">
      <p><b>Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</b></p>
    </div>
    <p class="question-text">${question.text}</p>
  `;

  question.options.forEach((option, i) => {
    const checked = userAnswers[currentQuestionIndex] === i ? "checked" : "";
    html += `
      <label class="option-label">
        <input type="radio" name="q${currentQuestionIndex}" value="${i}" ${checked}
          onchange="selectAnswer(${i})">
        <span class="option-text">${option}</span>
      </label>
    `;
  });

  document.getElementById("question-box").innerHTML = html;

  // Update button states
  document.getElementById("prev-button").disabled = currentQuestionIndex === 0;

  const nextBtn = document.getElementById("next-button");
  nextBtn.textContent =
    currentQuestionIndex === currentQuiz.questions.length - 1
      ? "Submit Quiz"
      : "Next Question";

  // Disable Next if no answer is selected
  nextBtn.disabled = userAnswers[currentQuestionIndex] === null;
}

function selectAnswer(answerIndex) {
  userAnswers[currentQuestionIndex] = answerIndex;

  // Enable Next once an option is selected
  document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer before proceeding.");
    return;
  }

  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    submitQuiz();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function submitQuiz() {
  const endTime = Date.now();
  const timeSpent = Math.round((endTime - startTime) / 1000);

  const results = calculateQuizResults();
  results.timeSpent = timeSpent;
  results.quizType = localStorage.getItem('quizType');

  // Store results using the centralized function from app.js
  storeQuizResults(results);

  // Show results
  showResults(results);
}

function calculateQuizResults() {
  let correctAnswers = 0;
  const questionResults = [];

  currentQuiz.questions.forEach((question, index) => {
    const isCorrect = userAnswers[index] === question.answer;
    if (isCorrect) correctAnswers++;

    questionResults.push({
      question: question.text,
      userAnswer: userAnswers[index],
      correctAnswer: question.answer,
      isCorrect: isCorrect,
      explanation: question.explanation,
      options: question.options
    });
  });

  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    totalQuestions,
    correctAnswers,
    percentage,
    questionResults,
    answers: userAnswers
  };
}

function showResults(results) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="results-container">
      <h2>Quiz Results</h2>
      <div class="score-display">${results.percentage}%</div>
      <div class="score-details">
        <p><strong>Correct Answers:</strong> ${results.correctAnswers}/${results.totalQuestions}</p>
        <p><strong>Time Spent:</strong> ${Math.floor(results.timeSpent / 60)}:${(results.timeSpent % 60).toString().padStart(2, '0')}</p>
        <p><strong>Quiz Type:</strong> ${results.quizType}</p>
      </div>

      <h3 style="margin-bottom: 20px; color: #2a9d8f;">Question Review</h3>
      ${results.questionResults.map((result, index) => `
        <div class="explanation">
          <p><strong>Question ${index + 1}:</strong> ${result.question}</p>
          <p><strong>Your Answer:</strong> ${result.options[result.userAnswer] || 'Not answered'}</p>
          <p><strong>Correct Answer:</strong> ${result.options[result.correctAnswer]}</p>
          <p><strong>Explanation:</strong> ${result.explanation}</p>
          <p style="color: ${result.isCorrect ? '#10b981' : '#ef4444'}; font-weight: 600;">
            ${result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </p>
        </div>
      `).join('')}

      <div class="button-container" style="margin-top: 30px;">
        <button class="test-button" onclick="window.location.href='quizzes.html'">Back to Quizzes</button>
        <button class="test-button" onclick="window.location.href='homepage.html'">Home</button>
      </div>
    </div>
  `;
}

// Event handlers for quiz buttons
addEventListeners('[data-action="previous"]', 'Previous button', previousQuestion);
addEventListeners('[data-action="next"]', 'Next button', nextQuestion);

// Initialize the quiz when page loads
document.addEventListener('DOMContentLoaded', initializeQuiz);