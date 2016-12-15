const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()
const {filter} = require('ramda')
const PetPartnerNav = require('../../components/navbar')
const {ListGroup, ListGroupItem, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock } = require('react-bootstrap')


const Pets = React.createClass({
  getInitialState() {
    return {
      pets: [],
      filtered: [],

    }
  },
  componentDidMount() {

    data.list("pets")
      .then(pets => this.setState({filtered: pets.docs, pets: pets.docs})
      )
  },
  filter(e) {
    this.setState({filtered:
      filter(
        pet => pet.name.indexOf(e.target.value) === 0,
      this.state.pets
      )
    })
  },
  render() {
    const list = pet =>
        <ListGroupItem key={pet._id}><Link to={`/pets/${pet._id}/show`}>
          {pet.name + " " + pet.ownerLastName}
        </Link></ListGroupItem>

    return (
      <div >
        <PetPartnerNav />
        <Row><Col xs={6} xsOffset={3}>
        <form>
          <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Search for a Pet</ControlLabel>
              <FormControl onChange={this.filter} type="text" placeholder="search"/>
            <HelpBlock>Narrow your search by typing the name you're looking for.</HelpBlock>
          </FormGroup>
        </form>
        </Col></Row>
        <div className="tc container">
        {/* <h1>Search for a Pet</h1>
          <input
            onChange={this.filter}
            placeholder="search" type="text"></input> */}
            <Row><Col xs={6} xsOffset={3}>
              <ListGroup>
                {this.state.filtered.map(list)}
              </ListGroup>
            </Col></Row>
        <Link className="btn btn-primary" to="/pets/new">Add Pet</Link>
       {" "}
        <Link className="btn btn-default" to="/">Home</Link>
      </div>
      </div>
    )
  }
})

module.exports = Pets
