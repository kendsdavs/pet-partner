const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()
const {filter} = require('ramda')
const PetPartnerNav = require('../../components/navbar')


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
    const list = pet => <li key={pet._id}>
        <Link to={`/pets/${pet._id}/show`}>
          {pet.name}
        </Link>
      </li>
    return (
      <div>
        <PetPartnerNav />
        <div className="tc">
        <h1>Search for a Pet</h1>
          <input
            onChange={this.filter}
            placeholder="search" type="text"></input>
        <ul className="list">
          {this.state.filtered.map(list)}
        </ul>
        <Link to="/pets/new">Add Pet</Link>
        ||
        <Link to="/">Home</Link>
      </div>
      </div>
    )
  }
})

module.exports = Pets
