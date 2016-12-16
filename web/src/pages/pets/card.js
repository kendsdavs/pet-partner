const React = require('react')
import {Row, Col, Image, Well} from 'react-bootstrap'


const PetCard = React.createClass({
  render() {
    const color = {
      background: "#ECECEA"
    }
    return (

            <Well style={color}>

                <Row>
                  <Col xs={6}>
                    <h1>{this.props.pet.name}</h1>
                    <h4>Owner: {this.props.pet.ownerFirstName + " " + this.props.pet.ownerLastName}</h4>
                    <p>Address: {this.props.pet.address}</p>
                    <p>Email: {this.props.pet.email}</p>
                    <p>Phone: {this.props.pet.phone}</p>
                  </Col>
                  <Col xs={6} >
                    <Image src={this.props.pet.file}
                      height="150"
                      width="150"
                      rounded responsive
                      className="pull-right"

                     />
                     {' '}
                     <p><strong>Breed:</strong> {this.props.pet.breed}</p>
                     <p><strong>Gender:</strong> {this.props.pet.gender}</p>

                  </Col>
                </Row>

            </Well>

    )
  }
})

module.exports = PetCard
