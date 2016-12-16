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

                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        );

    }
})

module.exports = Confirm
