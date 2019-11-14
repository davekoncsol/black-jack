///*----- constants -----*/
let scores, money, bet;
scores = {
    player: 0,
    dealer: 0
}
let playerCards = {
    card1: 'back-blue',
    card2: 'back-blue',
}

let dealerCards = {
    card1: 'back-red',
    card2: 'back-red',
}
let idx = 3;
let cardPosition = 0;
let dealeridx = 3;
let canHit = false;
let deal = true;
let winner = false;
let placeBet = true;
var newdeck = [];
let suits = ['s', 'h', 'c', 'd'];
let values = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02'];
var templateDealer = ``;
var templatePlayer = ``;

createDeck();

function createDeck() {
    var deck = new Array;
    for (var s = 0; s < suits.length; s++) {
        for (var v = 0; v < values.length; v++) {
            var card = {
                suit: suits[s],
                value: values[v]
            };
            deck.push(card);
        }
    }

    newdeck = deck
};

/*----- app's state (variables) -----*/

// money, player/dealer info, winner,
// card values

let playerHand = [];
let dealerHand = [];

/*----- cached element references -----*/

const scoreEl = {
    player: document.getElementById('pscore'),
    dealer: document.getElementById('dscore')
}

const cardEl = {
    player: document.getElementById('player-box'),
    dealer: document.getElementById('dealer-box'),

}

const betEl = document.getElementById('bet');
const moneyEl = document.getElementById('money');
const messageEl = document.getElementById('message');
const startEl = document.getElementById('start')
const hitEl = document.getElementById('hit')
const fiveEl = document.getElementById('five')
const tenEl = document.getElementById('ten')
const twentyEl = document.getElementById('twenty')
const nextEl = document.getElementById('next')
const dealEl = document.getElementById('deal')
const stayButton = document.getElementById('stay');

/*----- event listeners -----*/


stayButton.addEventListener('click', stay);
hitEl.addEventListener('click', hit);
startEl.addEventListener('click', start);
nextEl.addEventListener('click', nextRound);
dealEl.addEventListener('click', dealCards);
fiveEl.addEventListener('click', bet5);
tenEl.addEventListener('click', bet10);
twentyEl.addEventListener('click', bet20);

/*----- functions -----*/

//initialize

init();

function init() {
    money = 100;
    bet = 0;
    render();
}

function getPlayerScore() {
    scores.player = 0;
    for (let card in playerCards) {
        if (playerCards[card].length === 3) {
            scores.player += parseInt(playerCards[card].slice(1));
        } else if (playerCards[card].length < 3 && !playerCards[card].includes('A')) {
            scores.player += 10;
        } else if (playerCards[card].includes('A')) {
            if (scores.player <= 10) {
                scores.player += 11;
            } else scores.player += 1;
        }
    }
    if ((playerCards.card1.includes('A') && scores.player > 21) || (playerCards.card2.includes('A') && scores.player > 21)) {
        scores.player -= 10;
    }
};

function getDealerScore() {
    scores.dealer = 0;
    for (let card in dealerCards) {
        if (dealerCards[card].length === 3) {
            scores.dealer += parseInt(dealerCards[card].slice(1));
        } else if (dealerCards[card].length < 3 && !dealerCards[card].includes('A')) {
            scores.dealer += 10;
        } else if (dealerCards[card].includes('A')) {
            if (scores.dealer <= 10) {
                scores.dealer += 11;
            } else scores.dealer += 1
        };
    }
    if ((dealerCards.card1.includes('A') && scores.dealer > 21) || (dealerCards.card2.includes('A') && scores.dealer > 21)) {
        scores.dealer -= 10;
    }
};

//render
//shows the results as well as the bet and money in the bank
function render() {
    moneyEl.textContent = `Money = $${money}`;
    betEl.textContent = `Bet = $${bet}`;
    scoreEl.dealer.textContent = `DEALER SCORE ${scores.dealer}`
    scoreEl.player.textContent = `PLAYER SCORE ${scores.player}`
    cardEl.player.innerHTML = `<div class="card shadow ${playerCards.card1}" id="pcard1"><img></div> 
    <div class="card shadow ${playerCards.card2}" id="pcard2"><img></div> ` + templatePlayer;
    cardEl.dealer.innerHTML = `<div class="card shadow ${dealerCards.card1}" id="dcard1"><img></div> 
    <div class="card shadow ${dealerCards.card2}" id="dcard2"><img></div>` + templateDealer;
    if (bet != 0) {
        startEl.style.display = 'flex'
        messageEl.textContent = 'Good Luck'
    } else {
        startEl.style.display = 'none';
        messageEl.textContent = 'Place a bet to start'
    }
    placeBet === false ? fiveEl.style.display = 'none' : fiveEl.style.display = 'flex';
    placeBet === false ? tenEl.style.display = 'none' : tenEl.style.display = 'flex';
    placeBet === false ? twentyEl.style.display = 'none' : twentyEl.style.display = 'flex';
    canHit === false ? hitEl.style.display = 'none' : hitEl.style.display = 'flex';
    canHit === true && winner === false ? stayButton.style.display = 'flex' : stayButton.style.display = 'none';
    winner === true ? nextEl.style.display = 'flex' : nextEl.style.display = 'none';
    deal === true && bet > 0 ? dealEl.style.display = 'flex' : dealEl.style.display = 'none';
};
//winner
//identifies winner is dealer or player
//if dealer wins, players loses money, if player wins, player wins money

