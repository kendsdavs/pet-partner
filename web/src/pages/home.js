const React = require('react')
const {Link} = require('react-router')

const Home = React.createClass({
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/about">About</Link>
        ||
        <Link to="/pets">Find a Pet</Link>
        ||
        <Link to="/procedures/new">Add a Procedure</Link>
      </div>
    )
  }
})

module.exports = Home
