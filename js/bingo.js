let cell = document.getElementsByClassName("table-cell");
let cells = [...cell];
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
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = squares[i]["list"] == "trueList" ? trueList[squares[i]["list_id"]] : falseList[squares[i]["list_id"]];
    }
}

// remove all exisiting classes from each card
//cards[i].classList.remove("show", "open", "match", "disabled");
// attach corresponding item to each square


// @description toggles open and show class to display cards
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
};


// @description disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}


// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    //if (matchedCard.length == 16) {
    // show congratulations modal
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
    cell.addEventListener("click", displayCard);
    cell.addEventListener("click", cardOpen);
    cell.addEventListener("click", congratulations);
};
