const React = require('react')
import {Modal, Button} from 'react-bootstrap'


const Confirm = React.createClass({
  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.msg}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.props.onConfirm}>Yes</Button>

            <Button onClick={this.props.onCancel}>No</Button>

            {/* <Button bsStyle="primary">Save changes</Button> */}
          </Modal.Footer>

        </Modal.Dialog>
      </div>
);
    //   <div>
    //     <h1>{this.props.msg}</h1>
    //     <button onClick={this.props.onConfirm}>Yes</button>
    //     <button onClick={this.props.onCancel}>No</button>
    //   </div>
    // )
  }
})

module.exports = Confirm
