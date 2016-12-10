const React = require('react')


const PetCard = React.createClass({
  render() {
    return (
      <h1>{this.props.pet.name}</h1>
    )
  }
})

module.exports = PetCard
