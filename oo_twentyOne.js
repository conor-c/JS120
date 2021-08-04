// Twenty One is a card game with a dealer and a player
// Both players try and get to as close to a value of 21 as possible without going over
// cards are dealt from a normal deck of cards, where 2-10 are worth face value,
// face cards are worth 10, and ace is worth either 11 or 1, depending on if the value of it being
// 11 would go over 21 or not
// at the start of the game, both players are dealt 2 cards, the player is dealt their cards face up, and the dealer has
// only 1 card showing

// turn order
// the player takes the first turn
//  they can either hit or stay
//  they can continue to hit until they bust or decide to stay

// the dealer then takes their turn assuming the player hasn't busted
// the dealer reveals their face down card
// the dealer must hit if their total points are less than 17
// if the dealer goes over 21 they bust,
// if the dealer has 17 or more points, they have to stay

// then results are determined

// Things to Note:
// must create a deck of cards to be drawn from, and a way to randomize the cards
// must automatically calculate the value of an ace, depending on if it would bust the player or not

// nouns
// game, player, dealer, participant, turn, deck, card, suit, rank, score, points
// verbs
// start, deal, hit, stay, win, lose, tie, bust, hide, reveal

// game(n) - start(v)

// deck(n) - deal(v)

// card(n)
// participant (n)
// player (n)
//  - hit(v)
//  - stay(v)
//  - bust(state)
//  - score(n, state)

// Dealer(n)
//  - hit(v)
//  - stay(v)
//  - deal(v) (probably should be in deck, since both the dealer and player must be dealt cards)
//  - bust(state)
//  - score(n, state)


// Participant would be a good superclass for methods for both dealer and player

// examine the nouns and see if they will in fact be objects

// Each time the player has an opportunity to hit or stay,
// - display the computer's hand; one card should remain hidden.
// - display the player's hand and their point total

// for the dealer:
// - the dealer doesn't play at all if the player busts
// 0 when its the dealers turn, display the dealers full hand, and report point total
// redisplay the dealers hand and point total each time they hit
// display the compared results when the dealer stays

// ask to play again after each game

const readline = require('readline-sync');
class Card {
  constructor() {
    //STUB
    //card states - what suit, rank, should it have points? or leave that up to the game object
  }

}

class Deck {
  constructor() {
    this.resetDeck();
  }

  resetDeck() {
    this.standardDeck = [
      [2, 'h'], [2, 'd'], [2, 'c'], [2, 's'],
      [3, 'h'], [3, 'd'], [3, 'c'], [3, 's'],
      [4, 'h'], [4, 'd'], [4, 'c'], [4, 's'],
      [5, 'h'], [5, 'd'], [5, 'c'], [5, 's'],
      [6, 'h'], [6, 'd'], [6, 'c'], [6, 's'],
      [7, 'h'], [7, 'd'], [7, 'c'], [7, 's'],
      [8, 'h'], [8, 'd'], [8, 'c'], [8, 's'],
      [9, 'h'], [9, 'd'], [9, 'c'], [9, 's'],
      [10, 'h'], [10, 'd'], [10, 'c'], [10, 's'],
      ['jack', 'h'], ['jack', 'd'], ['jack', 'c'], ['jack', 's'],
      ['queen', 'h'], ['queen', 'd'], ['queen', 'c'], ['queen', 's'],
      ['king', 'h'], ['king', 'd'], ['king', 'c'], ['king', 's'],
      ['ace', 'h'], ['ace', 'd'], ['ace', 'c'], ['ace', 's'],
    ];
  }

  dealTo(participant) {
    //STUB
    participant.hand.push(this.pickRandomCard());
  }

  pickRandomCard() {
    let randomIdx = Math.floor((Math.random() * this.getCardsLeft()));
    let randomCard = this.standardDeck.splice(randomIdx, 1);
    return randomCard.flat();
  }

