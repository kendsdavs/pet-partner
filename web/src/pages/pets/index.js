const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const OwnersPets = React.createClass({
  getInitialState() {
    return {
      pets: [],
      ownerID: "owner_Davis_kends@kends.name"
    }
  },
  componentDidMount() {
    let petsRoute = "owners/" + this.state.ownerID + "/pets"
    data.list(petsRoute)
      .then(rows => {
        console.log("these are the pets ", rows.docs)
        this.setState({pets: rows.docs})
      })
  },
  render() {
    const list = pet => <li key={pet._id}>
      {pet.name + " The " + pet.animal_type}
      </li>
    return (
      <div>
        <h1>Pets</h1>
        <ul>
          {this.state.pets.map(list)}
        </ul>
      </div>
    )
  }
})

module.exports = OwnersPets
