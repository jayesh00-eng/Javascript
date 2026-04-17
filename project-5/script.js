const quizlist = [
  {
    "question": "Why do JavaScript arrays love parties?",
    "options": {
      "A": "They like bugs",
      "B": "They have many elements to invite",
      "C": "They hate loops",
      "D": "They are undefined"
    },
    "answer": "B"
  },
  {
    "question": "What does an empty array feel like?",
    "options": {
      "A": "Happy",
      "B": "Powerful",
      "C": "Lonely",
      "D": "Compiled"
    },
    "answer": "C"
  },
  {
    "question": "Why did the array use push()?",
    "options": {
      "A": "To remove elements",
      "B": "To add new elements",
      "C": "To sort itself",
      "D": "To crash"
    },
    "answer": "B"
  },
  {
    "question": "What happens when you access an index that doesn’t exist?",
    "options": {
      "A": "0",
      "B": "null",
      "C": "undefined",
      "D": "error"
    },
    "answer": "C"
  },
  {
    "question": "Why are arrays bad at keeping secrets?",
    "options": {
      "A": "They are too quiet",
      "B": "They always spill elements",
      "C": "They don’t store data",
      "D": "They delete everything"
    },
    "answer": "B"
  },
  {
    "question": "What is an array’s favorite method?",
    "options": {
      "A": "push()",
      "B": "pop()",
      "C": "shift()",
      "D": "All of the above"
    },
    "answer": "D"
  },
  {
    "question": "Why did the array break up with the object?",
    "options": {
      "A": "Too many keys",
      "B": "No proper index relationship",
      "C": "Too many loops",
      "D": "It was undefined"
    },
    "answer": "B"
  },
  {
    "question": "What’s an array’s favorite music?",
    "options": {
      "A": "Rock",
      "B": "Pop",
      "C": "Push & Pop beats",
      "D": "Classical"
    },
    "answer": "C"
  },
  {
    "question": "Why do arrays love loops?",
    "options": {
      "A": "To repeat mistakes",
      "B": "To visit all elements",
      "C": "To crash programs",
      "D": "To remove bugs"
    },
    "answer": "B"
  },
  {
    "question": "What makes JavaScript arrays special?",
    "options": {
      "A": "Fixed size",
      "B": "Only numbers allowed",
      "C": "Can store different data types",
      "D": "Cannot change"
    },
    "answer": "C"
  }
];

const questionindex = document.getElementById("questionindex");
const question = document.getElementById("question");
const optionsa = document.getElementById("option-a");
const optionsb = document.getElementById("option-b");
const optionsc = document.getElementById("option-c");
const optionsd = document.getElementById("option-d");
const btnnext = document.getElementById("btnnext");
const timeleft = document.getElementById("timeleft");

let index = 0;
let score = 0;
let currentInterval = null;
let answered = false;
let optionListeners = () => {};

function displayquestion() { 
  questionindex.textContent = `Q${index + 1}`;
  question.textContent = quizlist[index].question;

  optionsa.textContent = quizlist[index].options.A;
  optionsb.textContent = quizlist[index].options.B;
  optionsc.textContent = quizlist[index].options.C;
  optionsd.textContent = quizlist[index].options.D;

  
  answered = false;
  optionsa.style.pointerEvents = 'auto';
  optionsb.style.pointerEvents = 'auto';
  optionsc.style.pointerEvents = 'auto';
  optionsd.style.pointerEvents = 'auto';
  optionsa.classList.remove('correct', 'incorrect');
  optionsb.classList.remove('correct', 'incorrect');
  optionsc.classList.remove('correct', 'incorrect');
  optionsd.classList.remove('correct', 'incorrect');


  const correctAnswer = quizlist[index].answer;
  const checkAnswer = (selectedOption, selectedLetter) => {
    answered = true;
  
    optionsa.style.pointerEvents = 'none';
    optionsb.style.pointerEvents = 'none';
    optionsc.style.pointerEvents = 'none';
    optionsd.style.pointerEvents = 'none';
    
    selectedOption.classList.add(selectedLetter === correctAnswer ? 'correct' : 'incorrect');
    if (selectedLetter === correctAnswer) {
      score++;
    }
  };

  optionsa.onclick = () => checkAnswer(optionsa, 'A');
  optionsb.onclick = () => checkAnswer(optionsb, 'B');
  optionsc.onclick = () => checkAnswer(optionsc, 'C');
  optionsd.onclick = () => checkAnswer(optionsd, 'D');


  if (currentInterval) {
    clearInterval(currentInterval);
  }


  let time = 10;
  timeleft.textContent = `Time Left: ${time}s`;
  currentInterval = setInterval(() => {
    time--;
    timeleft.textContent = `Time Left: ${time}s`;
    if (time <= 0) {
      clearInterval(currentInterval);
      currentInterval = null;
      advanceQuestion();
    }
  }, 1000);
}

function advanceQuestion() {
  if (index < quizlist.length - 1) {
    index++;
    displayquestion();
  } else {
    alert(`Quiz completed! You scored ${score}/${quizlist.length}`);
  }
}

displayquestion();

btnnext.addEventListener("click", () => {  
  if (currentInterval) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  advanceQuestion();
});

