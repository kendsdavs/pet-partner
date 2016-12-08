const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Owners = require('./pages/owners')
const OwnerForm = require('./pages/owners/form')
const PetForm = require('./pages/pets/form')
const OwnersPets = require('./pages/pets')

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Hello Pet Partner</h1>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />

          <Match exactly pattern="/owners" component={Owners} />
          <Match pattern="/owners/new" component={OwnerForm} />

          <Match pattern="/pets" component={OwnersPets} />
          <Match pattern="/owners/pets/new" component={PetForm} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
