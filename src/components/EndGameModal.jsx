import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap'

export default class EndGameModal extends Component {

    render() {  
    return (
      <>
      <Modal
        show={this.props.show}
        onHide={this.props.handleShow}
        backdrop="static"
        >
          <Modal.Header>
            <Modal.Title>YOU WIN!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            If you would like to play again, press the New Game Button.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button href="http://localhost:3000/" variant="success">New Game</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}  
