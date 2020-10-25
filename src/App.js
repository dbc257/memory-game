import React from "react"
import MemoryCard from './components/MemoryCard.jsx'
import './App.css';

function generateDeck() {
  var symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  var deck = [];
  var index;
  for (let index = 0; index = 16; index++) {

    // const card = symbols[i]
    let isFlipped = false
    let symbol = symbols[index%8] 
    const card = {isFlipped, symbol}
    deck.push(card)
    // New Card 
    console.log(card)
    console.log(deck)
  }
  return shuffle(deck)
}

function shuffle(deck) {
  var j, x, i;
  for (i = deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = deck[i];
      deck[i] = deck[j];
      deck[j] = x;
  }
  return deck;
}

generateDeck()

class App extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { isFlipped: false }
    // this.symbol = { symbols[i%8] }
    // this.state.cardToFlip = {isFlipped: false}
    this.state.deck = []
    this.state.pickedCards = []
}
  pickCard(cardIndex) {
    if (this.state.deck[cardIndex] === {isFlipped: false}) {
      return;
    } 
    var cardToFlip = this.state.deck[cardIndex];
    // this.state.cardToFlip = {isFlipped: false}
    this.setState({isFlipped: false})
    var newPickedCards = this.state.pickedCards.concat(cardIndex);
    var newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    })
    this.setState({deck: newDeck, pickedCards: newPickedCards});
};
  // function App() {
  // return (
    render() {
      var cardsJSX = this.state.deck.map((card, index) => {
        return <MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} key={index} pickCard={this.pickCard.bind(this, index)}/>
      })
      
    return <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <h3>Match cards to win</h3>
      </header>
      <div>
      {cardsJSX.slice(0,4)}
      </div>
      <div>
      {cardsJSX.slice(4,8)}
      1
      </div>
      <div>
      {cardsJSX.slice(8,12)}
      </div>
      <div>
      {cardsJSX.slice(12,16)}
      </div>
    </div>
  }
}

export default App;
