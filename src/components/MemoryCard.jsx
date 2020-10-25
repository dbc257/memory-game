import React from 'react'
import './MemoryCard.css'
import logo from './dc-logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';



export default class MemoryCard extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { isFlipped: false }
    // }

    // clickHandler() {
    //     this.setState({ isFlipped: !this.state.isFlipped })
    //     // alert("clicked")
    // }
    render() {
        let innerClass = "MemoryCard__inner"
        if (this.props.isFlipped) {
            innerClass = "flipped"
        }
        return  <div className="MemoryCard" onClick={this.props.pickCard}>
                    <div className={innerClass}>
                        <div className="MemoryCard_back">
                            <img src={logo} alt="card logo"/>
                        </div>
                        <div className="MemoryCard_front">
                        {this.props.symbol}
                        </div>                       
                    </div>
                </div>
    }

}
