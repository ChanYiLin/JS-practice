window.onload = function () {
    init();
}


var body = document.querySelector("body");
var cardsDisplay = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");

var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");

var gameOver = false;
var numCards = 8;
var finishCondition = 4;
var pairs = []
var colors = []
var cardsObjects = [];

var phase = 0; // 0: select 1 card, 1: select 2 cards, will turn to 0 right immediately
var current_color;
var current_index;

class Card {
    constructor(color) {
        this.defaultColor = '#FFF'
        this.cardColor = color;
        this.clicked = false;
        this.paired = false;
    }
}

function init() {
    reset() // reset all other game parameter
    initCard() // init cards' click function
    easyButton.classList.add('selected');
}


function reset() {
    gameOver = false;
    cardsObjects = []
    generateRadomPairs();
    colors = generateRandomColors(numCards)
    for (let i = 0; i < numCards; i++) {
        cardTemp = new Card('#FFF');
        cardsObjects.push(cardTemp);
    }
    for (let i = 0; i < pairs.length; i++) {
        console.log(pairs[i][0], pairs[i][1])
        cardsObjects[pairs[i][0]].cardColor = colors[i];
        cardsObjects[pairs[i][1]].cardColor = colors[i];

        cardsDisplay[pairs[i][0]].style.opacity = 1;
        cardsDisplay[pairs[i][1]].style.opacity = 1;
        cardsDisplay[pairs[i][0]].style.backgroundColor = '#FFF';
        cardsDisplay[pairs[i][1]].style.backgroundColor = '#FFF';
    }

    resetDisplay.textContent = "New Game"
    messageDisplay.textContent = "Pair all the colors!";
    finishCondition = numCards / 2
    body.style.backgroundColor = "#232323";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initCard() {
    for (let i = 0; i < cardsDisplay.length; i++) {
        cardsDisplay[i].addEventListener('click', function () {
            if (gameOver) {
                return;
            }
            if (cardsObjects[i].clicked === true || cardsObjects[i].paired === true) {
                return;
            } else if (phase == 0) {
                // 0. set the phase to 1, 
                // 1. set the card to its color, 
                // 2. set the card object's cliked to true, 
                // 3. record the card's color and index
                phase = 1
                cardsDisplay[i].style.backgroundColor = cardsObjects[i].cardColor;
                cardsObjects[i].clicked = true;
                current_color = cardsObjects[i].cardColor;
                current_index = i
            } else {
                // 0. set the phase to 0,
                // 1. set the card to its color,
                // 2. set the card object's cliked to true,
                // 3. compare the color of selected card and the current color.
                cardsDisplay[i].style.backgroundColor = cardsObjects[i].cardColor;
                cardsObjects[i].clicked = true;

                picked_color = cardsObjects[i].cardColor;

                if (picked_color == current_color) {
                    cardsObjects[current_index].paired = true;
                    cardsObjects[i].paired = true;

                    cardsDisplay[current_index].style.backgroundColor = cardsObjects[current_index].cardColor;
                    cardsDisplay[i].style.backgroundColor = cardsObjects[i].cardColor;

                    async function wait() {
                        await sleep(500);
                        cardsDisplay[current_index].style.opacity = 0;
                        cardsDisplay[i].style.opacity = 0;

                        finishCondition -= 1;

                        if (finishCondition == 0) {
                            gameOver = true;
                            messageDisplay.textContent = "Correct!";
                            resetDisplay.textContent = "Play Again"
                        }
                        phase = 0
                    }
                    wait()


                } else {
                    cardsObjects[i].clicked = true;
                    cardsDisplay[i].style.backgroundColor = cardsObjects[i].cardColor;

                    async function wait() {
                        await sleep(500);
                        cardsDisplay[current_index].style.backgroundColor = cardsObjects[current_index].defaultColor;
                        cardsDisplay[i].style.backgroundColor = cardsObjects[i].defaultColor;

                        cardsObjects[current_index].clicked = false;
                        cardsObjects[i].clicked = false;
                        phase = 0
                    }
                    wait()
                }
            }
        })
    }
}


resetButton.addEventListener("click", function () {
    reset();
})


function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
    var arr = []
    for (var i = 0; i < pairs.length; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function generateRadomPairs() {
    pairs = []
    var indexList = [] //generate a list of index, e.g: [0,1,2,3] 
    for (let i = 0; i < numCards; i++) {
        indexList.push(i);
    }

    function popRandom(lst) { //pop the index from the index[]
        radomIdx = Math.floor(Math.random() * indexList.length);
        console.log(radomIdx)
        return lst.splice(radomIdx, 1)
    }

    while (indexList.length > 0) {
        console.log(indexList)
        idx1 = popRandom(indexList)
        idx2 = popRandom(indexList)
        pairs.push([idx1, idx2])
    }
    console.log(pairs)
}



