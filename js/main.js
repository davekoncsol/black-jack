
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
    
    newdeck = deck
};



/*----- app's state (variables) -----*/

// money, player/dealer info, winner,
// card values

let scores, money, bet, winner;

let playerHand = [];

let dealerHand = [];

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
    player: document.getElementById('player-box'),
    dealer: document.getElementById('dealer-box'),
  
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
    winner = null;
    scores = {
        player: 0,
        dealer: 0
    }
    playerCards = {
        card1: 'back-blue',
        card2: 'back-blue',
        
    }

    dealerCards = {
        card1: 'back-red',
        card2: 'back-red',
    }

  

    render();


}

function getPlayerScore(){
    for (let card in playerCards){
        if (playerCards[card].length >= 3){
            scores.player += parseInt(playerCards[card].slice(1));
        } else if (playerCards[card].length < 3 && !playerCards[card].includes('A')){
            scores.player += 10;
        } else if (playerCards[card].includes('A')) {
            scores.player += 11;

        }
        ;
    }
};
function getDealerScore(){
    for (let card in dealerCards){
        if (dealerCards[card].length >= 3){
            scores.dealer += parseInt(dealerCards[card].slice(1));
        } else if (dealerCards[card].length < 3 && !dealerCards[card].includes('A')){
            scores.dealer += 10;
        } else if (dealerCards[card].includes('A')) {
            scores.dealer += 11;

        }
        ;
    }
};


//render
//shows the results as well as the bet and money in the bank
function render(){
    moneyEl.textContent = `Money = $${money}`;
    betEl.textContent = `Bet = $${bet}`;

    
    for (let pcard in playerCards){
       console.log( playerCards[pcard]);
       cardEl.player.innerHTML += `<img class="card shadow ${playerCards[pcard]}"> 
       `
    }
    for (let dcard in dealerCards){
       console.log( dealerCards[dcard]);
       cardEl.dealer.innerHTML += `<img class="card shadow ${dealerCards[dcard]}"> 
       `
    }

    scoreEl.dealer.textContent =`Dealer Number ${scores.dealer}`
    scoreEl.player.textContent =`Player Number ${scores.player}`
    // let templateDealer = ` <div class="card shadow ${dealerCards.card1}" id="dcard1"><img></div> 
    // <div class="card shadow ${dealerCards.card2}" id="dcard2"><img></div> 
    // <div id="dscore">Dealer Number ${scores.dealer} </div>
    // `;

    // let templatePlayer = `<div id='pscore'>Player Number ${scores.player}</div>
    // <div class="card shadow ${playerCards.card1}" id="pcard1"><img></div> 
    // <div class="card shadow ${playerCards.card2}" id="pcard2"><img></div> 
    // `;
    // cardEl.player.innerHTML = templatePlayer;
    // cardEl.dealer.innerHTML = templateDealer;


};

//winner
//identifies winner is dealer or player
//if dealer wins, players loses money, if player wins, player wins money



//start
//the bet is set let the game BEGIN!


//bet
//allows user to place bet
function bet5() {
    console.log('bet 5!!')
    if (money >= 5){
    bet += 5;
    money -= 5;
    render();}
     return;
    };
function bet10() {
    console.log('bet 10 clicked')
    if (money >= 10){
        bet += 10;
        money -= 10;
        render();}
         return;
        };


function bet20() {
    console.log('bet 20 clicked')
    if (money >= 20){
        bet += 20;
        money -= 20;
        render();}
         return;
        };


function chickenDinner(){
    money += bet * 2;
    bet = 0;
    render ();
    
}

function loser() {
    bet = 0;
    render();
}

function dealerAction(){

}

//player hit/stay

function stay(){
    console.log('stay then the dealer goes. ');
}
function hit(){
    
    
    
    getPlayerScore();
render();
}
function start(){
    
    shuffle(newdeck);
    if(playerHand.length < 10){
    for (i = 0; i <= 25; i++) {
        // console.log(newdeck[i]);
        playerHand.push(newdeck[i]);
        
    }
    for (i = 26; i <=51; i++){
        dealerHand.push(newdeck[i]);
    }
}
    else { return}
        
        dealCards();
        
    }



 
function shuffle(){
    newdeck.sort( () => Math.random() - 0.5);
    
}

//for loops for innerHTML?


function dealCards(){
    

    playerCards.card1 = playerHand[0].suit + playerHand[0].value;
    playerCards.card2 = playerHand[1].suit + playerHand[1].value;
    dealerCards.card1 = dealerHand[0].suit + dealerHand[0].value;
    dealerCards.card2 = dealerHand[1].suit + dealerHand[1].value;

    
getDealerScore();
getPlayerScore();

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

