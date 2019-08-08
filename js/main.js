///*----- constants -----*/

//sounds
let scores, money, bet;

let placeBet = true;

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
let cardPosition =0;
let dealeridx = 3;
let canHit = false;
let deal = true;
let winner = false;

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

let usedCards = [];


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




/*----- event listeners -----*/

//start- click

document.getElementById('stay').addEventListener('click', stay);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('start').addEventListener('click', start);
document.getElementById('next').addEventListener('click', nextRound);
document.getElementById('deal').addEventListener('click', dealCards);

//bet - click
document.getElementById('5').addEventListener('click', bet5);
document.getElementById('10').addEventListener('click', bet10);
document.getElementById('20').addEventListener('click', bet20);

//reset - click

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
            if (scores.player <= 10){
            scores.player += 11;
            } else  scores.player += 1;       
    

        };
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
            if(scores.dealer <= 10){
            scores.dealer += 11;
            } else  scores.dealer += 1
        };
    }
};

//render
//shows the results as well as the bet and money in the bank
function render() {
    moneyEl.textContent = `Money = $${money}`;
    betEl.textContent = `Bet = $${bet}`;

    scoreEl.dealer.textContent = `Dealer Number ${scores.dealer}`
    scoreEl.player.textContent = `Player Number ${scores.player}`
    cardEl.player.innerHTML = `<div class="card shadow ${playerCards.card1}" id="pcard1"><img></div> 
    <div class="card shadow ${playerCards.card2}" id="pcard2"><img></div> ` + templatePlayer;
    cardEl.dealer.innerHTML = `<div class="card shadow ${dealerCards.card1}" id="dcard1"><img></div> 
    <div class="card shadow ${dealerCards.card2}" id="dcard2"><img></div>` + templateDealer;


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
        loser();
        alert('BUUUUUUSSST');
    }
}

//start
//the bet is set let the game BEGIN!
//bet
//allows user to place bet
function bet5() {
    console.log('bet 5!!')
    while(placeBet === true){
    if (money >= 5) {
        bet += 5;
        money -= 5;
        render();
    }
    return;
} return}

function bet10() {
    console.log('bet 10 clicked')
    while(placeBet === true){
    if (money >= 10) {
        bet += 10;
        money -= 10;
        render();
    }
    return;
} return}

function bet20() {
    console.log('bet 20 clicked')
    while(placeBet === true){
    if (money >= 20) {
        bet += 20;
        money -= 20;
        render();
    }
    return;
} return}


function chickenDinner() {
    money += bet * 2;
    winner = true;
    canHit = false;
    bet = 0;
    render();
    alert('WINNER WINNER CHICKEN DINNER');

}

function loser() {
    bet = 0;
    winner = true;
    canHit = false;
    render();
    alert('Casinos werent built on winners!');
}

function dealerAction() {
    if (scores.dealer > scores.player) {
        loser();
    }
    while (winner === false && scores.dealer < 17) {
        dealerHit();
    }
     if (scores.dealer === 21) {
        loser();
    } else if (scores.dealer > 21) {
        chickenDinner();

    }  else if (scores.dealer >= 17 && scores.dealer < scores.player) {
        chickenDinner();

    } else {
        loser();
    }

}

//player hit/stay

function stay() {
    console.log('stay then the dealer goes. ');
    if(canHit === true){
    dealerAction();
} return}

function hit() {
    if(canHit === true){
    playerCards['card' + idx] = playerHand[idx].suit + playerHand[idx].value;
    templatePlayer += `<div class="card shadow ${playerCards['card'+idx]}" id="pcard2"><img></div>`
    console.log(templatePlayer);
    idx += 1;

    console.log(idx);
    getPlayerScore();
    render();
    getWinner();
} return}

function dealerHit() {

    dealerCards['card' + dealeridx] = dealerHand[dealeridx].suit + dealerHand[dealeridx].value;
    templateDealer += `<div class="card shadow ${dealerCards['card'+dealeridx.toString()]}" id="dcard2"><img></div>`
    console.log(templateDealer);
    dealeridx += 1;

    console.log(idx);
    getDealerScore();
    render();
    getWinner();

};

function start() {
    shuffle(newdeck);
    if (playerHand.length < 10) {
        for (i = 0; i <= 25; i++) {
            // console.log(newdeck[i]);
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
    render();
    getWinner();

}

function shuffle() {
    newdeck.sort(() => Math.random() - 0.5);

}


function dealCards() {
    if(deal === true){
    playerCards.card1 = playerHand[0 + cardPosition].suit + playerHand[0 + cardPosition].value;
    playerCards.card2 = playerHand[1 + cardPosition].suit + playerHand[1 + cardPosition].value;
    dealerCards.card1 = dealerHand[0 + cardPosition].suit + dealerHand[0 + cardPosition].value;
    dealerCards.card2 = dealerHand[1 + cardPosition].suit + dealerHand[1 + cardPosition].value;
    cardPosition += 1;
    placeBet = false;
    canHit = true;
    getDealerScore();
    getPlayerScore();
    render();
} else return}

function nextRound() {
    while(winner === false){
        return;
    } 
    winner = false;
    scores.player = 0;
    scores.dealer = 0;
    templateDealer = ``;
    templatePlayer = ``;
    cardEl.player.innerHTML = templatePlayer;
    cardEl.dealer.innerHTML = templateDealer;
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



//for each 
// function getValues(obj, objName){
//     var result = '';
//     for (var i in obj) {
//         if (obj.hasOwnProperty(i)){
//             result += `${objName}.${obj[i]}\n`
//         }
//     }
//     console.log(result)
// return result;

// }



//cards are displayed
//user places bet
//money is deducted and rendered
//start is clicked to play
//cards are shown to player only 1 card of dealers card is shown
//player can hit
//generates another card
//if over 21 loss
//if 21 === winner
//if not can hit or stay again
//if stay dealer card is revealed
//if dealer has 21 loss
//if dealer number > player number === win
//if dealer number < player number && dealer number < 17 then dealer hit
//if dealer beat