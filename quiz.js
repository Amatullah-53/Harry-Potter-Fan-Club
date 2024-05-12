$(document).ready(function(){

    const quizData = [
        // 20 quiz questions with options and correct answers
        {
            question: "What house at Hogwarts School of Witchcraft and Wizardry does Harry Potter belong to?",
            options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"],
            correctAnswer: "Gryffindor"
        },
        {
            question: "Who is Harry Potter's best friend?",
            options: ["Hermione Granger", "Ron Weasley", "Neville Longbottom", "Draco Malfoy"],
            correctAnswer: "Ron Weasley"
        },
        {
            question: "Who is the author of the Harry Potter book series?",
            options: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "Roald Dahl"],
            correctAnswer: "J.K. Rowling"
        },
        
        {
            question: "What is the name of Harry Potter's pet owl?",
            options: ["Hedwig", "Crookshanks", "Fawkes", "Norbert"],
            correctAnswer: "Hedwig"
        },
        {
            question: "What is the name of the train that takes students to Hogwarts School of Witchcraft and Wizardry?",
            options: ["Hogwarts Express", "Knight Bus", "Thestral", "Gringotts Express"],
            correctAnswer: "Hogwarts Express"
        },
        {
            question: "What is the name of the dark wizard who killed Harry Potter's parents?",
            options: ["Voldemort", "Dumbledore", "Sirius Black", "Severus Snape"],
            correctAnswer: "Voldemort"
        },
        {
            question: "What is the name of Harry Potter's father?",
            options: ["James Potter", "Sirius Black", "Remus Lupin", "Peter Pettigrew"],
            correctAnswer: "James Potter"
        },

        {
            question: "What magical object allows Harry Potter to communicate with snakes?",
            options: ["Pensieve", "Time-Turner", "Sneakoscope", "Parseltongue"],
            correctAnswer: "Parseltongue"
        },
        {
            question: "What is the name of the game played on broomsticks in the Harry Potter series?",
            options: ["Quidditch", "Bludger", "Snitch", "Quaffle"],
            correctAnswer: "Quidditch"
        },
        {
            question: "Who teaches Defense Against the Dark Arts in Harry Potter's first year at Hogwarts?",
            options: ["Severus Snape", "Albus Dumbledore", "Gilderoy Lockhart", "Remus Lupin"],
            correctAnswer: "Severus Snape"
        },
        {
            question: "What is the name of the creature that guards the entrance to the Gryffindor common room?",
            options: ["The Fat Friar", "The Bloody Baron", "The Grey Lady", "The Fat Lady"],
            correctAnswer: "The Fat Lady"
        },
        {
            question: "What magical plant has the ability to scream when touched?",
            options: ["Mandrake", "Devil's Snare", "Whomping Willow", "Screaming Mantis"],
            correctAnswer: "Mandrake"
        }
    ];

    
    const quizContainer = $('#quiz-content');
    const timerContainer = $('#timer-container');
    const timerDisplay = $('#timer');
    const scoreDisplay = $('#score-display'); // Ensure you have this element in your HTML
    let timeLeft = 60;
    let questionIndex = 0;
    let correctAnswersCount = 0;
    let incorrectAnswersCount = 0;
    let timerInterval;

    function renderQuiz() {
        if (questionIndex < quizData.length) {
            const question = quizData[questionIndex];
            const optionsHTML = question.options.map(option => `<button class="btn btn-primary option">${option}</button>`).join('');
            quizContainer.html(`
                <div class="quiz-question card">
                    <div class="card-body">
                        <h5 class="card-title">Question ${questionIndex + 1}</h5>
                        <p class="card-text">${question.question}</p>
                        <div class="options">${optionsHTML}</div>
                    </div>
                </div>
            `);
        }
    }

    function startTimer() {
        timerContainer.show();
        timeLeft = 60;
        timerDisplay.text(formatTime(timeLeft));
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.text(formatTime(timeLeft));
            } else {
                clearInterval(timerInterval);
                alert("Time's up!");
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function checkAnswers() {
        quizContainer.on('click', '.option', function() {
            const selectedOption = $(this).text();
            const correctAnswer = quizData[questionIndex].correctAnswer;

            if (selectedOption === correctAnswer) {
                correctAnswersCount++;
                $(this).addClass('btn-success');
            } else {
                incorrectAnswersCount++;
                $(this).addClass('btn-danger');
                $(this).siblings(`button:contains(${correctAnswer})`).addClass('btn-success');
            }

            updateScoreDisplay();
            $(this).siblings('.option').prop('disabled', true);
            setTimeout(() => {
                questionIndex++;
                if (correctAnswersCount >= 10) {
                    showWinModalAndStopGame();
                } else {
                    renderQuiz();
                }
            }, 1000);
        });
    }

    function updateScoreDisplay() {
        $('#correct-count').text(correctAnswersCount);
        $('#incorrect-count').text(incorrectAnswersCount);
        scoreDisplay.show(); // Show the score display when the quiz starts
    }

    function showWinModalAndStopGame() {
        clearInterval(timerInterval);
        $('#bgVideo').get(0).pause();
        $('#winModal').modal('show');
    }

    $('#start-btn').on('click', function() {
        $(this).hide();
        $('#game-instructions').hide();
        $('#bgVideo').show().get(0).play(); // Ensure the video is shown and playe
        $('#scoreDisplay').show();
        startTimer();
        renderQuiz();
        checkAnswers();
        var video = $('#bgVideo').get(0);
        video.muted = false; // Unmute the video
        video.play(); // Play the video


    });

    // Initialize
    timerContainer.hide();

    updateScoreDisplay(); // Initialize score display

    $('.burger-icon').click(function() {
        $('#burgerDropdown').toggle();
    });
});