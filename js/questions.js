
const progressBarsContainer = document.getElementById("progress-bars");

progressBarsContainer.innerHTML = "";

var jsonData = JSON.parse(localStorage.getItem('jsonData'));
var selectedOption = JSON.parse(localStorage.getItem('selectedOption'));

if (jsonData) {
    const questions = jsonData["Questions"];
    const questionKeys = Object.keys(questions);

    const numberOfProgressSections = questionKeys.length;

    const progressSectionWidth = `${100 / numberOfProgressSections}%`;

    console.log(progressSectionWidth);

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

function returnhome() {
    window.location.href = "../index.html";
}



function displayQuestion() {

}