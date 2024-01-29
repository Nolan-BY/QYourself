
const progressBarsContainer = document.getElementById("progress-bars");

progressBarsContainer.innerHTML = "";

var jsonData = JSON.parse(localStorage.getItem('jsonData'));
var selectedOption = JSON.parse(localStorage.getItem('selectedOption'));
var selectedNumQuest = parseInt(JSON.parse(localStorage.getItem('selectedNumQuest')));
var questions = JSON.parse(localStorage.getItem('questions'));
var questionNumber = parseInt(JSON.parse(localStorage.getItem('questionNumber')));
var points = parseInt(JSON.parse(localStorage.getItem('points')));
var answersList = JSON.parse(localStorage.getItem('answersList'));
var pointsGained;

if (jsonData) {
    const questions = jsonData["Questions"];
    const questionKeys = Object.keys(questions);

    const numberOfProgressSections = questionKeys.length;

    const progressSectionWidth = `${100 / numberOfProgressSections}%`;

    var secNumber = 0;

    questionKeys.forEach(key => {
        const progressSection = document.createElement("div");
        progressSection.classList.add("progress-section");
        progressSection.style.width = progressSectionWidth;
        progressSection.dataset.value = secNumber;
        // Vous pouvez ajouter d'autres propriétés ou du contenu à chaque section de progression si nécessaire
        // progressSection.textContent = key; // par exemple, utiliser la clé comme texte
        progressBarsContainer.appendChild(progressSection);
        secNumber+=1;
    });
} else {
    // La clé "Questions" est absente dans jsonData ou est vide, vous pouvez gérer cela ici
    console.log("La clé 'Questions' est absente ou vide dans le fichier JSON.");
}

if (selectedOption == "immediate") {
    document.getElementById("validate").style.display = "block";
}

displayQuestion();

function displayQuestion() {
    document.getElementById("answers").innerHTML = '';

    document.getElementById("question").innerText = jsonData["Questions"][questions[questionNumber]]["Q"];
    const choices = jsonData["Questions"][questions[questionNumber]]["Choices"];
    const choicesKeys = Object.keys(jsonData["Questions"][questions[questionNumber]]["Choices"]);
    for (const choice of choicesKeys) {
        const choiceValue = choices[choice];
        const questionChoice = document.createElement("input");
        questionChoice.type = (choicesKeys.length >= 2 ? "checkbox" : "radio");
        questionChoice.classList.add(choicesKeys.length >= 2 ? "check" : "");
        questionChoice.classList.add("choice");
        questionChoice.value = choice;

        // Créer un label autour de l'input
        const label = document.createElement("label");
        label.textContent = choiceValue;
        label.classList.add("choice");
        label.insertBefore(questionChoice, label.firstChild);
        document.getElementById("answers").appendChild(label);
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
            if (checkedChecks.length < maxChecks + 1) {
                this.classList.toggle('selected');
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

    document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "#2b2b2b";

    const answerList = jsonData["Questions"][questions[questionNumber]]["Answer"];
    const explanation = jsonData["Questions"][questions[questionNumber]]["Expl"];
    const validate = document.getElementById('validate');

    validate.addEventListener('click', function() {
        const choiceInputs = document.querySelectorAll('input.choice');
        pointsGained = 1;
        choiceInputs.forEach(input => {
            input.disabled = true;
            const isSelected = input.classList.contains('selected');
            const isAnswer = answerList.includes(input.value);
            if (selectedOption == "immediate") {
                if (isAnswer) {
                    input.parentElement.style.color = "green";
                    input.parentElement.style.fontWeight = "650";
                } else if (isSelected) {
                    input.parentElement.style.color = "red";
                    pointsGained-=1;
                }
            }
            points += pointsGained;
            if (selectedOption === "immediate") {
                if (pointsGained == 1) {
                    document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "green";
                } else {
                    document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "red";
                }
            }
        });

        if (selectedOption == "immediate") {
            document.getElementById("explanation").innerHTML = "<b>Explication : </b>" + explanation;
            document.getElementById("explanation").style.display = "block";
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
            logAnswer();
        }
        if (questionNumber+1 == questions.length) {
            if (selectedOption == "real") {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "blue";
            }
            document.getElementById("explanation").style.display = "none";
            document.getElementById("next").classList.add("disabled");
            displayResults();
        } else {
            if (selectedOption == "real") {
                document.getElementsByClassName('progress-section')[questionNumber].style.backgroundColor = "blue";
            }
            questionNumber += 1;
            localStorage.setItem('questionNumber', JSON.stringify(questionNumber));
            document.getElementById("explanation").style.display = "none";
            document.getElementById("next").classList.add("disabled");
            displayQuestion();
        }
        localStorage.setItem('points', JSON.stringify(points));
    }, { once: true });


    function logAnswer() {
        var selectedAnswers = [];
        document.querySelectorAll('input.selected').forEach(selected => {
            selectedAnswers.push(selected.value);
        });
        answersList.push({
            "Q": questions[questionNumber],
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
    console.log("results");
}


document.getElementById("home").addEventListener('click', function() {
    window.location.href = "../index.html";
});