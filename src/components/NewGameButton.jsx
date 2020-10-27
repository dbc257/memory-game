import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

export default class NewGameButton extends Component {
    render() {
        return <div><a href="http://localhost:3000/"><Button variant="dark" size="lg" onClick={this.props.newGame} block>Reset Game</Button></a></div>
    }
}