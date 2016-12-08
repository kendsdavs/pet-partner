const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Procedure = require('./pages/procedures/show')
const ProcedureForm = require('./pages/procedures/form')
const Procedures = require('./pages/procedures')
const Pets = require('./pages/pets')
const Pet = require('./pages/pets/show')
const PetForm = require('./pages/pets/form')
const CategoryForm = require('./pages/categories/form')
const Categories = require('./pages/categories')
const Category = require('./pages/categories/show')


const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Hello Pet Partner</h1>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />

          <Match exactly pattern="/pets" component={Pets} />
          <Match pattern="/pets/new" component={PetForm} />
          <Match pattern="/pets/:id/show" component={Pet} />

          <Match exactly pattern="/procedures" component={Procedures} />
          <Match pattern="/procedures/new" component={ProcedureForm} />
          <Match pattern="/procedures/:id/show" component={Procedure} />

          <Match exactly pattern="/categories" component={Categories} />
          <Match pattern="/categories/new" component={CategoryForm} />
          <Match pattern="/categories/:id/show" component={Category} />

        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
