const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreContainer = document.getElementById('score-container');
const totalCorrectElement = document.getElementById('total-correct');

let totalCorrect = 0;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  totalCorrect = 0;
  updateScore();
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  if (correct) {
    // Increment the total correct score if the selected answer is correct
    totalCorrect++;
  }

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // Display the total correct score when the quiz is completed
    scoreContainer.classList.remove('hide');
    updateScore();
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}


function updateScore() {
  // Update the total correct score in the HTML
  totalCorrectElement.innerText = totalCorrect;
}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'How many ethnic groups do we have in Nigeria?',
    answers: [
      { text: '250 ethnic groups', correct: true },
      { text: '270 ethnic groups', correct: false },
      { text: '600 ethnic groups', correct: false },
      { text: '21 ethnic groups', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'In Nigeria, democracy day is now celebrated on.',
    answers: [
      { text: 'June 12', correct: true },
      { text: 'June 17', correct: false },
      { text: 'June 17', correct: false },
      { text: 'June 17', correct: false },
    ]
  },
  {
    question: 'Which is the second-largest continent in the world?',
    answers: [
      { text: 'Europe, coming after Asia', correct: false },
      { text: 'Australia, coming after Asia', correct: false },
      { text: 'America', correct: false },
      { text: 'Africa, coming after Asia', correct: true }
    ]
  },
  {
    question: 'Which African country first gained independence?',
    answers: [
      { text: 'Liberia in 1847', correct: true },
      { text: 'Egypt', correct: false },
      { text: 'Nigeria', correct: false },
      { text: 'Ghana', correct: false },
    ]
  },
  {
    question: 'The hottest region in the world is called?',
    answers: [
      { text: 'The Kalahari Desert', correct: false },
      { text: 'The Sahara Desert', correct: true },
      { text: 'The Arabian Desert', correct: false },
      { text: 'The Namib Desert', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }


]