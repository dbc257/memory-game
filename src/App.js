import React, { Component } from "react"
import MemoryCard from './components/MemoryCard.jsx'
import './App.css';

function generateDeck() {
  var symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  let deck = [];
  var index;
  for (index = 0; index < 16; index++) {
    deck.push({isFlipped: false, symbol: symbols[index%8]})
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



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: generateDeck(),
      pickedCards: [],
      newPickedCards: [],
      finishedCards: [],
      finishedDeck: []
    };
}
  unflipCards(card1Index, card2Index) {
    let card1 = {...this.state.deck[card1Index], isFlipped: false}
    let card2 = {...this.state.deck[card2Index], isFlipped: false}
    let newPickedCards = this.state.pickedCards.concat(card1Index, card2Index);
    console.log(newPickedCards)
    let newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        console.log('CARD1')
        this.checkGameEnd(card1Index, card2Index)
        return card1
      }
      if (card2Index === index){
      console.log('CARD2')
      this.checkGameEnd(card2Index, card2Index)
      return card2
      }
      console.log('CARD')
      return card
    })
  this.setState({deck: newDeck})
  
  } 

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped === true) {
      console.log('Card is already flipped')
      return;
    } 
    const cardToFlip = {...this.state.deck[cardIndex], isFlipped: true};
    let newPickedCards = this.state.pickedCards.concat(cardIndex);
    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    })
    console.log(newPickedCards)
    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0]
      let card2Index = newPickedCards[1]
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        console.log("UNFLIP CARDS")
        setTimeout(() => {this.unflipCards(card1Index, card2Index)}, 1000); 
      }
      newPickedCards = [];
    }
    console.log(newPickedCards)
    return this.setState({deck: newDeck, pickedCards: newPickedCards});
    }

    checkGameEnd(card1Index, card2Index) {
    let cardFinished1 = {...this.state.deck[card1Index], isFlipped: true}
    let cardFinished2 = {...this.state.deck[card2Index], isFlipped: true}
    let finishedCards = this.state.pickedCards.concat(card1Index, card2Index);
    console.log(finishedCards)
      // let allPickedCards = this.state.pickedCards.concat(cardIndex);
    const finishedDeck = this.state.finishedCards.map((card, index) => {
      if (card1Index === index) {
        return cardFinished1
      }
      if (card2Index === index) {
        return cardFinished2
      }
      return card
    })
    console.log(finishedCards)
    console.log(finishedDeck)
    if (finishedCards.length === 16) {
      console.log('16 FINISHED CARDS')
      if (this.state.finishedCards === this.state.finishedDeck)
      console.log("GAME FINISHED")
      console.log(this.state.finishedCards)
      console.log(this.state.finishedDeck)
      }
      this.setState({finishedCards: finishedDeck})
    }
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
