import React, { Component } from 'react'
import './MemoryCard.css'
import logo from './dc-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MemoryCard extends Component {
    render() {
        let innerClass = "MemoryCard__inner"
        if (this.props.isFlipped) {innerClass += ' flipped'}
        return  <div className="MemoryCard" onClick={this.props.pickCard}>
                    <div className={innerClass}>
                        <div className="MemoryCard__back">
                            <img src={logo} alt="card logo"/>
                        </div>
                        <div className="MemoryCard__front">
                        {this.props.symbol}
                        </div>                       
                    </div>
                </div>
    }

}
