
const progressBarsContainer = document.getElementById("progress-bars");

progressBarsContainer.innerHTML = "";

var jsonData = JSON.parse(localStorage.getItem('jsonData'));
var selectedOption = JSON.parse(localStorage.getItem('selectedOption'));
var selectedNumQuest = parseInt(JSON.parse(localStorage.getItem('selectedNumQuest')));
var questions = [];

if (jsonData) {
    const questions = jsonData["Questions"];
    const questionKeys = Object.keys(questions);

    const numberOfProgressSections = questionKeys.length;

    const progressSectionWidth = `${100 / numberOfProgressSections}%`;

    questionKeys.forEach(key => {
        const progressSection = document.createElement("div");
        progressSection.classList.add("progress-section");
        progressSection.style.width = progressSectionWidth;
        // Vous pouvez ajouter d'autres propriétés ou du contenu à chaque section de progression si nécessaire
        // progressSection.textContent = key; // par exemple, utiliser la clé comme texte
        progressBarsContainer.appendChild(progressSection);
    });
} else {
    // La clé "Questions" est absente dans jsonData ou est vide, vous pouvez gérer cela ici
    console.log("La clé 'Questions' est absente ou vide dans le fichier JSON.");
}


if (selectedOption == "immediate") {
    document.getElementById("validate").style.display = "block";
}

selectQuestions();

displayQuestion();

function selectQuestions() {
    while (questions.length < selectedNumQuest) {
        const randomQuestionNumber = Math.floor(Math.random() * Object.keys(jsonData.Questions).length) + 1;
        if (!questions.includes(randomQuestionNumber.toString())) {
            questions.push(randomQuestionNumber.toString());
        }
    }
}

function displayQuestion() {
    document.getElementById("answers").innerHTML = '';

    console.log(questions);
    document.getElementById("question").innerText = jsonData["Questions"][questions[0]]["Q"];
    console.log(jsonData["Questions"][questions[0]]["Choices"]);
    const choices = jsonData["Questions"][questions[0]]["Choices"];
    const choicesKeys = Object.keys(jsonData["Questions"][questions[0]]["Choices"]);
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
}

var checks = document.querySelectorAll(".check");
var maxChecks = jsonData["Questions"][questions[0]]["Answer"].length;

for (var i = 0; i < checks.length; i++) {
    checks[i].onclick = selectiveCheck;
}

function selectiveCheck (event) {
    var checkedChecks = document.querySelectorAll(".check:checked");
    if (checkedChecks.length >= maxChecks + 1)
        return false;
}







function returnhome() {
    window.location.href = "../index.html";
}