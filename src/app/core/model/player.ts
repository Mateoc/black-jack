import cardsUris from '../../commons/cards';

const nameToID = {
  A: 'A',
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  J: 'J',
  Q: 'Q',
  K: 'K'
};
const suitToID = {
  SPADE: 'S',
  HEART: 'H',
  CLUB: 'C',
  DIAMOND: 'D'
};

export default class Player {
  private _cards = [];

  constructor(private _name, private _email, private _balance, private _turn, private _bet?, cards?) {
    if (cards) {
      const openCards = cards.openCards;
      openCards.forEach(card => {
        this._cards.push(cardsUris[suitToID[card.suit]][nameToID[card.name]]);
      });
    }
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get balance() {
    return this._balance;
  }

  set balance(value) {
    this._balance = value;
  }

  get turn() {
    return this._turn;
  }

  set turn(value) {
    this._turn = value;
  }

  get bet() {
    return this._bet;
  }

  set bet(value) {
    this._bet = value;
  }

  get cards() {
    return this._cards;
  }

  set cards(value) {
    this._cards = value;
  }


}