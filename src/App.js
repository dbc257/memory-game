import React, { Component } from "react"
import MemoryCard from './components/MemoryCard.jsx'
import './App.css';
// import { Component } from 'react'

function generateDeck() {
  var symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
  let deck = [];
  var index;
  for (index = 0; index < 16; index++) {
    deck.push({isFlipped: false, symbol: symbols[index%8]})
    // const card = symbols[i]
    // let isFlipped = false
    // let symbol = symbols[index%8] 
    // const card = {isFlipped, symbol}
    // deck.push(card)
    // New Card 
    // console.log(card)
  }
  // console.log(deck)
  // let result = shuffle(deck)
  // console.log(result)
  // return result
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
    // this.state = { isFlipped: false }
    // this.symbol = { symbols[i%8] }
    // this.state.cardToFlip = {isFlipped: false}
    // this.state = ...
    this.state = {
      deck: generateDeck(),
      pickedCards: []
    };
    // this.deck = []
    // this.state.deck = generateDeck()
    // this.pickedCards = []
}
  pickCard(cardIndex) {
    // const cardPickedIndex = this.state.deck[cardIndex]
    // console.log(newPickedCards[cardIndex])
    // console.log(this.state.deck)

    if (this.state.deck[cardIndex].isFlipped === true) {
      console.log('Card is already flipped')
      return;
    } 
    const cardToFlip = {...this.state.deck[cardIndex]};
    cardToFlip.isFlipped = true
    // console.log(this.state.cardToFlip)
    // console.log(cardToFlip)
    // this.state.isFlipped = false
    // this.setState({isFlipped: false})
    // cardToFlip.setState({props.isFlipped})
    // this.state.cardToFlip = ({isFlipped: true})
    // this.state.cardToFlip.setState({isFlipped: true})
    // cardToFlip.setState({isFlipped: false})
    // console.log(cardToFlip)
    // console.log(this.state.cardToFlip)
    // this.state.cardToFlip = {this.props.isFlipped}
    // cardToFlip = this.props.isFlipped
    // var cardToFlip
    const newPickedCards = this.state.pickedCards.concat(cardIndex);
    // console.log(newPickedCards)
    const newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip
      }
      return card
    })
    // console.log(newPickedCards)
    
    // console.log(card1Index)
    // console.log(card2Index)

    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0]
      const card2Index = newPickedCards[1]
      if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        console.log(newDeck[card1Index].symbol)
        console.log(newDeck[card2Index].symbol)
        console.log("unflip cards")
        return this.unflipCards(card1Index, card2Index)
        // return setTimeout(() => {this.unflipCards(card1Index, card2Index)}, 1000);  
      }
      this.newPickedCards = []
      console.log(newPickedCards)
    }
    this.setState({deck: newDeck, pickedCards: newPickedCards});
};
  
  unflipCards(card1Index, card2Index) {
    
    const card1 = {...this.state.deck[card1Index], isFlipped: false}
    // card1.isFlipped = false
    const card2 = {...this.state.deck[card2Index], isFlipped: false}
    // card2.isFlipped = false
    // console.log(card1)
    // console.log(card2)
    const newDeck = this.state.deck.map((card, index) => {
      // if (index) {
        // if (card1Index !== index && card2Index !== index) {
        if (card1Index === index || card2Index === index) {
          console.log('CARD1 & CARD 2')
          return card1 && card2  
        }
        
        console.log('CARD')
          return card
      })
        // if (this.state.deck[index] === {isFlipped: true}) {
        //   return console.log('TRUE');
        // } 
        // const cardToUnflip = {...this.state.deck[index], isFlipped: false};
        
        // console.log(card)
        // return card;
      //   console.log("FLIP")
      //   return card
      // } 
      // return card1 && card2;
  // (card1Index != index && card2Index != index) {
      // console.log("FLIP CARDS")
     
    // }) 
  this.setState({deck: newDeck})
  } 
  // (card1Index === index && card2Index === index)
  // const newDeck = this.state.deck.map((card, index) => {
  //   if (cardIndex === index) {
  //     return cardToFlip
  //   }
  //   return card
  // })
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
