
const progressBarsContainer = document.getElementById("progress-bars");

progressBarsContainer.innerHTML = "";

var jsonData = JSON.parse(localStorage.getItem('jsonData'));
var selectedOption = JSON.parse(localStorage.getItem('selectedOption'));
var selectedNumQuest = parseInt(JSON.parse(localStorage.getItem('selectedNumQuest')));
var questions = JSON.parse(localStorage.getItem('questions'));
var questionNumber = parseInt(JSON.parse(localStorage.getItem('questionNumber')));
var points = parseInt(JSON.parse(localStorage.getItem('points')));
var answersList = JSON.parse(localStorage.getItem('answersList'));
var quizPath = JSON.parse(localStorage.getItem('quizPath'));
var pointsGained;

if (jsonData) {
    const questions = jsonData["Questions"];
    const questionKeys = Object.keys(questions);

    if (selectedNumQuest < 20 ) {
        const numberOfProgressSections = selectedNumQuest;

        const progressSectionWidth = `${100 / numberOfProgressSections}%`;

        var secNumber = 0;

        questionKeys.forEach(key => {
            if (secNumber != selectedNumQuest) {
                const progressSection = document.createElement("div");
                progressSection.classList.add("progress-section");
                progressSection.style.width = progressSectionWidth;
                progressSection.dataset.value = secNumber;
                progressBarsContainer.appendChild(progressSection);
                secNumber+=1;
            }
        });
    } else {
        document.getElementById("progress-bars").style.display = "none";
        document.getElementById("progress-bar").style.display = "block";
    }
} else {
    console.log("La clé 'Questions' est absente ou vide dans le fichier JSON.");
}

if (selectedOption == "immediate") {
    document.getElementById("validate").style.display = "block";
}

displayQuestion();

