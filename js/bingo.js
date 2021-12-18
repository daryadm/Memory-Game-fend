// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
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

// deck of all cards in game
const deck = document.getElementById("card-deck");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// array for opened cards
var openedCards = [];

function chooseRandomIndices(array, numberOfChosen) {
    let randomIndices = [];
    while (randomIndices.length < numberOfChosen) {
        randomIndex = Math.floor(Math.random() * array.length + 1);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }
    return randomIndices;
}

let daIds = chooseRandomIndices(trueList, 3);
let netIds = chooseRandomIndices(falseList, 6);




// @description shuffles cards
// @param {array}
// @returns shuffledarray
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


// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play 
function startGame() {

    // empty the openCards array
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}


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
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}


// @desciption for user to play Again 
function playAgain() {
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};
