
///*----- constants -----*/

//sounds

// // card lookup

// const cardValue = {
//     // ace: {
//     // class: 'dA',
//     // value: 11
//     // },

//     // dA, cA: {
//     //     value: 11
//     // },
    

// };



var newdeck = [];

let suits = ['s', 'h','c', 'd'];
let values = ['A','K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02' ];

createDeck();

function createDeck(){
    var deck = new Array;
    for(var s = 0; s <suits.length; s++){
        for(var v = 0; v < values.length; v++){
            var card = {suit: suits[s], value: values[v]};
            deck.push(card);
        }
    }
    
    newdeck.push(deck);
};



/*----- app's state (variables) -----*/

// money, player/dealer info, winner,
// card values

let scores, money, bet, winner;


// let deck = [];

// let dealerHand = [dA, hA];

// let playerHand = [qH, kH];

let usedCards = [];


/*----- cached element references -----*/

// money


const scoreEl = {
    player: document.getElementById('pscore'),
    dealer: document.getElementById('dscore')
}

const cardEl = {
    pcard1: document.getElementById('pcard1'),
    pcard2: document.getElementById('pcard2'),
    dcard1: document.getElementById('dcard1'),
    dcard2: document.getElementById('dcard2')
}

const betEl = document.getElementById('bet');

const moneyEl = document.getElementById('money');

// player/dealer info


/*----- event listeners -----*/

//start- click

document.getElementById('stay').addEventListener('click', stay);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('start').addEventListener('click', start);

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

//render
//shows the results as well as the bet and money in the bank
function render(){
    moneyEl.textContent = `Money = $${money}`;
    betEl.textContent = `Bet = $${bet}`;
};

//winner
//identifies winner is dealer or player
//if dealer wins, players loses money, if player wins, player wins money

//start
//the bet is set let the game BEGIN!


//bet
//allows user to place bet
function bet5() {
    bet

    

};
function bet10() {
    console.log('bet 10 clicked')
    

};
function bet20() {
    console.log('bet 20 clicked')
    

};


//player hit/stay

function stay(){
    console.log('stay');
}
function hit(){
    console.log('hit');
}
function start(){
    console.log('start');
}



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

