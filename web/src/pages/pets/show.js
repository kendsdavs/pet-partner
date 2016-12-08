//pets show page//
const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const Pet = React.createClass({
  getInitialState() {
    return {
      pet: {}
    }
  },
  componentDidMount() {
    data.get("pets", this.props.params.id)
      .then(res => this.setState({pet: res}) )

  },
  render() {
    return (
      <div>
        <h1>{this.state.pet.name}</h1>

        <Link to="/procedures/new">Add Procedure</Link>
        |
        <Link to="/pets">Back to Pets</Link>
        |
        <Link to="/procedures">View History</Link>
        |
        <Link to={`/pets/${this.state.pet._id}/edit`}>Edit Pet</Link>
      </div>
    )
  }
})
module.exports = Pet
