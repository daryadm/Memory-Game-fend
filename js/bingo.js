let cell = document.getElementsByClassName("table-cell");
let cells = [...cell];
let openedTrueCards = [];
const trueList = ["регрессивный гипноз", "аутогенная тренировка", "контакт с внеземными цивилизациями",
    "молитва и пост", "религиозная терапия", "парные танцы", "инсулинокоматозная терапия", "лагеря конверсионной терапии",
    "гипноз", "сексуализированное насилие", "психоанализ", "снятие порчи", "изгнание джиннов", "заговоры",
    "свингерский секс", "обращение к «Высшему Я»", "отчитка", "мастурбация", "причастие", "просмотр гетеро порнофильмов",
    "антидепрессанты", "«женское обрезание»", "групповая психотерапия", "трудотерапия", "чтение книги «Мужчины с Марса, женщины с Венеры»",
    "нейролептики"
];

const falseList = ["прослушивание гимна РФ", "иппотерапия", "лоботомия", "наркотические вещества",
    "фунготерапия", "электросудорожная терапия", "гормонотерапия", "общение с душами ушедших", "кастрация",
    "лобная лейкотомия", "езда на велосипеде", "аверсивная терапия", "беременность и роды", "приложение подорожника", "концентрационные лагеря",
    "специальная диета", "музыкотерапия", "расслабляющие ванны", "ректальные свечи", "имплантация яичек трупов", "курсы этического развития от Мизулиной",
    "удерживающая терапия"
];

const deck = document.getElementsByClassName("deck");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("popup1")

function chooseRandomIndices(array, numberOfChosen) {
    let randomIndices = [];
    while (randomIndices.length < numberOfChosen) {
        randomIndex = Math.floor(Math.random() * array.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }
    return randomIndices;
}

function formPracticeObj(list, listName) {
    let listOfPractices = [];
    list.forEach(function (item) {
        let practiceObj = {};
        practiceObj.list_id = item;
        practiceObj.list = listName;
        listOfPractices.push(practiceObj);
    })
    return listOfPractices;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

document.body.onload = startGame();

// @description function to start a new play 
function startGame() {
    let daIds = chooseRandomIndices(trueList, 3);
    let netIds = chooseRandomIndices(falseList, 6);
    let daObjs = formPracticeObj(daIds, "trueList");
    let netObjs = formPracticeObj(netIds, "falseList");
    let all = daObjs.concat(netObjs);
    squares = shuffle(all);
    openedTrueCards = [];
    for (let i = 0; i < cells.length; i++) {
        cells[i].parentElement.parentElement.parentElement.classList.remove("da", "net", "disabled");
        cells[i].innerText = squares[i]["list"] == "trueList" ? trueList[squares[i]["list_id"]] : falseList[squares[i]["list_id"]];
    }
}

// @description toggles open and show class to display cards
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to openedTrueCards list and check if cards are match or not
function cardCheck() {
    if (squares[this.id].list == "trueList") {
        this.parentElement.parentElement.parentElement.classList.add("da");
        this.parentElement.parentElement.parentElement.classList.add("disabled");
        if (!openedTrueCards.includes(this.id)) {
            openedTrueCards.push(this.id);
        }
        let len = openedTrueCards.length;
        if (len == 3) {
            congratulations();
        }
    } else {
        this.parentElement.parentElement.parentElement.classList.add("net");
    }
};

function congratulations() {
    modal.classList.add("show");
    //closeicon on modal
    closeModal();
    //};
}

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain() {
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cells.length; i++) {
    cell = cells[i];
    //cell.addEventListener("click", displayCard);
    cell.addEventListener("click", cardCheck);
    //cell.addEventListener("click", congratulations);
};
