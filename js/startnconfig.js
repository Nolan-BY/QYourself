
var jsonData;
var selectedOption = "select";
var selectedNumQuest = "select";
var error;

const dropArea = document.getElementById('drop-area');

// Drop JSON file //

// Prevent default behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when file is dragged over
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Handle click to select files
dropArea.addEventListener('click', handleClick, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    const jsonFiles = [...files].filter(file => file.type === 'application/json');

    if (jsonFiles.length > 0) {
        handleFiles(jsonFiles);
        document.getElementById('drop-error').style.display = "none";
        error = 0;
    } else {
        error = 1;
        document.getElementById("drop-error").text = "Seuls les fichiers JSON au bon format sont acceptés !"
        document.getElementById('drop-error').style.display = "block";
    }
}

function handleClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    fileInput.click();
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
    const reader = new FileReader();

    reader.readAsText(file, 'UTF-8');

    reader.onload = function (event) {
        jsonData = event.target.result;
        dropArea.querySelector('#file-select-title').textContent = file.name;
        jsonData = JSON.parse(jsonData);
        if (jsonData["Questions"] == null) {
            error = 1;
            document.getElementById("drop-error").text = "Le format du fichier JSON est invalide !"
            document.getElementById("drop-error").style.display = "block";
        } else {
            document.getElementById("drop-error").style.display = "none";
            error = 0;
        }
        canStart();
    };

    reader.onerror = function (event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };
}



// Start //

var selectCat = document.getElementsByName('category')[0];

selectCat.addEventListener('change', function() {
    selectedOption = selectCat.options[selectCat.selectedIndex].value;
    canStart();
});


var selectNumQuest = document.getElementsByName("number-questions-select")[0];

selectNumQuest.addEventListener('change', function() {
    selectedNumQuest = selectNumQuest.options[selectNumQuest.selectedIndex].value;
    canStart();
});


function canStart() {
    if (jsonData && error == 0) {
        if (selectedOption == "select") {
            document.getElementById("start").classList.add("disabled");
        } else {
            if (Object.keys(jsonData["Questions"]).length > 5) {
                for (let number = 10; number < Object.keys(jsonData["Questions"]).length;) {
                    const questionNumberOption = document.createElement("option");
                    questionNumberOption.value = number;
                    questionNumberOption.text = number;
                    document.getElementsByName("number-questions-select")[0].appendChild(questionNumberOption)
                    number+=10;
                }
                const questionNumberOption = document.createElement("option");
                questionNumberOption.value = "all";
                questionNumberOption.text = "Toutes";
                document.getElementsByName("number-questions-select")[0].appendChild(questionNumberOption)
                document.getElementById("number-questions").style.display = "block";
            } else {
                document.getElementById("start").classList.remove("disabled");
            }
            if (selectedNumQuest != "select") {
                document.getElementById("start").classList.remove("disabled");
            } else {
                document.getElementById("start").classList.add("disabled");
            }
        }
    }
}


document.getElementById("start").addEventListener('click', startGame, false);

function startGame() {
    localStorage.setItem('jsonData', JSON.stringify(jsonData));
    localStorage.setItem('selectedOption', JSON.stringify(selectedOption));
    window.location.href = "./page/question.html";
}