function displayQuestion() {
    document.getElementsByClassName("answers")[0].innerHTML = '';

    document.getElementById("progress-bar-progress").style.width = (((questionNumber+1)*100)/selectedNumQuest) + "%";
    document.getElementById("progress-question").innerText = (questionNumber + 1) + "/" + selectedNumQuest;

    document.getElementsByClassName("question")[0].innerHTML = jsonData["Questions"][questions[questionNumber]]["Q"];
    const choices = jsonData["Questions"][questions[questionNumber]]["Choices"];
    var answersNumber = 0;
    var questionType = "";

    // if (jsonData["Questions"][questions[questionNumber]]["Answer"].constructor == Object) {
    //     questionType = "drag";
    // } else {
        answersNumber = jsonData["Questions"][questions[questionNumber]]["Answer"].length;
    // }

    document.getElementsByClassName("question-image")[0].src = "";

    const image = jsonData["Questions"][questions[questionNumber]]["Image"];

    if (image && image != "") {
        document.getElementsByClassName("question-image")[0].src = quizPath + jsonData["Questions"][questions[questionNumber]]["Image"];
    }

    var choicesList = [];

    while (choicesList.length < Object.keys(choices).length) {
        const randomChoiceNumber = "C" + (Math.floor(Math.random() * Object.keys(choices).length) + 1);
        if (!choicesList.includes(randomChoiceNumber.toString())) {
            choicesList.push(randomChoiceNumber.toString());
        }
    }

    for (const choice of choicesList) {
        const choiceValue = choices[choice];
        const questionChoice = document.createElement("input");
        questionChoice.type = (answersNumber >= 2) ? "checkbox" : "radio";
        if (questionChoice.type == "radio") {
            questionChoice.name = "radiochoice";
        }
        (answersNumber >= 2 ? questionChoice.classList.add("check") : "");
        questionChoice.classList.add("choice");
        questionChoice.value = choice;

        const label = document.createElement("label");
        label.innerHTML = " " + choiceValue;
        label.classList.add("choice");
        label.insertBefore(questionChoice, label.firstChild);
        document.getElementsByClassName("answers")[0].appendChild(label);
    }

    var checks = document.querySelectorAll(".check");
    var maxChecks = jsonData["Questions"][questions[questionNumber]]["Answer"].length;

    for (var i = 0; i < checks.length; i++) {
        checks[i].onclick = selectiveCheck;
    }

    const choiceInputs = document.querySelectorAll('input.choice');

    choiceInputs.forEach(input => {
        input.addEventListener('click', function() {
            var checkedChecks = document.querySelectorAll(".check:checked");
            if (this.type === 'radio') {
                choiceInputs.forEach(input => {
                    input.classList.remove('selected');
                });

                this.classList.add('selected');
            } else if (this.type === 'checkbox') {
                var checkedChecks = document.querySelectorAll(".check:checked");
                if (checkedChecks.length < maxChecks + 1) {
                    this.classList.toggle('selected');
                }
            }
            const selectedInputs = document.querySelectorAll('input.choice.selected');
            if (selectedInputs.length < maxChecks) {
                if (selectedOption == "real") {
                    document.getElementById("next").classList.add("disabled");
                } else {
                    document.getElementById("validate").classList.add("disabled");
                }
            } else {
                if (selectedOption == "real") {
                    document.getElementById("next").classList.remove("disabled");
                } else {
                    document.getElementById("validate").classList.remove("disabled");
                }
            }
        });
    });

    if (document.getElementById('progress-bars').style.display != "none") {
        document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "#2b2b2b";
    }

    const answerList = jsonData["Questions"][questions[questionNumber]]["Answer"];
    const explanation = jsonData["Questions"][questions[questionNumber]]["Expl"];
    const validate = document.getElementById('validate');

    validate.addEventListener('click', function() {
        validateAnswers();

        if (selectedOption == "immediate" && explanation && explanation != "") {
            document.getElementsByClassName("explanation")[0].innerHTML = "<b>Explication : </b>" + explanation;
            document.getElementsByClassName("explanation")[0].style.padding = "1rem";
            document.getElementsByClassName("explanation")[0].style.marginTop = "2rem";
            document.getElementsByClassName("explanation")[0].style.visibility = "visible";
            document.getElementsByClassName("explanation")[0].style.opacity = "1";
        }

        document.getElementById("validate").classList.add("disabled");
        document.getElementById("next").classList.remove("disabled");
        logAnswer();
    }, { once: true });



    const next = document.getElementById('next');

    if (questionNumber+1 == questions.length) {
        next.innerText = "Résultats";
    }

    next.addEventListener('click', function() {
        if (selectedOption == "real") {
            validateAnswers();
            logAnswer();
        }
        if (questionNumber+1 == questions.length) {
            if (selectedOption == "real" && document.getElementById('progress-bars').style.display != "none") {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "blue";
            }
            document.getElementsByClassName("explanation")[0].style.visibility = "hidden";
            document.getElementsByClassName("explanation")[0].style.opacity = "0";
            document.getElementsByClassName("explanation")[0].style.padding = "0";
            document.getElementsByClassName("explanation")[0].style.marginTop = "0";
            document.getElementById("next").classList.add("disabled");
            displayResults();
        } else {
            if (selectedOption == "real" && document.getElementById('progress-bars').style.display != "none") {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "blue";
            }
            questionNumber += 1;
            localStorage.setItem('questionNumber', JSON.stringify(questionNumber));
            document.getElementsByClassName("explanation")[0].style.visibility = "hidden";
            document.getElementsByClassName("explanation")[0].style.opacity = "0";
            document.getElementsByClassName("explanation")[0].style.padding = "0";
            document.getElementsByClassName("explanation")[0].style.marginTop = "0";
            document.getElementById("next").classList.add("disabled");
            displayQuestion();
        }
    }, { once: true });


    function validateAnswers() {
        const choiceInputs = document.querySelectorAll('input.choice');
        var pointsBefore = points;
        var pointsQuestion = 0;
        choiceInputs.forEach(input => {
            pointsGained = 1;
            input.disabled = true;
            const isSelected = input.classList.contains('selected');
            const isAnswer = answerList.includes(input.value);
            if (isAnswer) {
                input.parentElement.style.color = "green";
                input.parentElement.style.fontWeight = "650";
                if (!isSelected) {
                    pointsGained = 0;
                }
            } else {
                if (isSelected) {
                    input.parentElement.style.color = "red";
                }
                pointsGained = 0;
            }
            pointsQuestion += pointsGained;
        });
        if (pointsQuestion == answerList.length) {
            points += 1;
        }
        if (selectedOption === "immediate" && document.getElementById('progress-bars').style.display != "none") {
            if (points == (pointsBefore + 1)) {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "green";
            } else {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "red";
            }
        }
        localStorage.setItem('points', JSON.stringify(points));
    }

    function logAnswer() {
        var selectedAnswers = [];
        document.querySelectorAll('input.selected').forEach(selected => {
            selectedAnswers.push(selected.value);
        });
        answersList.push({
            "Id": questions[questionNumber],
            "Selected": selectedAnswers,
            "Correct": ((pointsGained == 1) ? true : false)
        });
        localStorage.setItem('answersList', JSON.stringify(answersList));
    }


    function selectiveCheck (event) {
        var checkedChecks = document.querySelectorAll(".check:checked");
        if (checkedChecks.length >= maxChecks + 1) {
            return false;
        }
    }
}

