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
const shuffle = require('shuffle-array')

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  static SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

  toString() { //for implicit method overriding
    return this.hidden ? 'Hidden' : `${this.rank} of ${this.suit}`;
  }

  isFaceCard() {
    return this.isJack() || this.isQueen() || this.isKing();
  }

  isAce() {
    return this.rank === 'Ace';
  }

  isJack() {
    return this.rank === 'Jack';
  }

  isQueen() {
    return this.rank === 'Queen';
  }

  isKing() {
    return this.rank === 'King';
  }

  hide() {
    this.hidden = true;
  }

  isHidden() {
    return this.hidden;
  }

  reveal() {
    this.hidden = false;
  }

}

class Deck {
  constructor() {
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });

    this.shuffleCards();
  }

  shuffleCards() {
    shuffle(this.cards);
  }

  dealVisibleCard() {
    return this.cards.pop();
  }

  dealHiddenCard() {
    let card = this.dealVisibleCard();
    card.hide();
    return card;
  }
}

let Hand = { //Mix-in, because Player is not a 'hand'
  addCard(newCard) {
    this.hand.push(newCard);
  },

  resetHand() {
    this.hand = [];
  },

  showCards(string) {
    console.log(string);
    console.log('');

    this.hand.forEach(card => {
      console.log(` ${card}`);
    }); // JS will attempt to call .toString() on the object card, but since we method overrode it, we get something useful
    console.log('');
  },

  getCards() {
    return this.hand;
  },

  revealAllCards() {
    this.hand.forEach(card => card.reveal());
  },

  numOfCards() {
    return this.hand.length;
  }
}

class Player {
  static INITIAL_BUY_IN = 5;

  constructor() {
    this.money = Player.INITIAL_BUY_IN;
    this.resetHand(); // creates an empty hand array
  }

  winHand() {
    this.money += 1;
  }

  loseHand() {
    this.money -= 1;
  }

  isBroke() {
    return this.money === 0;
  }

  displayTotalMoney() {
    console.log(`Your new balance is: $${this.money}.`);
  }

}

class Dealer {
  constructor() {
    this.resetHand();
  }
}

Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  static HIT = 'h';
  static STAY = 's';
  static DEALER_STAY_AT = 17 // or higher

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playAGame();

      if (this.player.isBroke()) {
        if (this.debtRequest() === false) break;
      }

      if (!this.player.isBroke()) {
        if (!this.playAgain()) break;
      } 

      console.clear();

    }

    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One');
    console.log(`Your starting balance is $${Player.INITIAL_BUY_IN}`);
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Twenty-One! Goodbye!");
  }

  playAgain() {
    return this.getAnswer("Would you like to keep playing?");
  }

  getAnswer(question) {
    let answer;

    while (true) {
      answer = readline.question(`${question} (y / n): `).toLowerCase();
      if (['y', 'n'].includes(answer)) break;
      console.log('Error: please enter "y" or "n"');
    }
    return answer === "y";
  }

  debtRequest() {
    return this.getAnswer("Would you like to risk debt to keep playing?");
  }

  playAGame() {
    this.dealCards();
    this.showCards();
    this.playerTurn();

    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }

    let winner = this.findWinner();
    console.clear();
    this.showCards();
    this.displayResults(winner);
    this.updateWinnings(winner);
    this.player.displayTotalMoney();
  }

  updateWinnings(winner) {
    if (winner === this.player) {
      this.player.winHand();
    } else if (winner === this.dealer) {
      this.player.loseHand();
    }
  }

  displayResults(winner) {
    if (this.isBusted(this.player)) {
      console.log("Bummer, You busted!");
    } else if (this.isBusted(this.dealer)) {
      console.log("Dealer Busted.");
    } else {
      if (winner === this.player) {
        console.log("Winner Winner Chicken Dinner! You've won this round.");
      } else if (winner === this.dealer) {
        console.log("Dealer wins this round.");
      } else {
        console.log("A tie game");
      }
    }

  }

  findWinner() {
    this.dealer.revealAllCards();

    if (this.isBusted(this.player)) {
      return this.dealer;
    } else if (this.isBusted(this.dealer)) {
      return this.player;
    } else {
      let dealerScore = this.calculateScoreFor(this.dealer);
      let playerScore = this.calculateScoreFor(this.player);
      
      if (dealerScore > playerScore) {
        return this.dealer;
      } else if (dealerScore < playerScore) {
        return this.player;
      } else {
        return null;
      }
    }
  }

  playerTurn() {
    while (this.hitOrStay() === TwentyOneGame.HIT) {
      this.hit(this.player);
      if (this.isBusted(this.player)) break;
    }
  }

  dealerTurn() {
    this.dealer.revealAllCards();
    console.clear();
    this.showCards();

    while (true) {
      let dealerScore = this.calculateScoreFor(this.dealer);
      if (dealerScore >= TwentyOneGame.DEALER_STAY_AT) break;
      this.manualPause();
      this.hit(this.dealer);
    }

  }

  manualPause() {
    readline.question("*** Press enter to continue ***");
  }

  hit(person) {
    let newCard = this.deck.dealVisibleCard();
    person.addCard(newCard);

    console.clear();
    this.displayDealtCard(newCard, person);
    this.showCards();

    if (this.isBusted(person)) return;
  }

  isBusted(person) {
    return this.calculateScoreFor(person) > 21; //static property for 21?
  }

  displayDealtCard(newCard, person) {
    if (person === this.player) {
      console.log(`*** The Dealer deals You: ${newCard} ***`);
    } else if (person === this.dealer) {
      console.log(`*** The Dealer deals themselves: ${newCard} ***`);
    }
  }

  hitOrStay() {
    let decision;

    while (true) {
      decision = readline.question("Hit or Stay? (h / s): ").toLowerCase();
      if([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(decision)) break;
      console.log('Error: please enter either "h" or "s"');
    }

    return decision === 'h' ? TwentyOneGame.HIT : TwentyOneGame.STAY;
  }

  dealCards() {
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addCard(this.deck.dealVisibleCard());
    this.dealer.addCard(this.deck.dealVisibleCard());
    this.player.addCard(this.deck.dealVisibleCard());
    this.dealer.addCard(this.deck.dealHiddenCard());
  }

  showCards() {
    this.dealer.showCards("Dealer's Hand:");
    this.showScoreFor(this.dealer);
    console.log('');

    this.player.showCards("Your Cards:");
    this.showScoreFor(this.player);
    console.log('');
  }

  showScoreFor(person) {
    if (person === this.player) {
      console.log(`You have a score of: ${this.calculateScoreFor(person)}`);
    } else if (person === this.dealer) {
      console.log(`Dealer has a score of: ${this.calculateScoreFor(person)}`);
    }
  }

  calculateScoreFor(person) {
    let score = 0;
    let aceCount = 0;

    person.getCards().forEach(card => {
      if (card.isHidden()) {
        score += 0;
      } else if (card.isFaceCard()) {
        score += 10;
      } else if (!card.isAce()) {
        score += Number.parseInt(card.rank, 10);
      } else if (card.isAce()) {
        aceCount += 1;
      }
    })
    
    return score = this.handleAces(score, aceCount);
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

}

let game = new TwentyOneGame();
game.start();