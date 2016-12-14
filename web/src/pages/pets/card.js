const React = require('react')
import {Row, Col, Image, Well} from 'react-bootstrap'


const PetCard = React.createClass({
  render() {
    return (

            <Well>

                <Row>
                  <Col xs={6}>
                    <h1>{this.props.pet.name}</h1>
                    <h4>Owner: {this.props.pet.owner}</h4>
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
                  </Col>
                </Row>

            </Well>





    )
  }
})

module.exports = PetCard