  stringifyCard(card) {
    let face = card[0];
    let suit = card[1];

    if (face === 2) face = 'Two';
    if (face === 3) face = 'Three';
    if (face === 4) face = 'Four';
    if (face === 5) face = 'Five';
    if (face === 6) face = 'Six';
    if (face === 7) face = 'Seven';
    if (face === 8) face = 'Eight';
    if (face === 9) face = 'Nine';
    if (face === 10) face = 'Ten';
    if (face === 'jack') face = 'Jack';
    if (face === 'queen') face = 'Queen';
    if (face === 'king') face = 'King';
    if (face === 'ace') face = 'Ace';
    if (suit === 'h') suit = 'Hearts';
    if (suit === 'd') suit = 'Diamonds';
    if (suit === 'c') suit = 'Clubs';
    if (suit === 's') suit = 'Spades';

    return face + ' of ' + suit;
  }

  getCardsLeft() {
    return this.standardDeck.length;
  }
}

class Participant {
  constructor() {
    this.score = 0;
    this.hand = [];
    // STUB
    //participant states?
    // score, hand, amount of money left?
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  getScore() {
    return this.score;
  }

  increaseScoreBy(points) {
    this.score += points;
  }
}

class Player extends Participant {
  constructor() {
    super();
    // inherit the participant state with super(this);
  }
}

class Dealer extends Participant {
  constructor() {
    super();
    // inherit the participant state
  }

  hide() {
    // STUB
  }

  reveal() {
    // STUB
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    // create a deck and two participants
  }

  static HIGHEST_SCORE = 21;
  static ROUNDS_TO_WIN_MATCH = 3;
  static DEALER_STAYS_AT = 17;

  start() {
    // SPIKE


    // this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();

    this.calculateScoreFor(this.player)
    this.calculateScoreFor(this.dealer)
    console.log(this.player.getScore());
    console.log(this.dealer.getScore());

    console.log(this.dealer)
    console.log(this.deck.getCardsLeft())

    // this.playerTurn();
    // this.dealerTurn();
    // this.displayResult();
    // this.displayGoodbyeMessage();
  }

  dealCards() {
    this.deck.dealTo(this.player);
    this.deck.dealTo(this.dealer);
    this.deck.dealTo(this.player);
    this.deck.dealTo(this.dealer);
  }

  calculateScoreFor(player) {
    let faceValueTotal = 0;
    let royaltyAndJackTotal = 0;
    let numberOfAces = 0;
  
    player.hand.forEach(card => {
      if (Number.isInteger(card[0])) {
        faceValueTotal += card[0];
      } else if (card[0] === 'ace') {
        numberOfAces += 1;
      } else {
        royaltyAndJackTotal += 10;
      }
    })

    let total = faceValueTotal + royaltyAndJackTotal;
    total = this.handleAces(total, numberOfAces);
  
    player.increaseScoreBy(total);
  }

  handleAces(scorePreAces, numOfAces) {
    let total = scorePreAces;

    switch(numOfAces) {
      case 1:
        total = (total <= 10) ? total + 11 : total + 1;
        break;
      case 2:
        total = (total <= 9) ? total + 12 : total + 2;
        break;
      case 3:
        total = (total <= 8) ? total + 13 : total + 3;
        break;
      case 4:
        total = (total <= 7) ? total + 14 : total + 4;
        break;
    }
    return total;
  }

  showCards() {
    // STUB
    let playerHand = this.player.hand.map(card => this.deck.stringifyCard(card));
    console.log(`You were dealt a: ${playerHand.join(' and a ')}.`);

    let dealerHand = this.deck.stringifyCard(this.dealer.hand[0]);

    console.log(`The Dealer was dealt a: ${dealerHand} and a Facedown Card.`);
  }

  playerTurn() {
    // STUB
  }

  dealerTurn() {
    // STUB
  }

  displayResult() {
    // STUB
  }

  displayWelcomeMessage() {
    // STUB
  }

  displayGoodbyeMessage() {
    // STUB
  }
}

let game = new TwentyOneGame();
game.start();