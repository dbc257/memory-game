import React, { Component } from "react"
import MemoryCard from './components/MemoryCard.jsx'
import NewGameButton from './components/NewGameButton.jsx'
import EndGameModal from './components/EndGameModal.jsx'
import './App.css';

const generateDeck = () => {
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
      finishedDeck: [],
      show: false
    };
  }
  unflipCards(card1Index, card2Index) {
    let card1 = {...this.state.deck[card1Index], isFlipped: false}
    let card2 = {...this.state.deck[card2Index], isFlipped: false}
    this.state.pickedCards.concat(card1Index, card2Index);
    let newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1
      }
      if (card2Index === index){
      return card2
      }
      return card
    })
  this.setState({deck: newDeck})
  } 

  pickCard(cardIndex) {
    if (this.state.deck[cardIndex].isFlipped === true) {
      alert('This card is already flipped. Please choose another card.')
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
    if (newPickedCards.length === 2) {
      let card1Index = newPickedCards[0]
      let card2Index = newPickedCards[1]
      if (newDeck[card1Index].symbol === newDeck[card2Index].symbol) {
        this.checkGameEnd(card1Index, card2Index)
      }
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(() => {this.unflipCards(card1Index, card2Index)}, 1000); 
      }
      newPickedCards = [];
    }
    return this.setState({deck: newDeck, pickedCards: newPickedCards});
    }

    checkGameEnd(card1Index, card2Index) {
    let cardFinished1 = {...this.state.deck[card1Index]}
    let cardFinished2 = {...this.state.deck[card2Index]}
    if (cardFinished1.isFlipped === true) {
      this.state.finishedCards.push(cardFinished1)
    }
    if (cardFinished2.isFlipped === true) {
      this.state.finishedCards.push(cardFinished2);
    }
    if (this.state.finishedCards.length === 8) {
      this.handleShow()
      }      
    }
    handleClose() {
      this.setState({show: false})
    }
    handleShow() {
      this.setState({show: true})
    }
    
    render() {
      var cardsJSX = this.state.deck.map((card, index) => {
        return <MemoryCard symbol={card.symbol} isFlipped={card.isFlipped} key={index} pickCard={this.pickCard.bind(this, index)}/>
      })
    const winGame = this.state.show;
    let winGameModal;
    if (winGame) {
      winGameModal = <EndGameModal show={this.state.show} onHide={this.handleShow.bind(this)} handleShow={this.handleShow.bind(this)} handleClose={this.handleClose.bind(this)} />
    } else {
      winGameModal = ''
    }

    return <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
        <h3>Match cards to win</h3>
      </header>
      <br/>
      {winGameModal}
      <div>
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
      <br/>
      <div>
      <NewGameButton />
      </div>
      </div>
  }
}

export default App;