function getWinner() {
    if (scores.dealer === 21) {
        loser();
    } else if (scores.player === 21) {
        chickenDinner();
    } else if (scores.player > 21) {
        messageEl.textContent = 'Bust!'
        loser();
    }
}


function bet5() {
    while (placeBet === true) {
        if (money >= 5) {
            bet += 5;
            money -= 5;
            render();
        }
        return;
    }
    return
}

function bet10() {
    while (placeBet === true) {
        if (money >= 10) {
            bet += 10;
            money -= 10;
            render();
        }
        return;
    }
    return
}

function bet20() {
    while (placeBet === true) {
        if (money >= 20) {
            bet += 20;
            money -= 20;
            render();
        }
        return;
    }
    return
}


function chickenDinner() {
    money += bet * 2;
    winner = true;
    canHit = false;
    bet = 0;
    render();
    messageEl.textContent = 'WINNER WINNER CHICKEN DINNER';

}

function loser() {
    bet = 0;
    winner = true;
    canHit = false;
    messageEl.textContent = 'You lose';
    render();
    if (money === 0) {
        document.querySelector('body').innerHTML = `<h1>You LOST EVERYTHING!</h1>`

    };

}

function dealerAction() {
    if (scores.dealer > scores.player) {
        loser();
    }
    while (winner === false && scores.dealer < 17 && scores.dealer < scores.player) {
        dealerHit();
    }
    if (scores.dealer === 21) {
        loser();
    } else if (scores.dealer > 21) {
        chickenDinner();

    } else if (scores.dealer >= 17 && scores.dealer < scores.player) {
        chickenDinner();

    } else {
        loser();
    }

}

//player hit/stay

function stay() {
    if (canHit === true && winner === false) {
        dealerCards.card2 = dealerHand[1 + cardPosition].suit + dealerHand[1 + cardPosition].value;
        getDealerScore();
        render();
        dealerAction();
    }
    return
}

function hit() {
    if (canHit === true) {
        idx = Math.floor(Math.random() * 26);
        playerCards['card' + idx] = playerHand[idx].suit + playerHand[idx].value;
        templatePlayer += `<div class="card shadow ${playerCards['card'+idx]}" id="pcard2"><img></div>`
        getPlayerScore();
        render();
        getWinner();
    }
    return
}

function dealerHit() {
    dealerCards['card' + dealeridx] = dealerHand[dealeridx].suit + dealerHand[dealeridx].value;
    templateDealer += `<div class="card shadow ${dealerCards['card'+dealeridx.toString()]}" id="dcard2"><img></div>`
    dealeridx += 1;
    getDealerScore();
    render();
    getWinner();

};

function start() {
    shuffle(newdeck);
    if (playerHand.length < 10) {
        for (i = 0; i <= 25; i++) {
            playerHand.push(newdeck[i]);
        }
        for (i = 26; i <= 51; i++) {
            dealerHand.push(newdeck[i]);
        }
    } else {
        return
    }
    placeBet = false;
    dealCards();
    deal = false;
    startEl.style.display = 'none';
    render();
    getWinner();

}

function shuffle() {
    newdeck.sort(() => Math.random() - 0.5);

}


function dealCards() {
    if (deal === true) {
        playerCards.card1 = playerHand[0 + cardPosition].suit + playerHand[0 + cardPosition].value;
        playerCards.card2 = playerHand[1 + cardPosition].suit + playerHand[1 + cardPosition].value;
        dealerCards.card1 = dealerHand[0 + cardPosition].suit + dealerHand[0 + cardPosition].value;
        cardPosition += 1;
        placeBet = false;
        canHit = true;
        deal = false;
        getDealerScore();
        getPlayerScore();

        render();
    } else return
}

function nextRound() {
    while (winner === false) {
        return;
    }
    winner = false;
    scores.player = 0;
    scores.dealer = 0;
    templateDealer = ``;
    templatePlayer = ``;
    playerCards = {
        card1: 'back-blue',
        card2: 'back-blue',
    }

    dealerCards = {
        card1: 'back-red',
        card2: 'back-red',
    }
    placeBet = true;
    deal = true;
    render();
}