function displayResults() {
    document.getElementById('results-holder').style.display = 'block';
    document.getElementById('question-holder').style.display = 'none';
    document.getElementById('next-validate').style.display = 'none';
    document.getElementById('home').style.float = 'right';

    document.getElementById("result-percentage").innerText = Math.round((points*100) / selectedNumQuest) + "%";

    answersList.forEach(question => {
        
        const questionResult = document.createElement("div");
        questionResult.classList.add('question-result');
        questionResult.id = question["Id"] + "-holder";

        document.getElementById("results-holder").appendChild(questionResult);

        const image = jsonData["Questions"][question["Id"]]["Image"];
        
        if (image && image != "") {
            const questionResultImage = document.createElement("img");
            questionResultImage.src = quizPath + image;
            questionResultImage.classList.add("question-image");

            document.getElementById(question["Id"] + "-holder").appendChild(questionResultImage);
        }

        const questionResultQuestion = document.createElement("p");
        questionResultQuestion.innerHTML = jsonData["Questions"][question["Id"]]["Q"];
        questionResultQuestion.classList.add("question");

        document.getElementById(question["Id"] + "-holder").appendChild(questionResultQuestion);

        const questionResultAnswer = document.createElement("div");
        questionResultAnswer.id = question["Id"] + "-answers";
        questionResultAnswer.classList.add("answers");

        document.getElementById(question["Id"] + "-holder").appendChild(questionResultAnswer);

        const answerList = jsonData["Questions"][question["Id"]]["Answer"];
        const choices = jsonData["Questions"][question["Id"]]["Choices"];
        const choicesKeys = Object.keys(jsonData["Questions"][question["Id"]]["Choices"]);
        for (const choice of choicesKeys) {
            const choiceValue = choices[choice];
            const questionChoice = document.createElement("input");
            const isAnswer = answerList.includes(choice);
            const isSelected = question["Selected"].includes(choice);
            questionChoice.type = (answerList.length >= 2 ? "checkbox" : "radio");
            questionChoice.disabled = true;

            const label = document.createElement("label");
            label.innerHTML = " " + choiceValue;

            if (isSelected) {
                questionChoice.checked = true;
                if (isAnswer) {
                    label.style.color = "green";
                    label.style.fontWeight = "650";
                } else {
                    label.style.color = "red";
                }
            } else if (isAnswer) {
                label.style.color = "green";
                label.style.fontWeight = "650";
            }

            label.insertBefore(questionChoice, label.firstChild);

            document.getElementById(question["Id"] + "-answers").appendChild(label);
        }

        const explanation = jsonData["Questions"][question["Id"]]["Expl"];
        if (explanation && explanation != "") {
            const questionResultExpl = document.createElement("div");
            questionResultExpl.classList.add("explanation");
            questionResultExpl.innerHTML = "<b>Explication : </b>" + explanation;
            questionResultExpl.style.visibility = "visible";
            questionResultExpl.style.opacity = "1";
            questionResultExpl.style.padding = "1rem";
            questionResultExpl.style.marginTop = "2rem";

            document.getElementById(question["Id"] + "-holder").appendChild(questionResultExpl);
        }
    });

    document.body.scrollTop = document.documentElement.scrollTop = 0;
}


function returnhome() {
    window.location.href = "../index.html";
}