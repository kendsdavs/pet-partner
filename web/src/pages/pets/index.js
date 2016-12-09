const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const Pets = React.createClass({
  getInitialState() {
    return {
      pets: [],

    }
  },
  componentDidMount() {

    data.list("pets")
      .then(rows => {
        console.log("these are the pets ", rows.docs)
        this.setState({pets: rows.docs})
      })
  },
  render() {
    const list = pet => <li key={pet._id}>
      <Link to={`/pets/${pet._id}/show`}>
      {pet.name + " The " + pet.animal_type}
    </Link>

      </li>
    return (
      <div>
        <h1>Pets</h1>
        <ul>
          {this.state.pets.map(list)}
        </ul>
        <Link to="/pets/new">Add Pet</Link>
        ||
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Pets
