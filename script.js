const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let question = [
    {
        question: "Which of the following is correct about features of JavaScript?",
        Choice1: "JavaScript is a lightweight, interpreted programming language.",
        Choice2: "JavaScript is designed for creating network-centric applications.",
        Choice3: "JavaScript is complementary to and integrated with Java.",
        Choice4: "All of the above.",
        answer: 4,
    },
    {
        question: "Which of the following is correct about callbacks?",
        Choice1: "A callback is a plain JavaScript function passed to some method as an argument or option.",       
        Choice2: "Some callbacks are just events, called to give the user a chance to react when a certain state is triggered.",       
        Choice3: "Both of the above.",
        Choice4: "None of the above.",
        answer: 3,
    },
    {
        question: "Which built-in method returns the characters in a string beginning at the specified location?",
        Choice1: "substr()",       
        Choice2: "getSubstring()",       
        Choice3: "slice()",
        Choice4: "None of the above.",
        answer: 1,  
    },
    {
        question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
        Choice1: "toSource()",       
        Choice2: "valueOf()",       
        Choice3: "toString()",
        Choice4: "None of the above.",
        answer: 1,  
    },
    {
        question: "Which of the following function of String object creates a string to be displayed in a big font as if it were in a <big> tag?",
        Choice1: "anchor()",       
        Choice2: "big()",       
        Choice3: "blink()",
        Choice4: "italics",
        answer: 2,  
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()