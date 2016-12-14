const React = require('react')

const { HashRouter, Match } = require('react-router')
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
const auth = require('./utils/auth')(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_DOMAIN
)


const App = React.createClass({
  getInitialState() {
    return {
        loggedout:false
    }
  },
  logout() {
    console.log('logout!')
    auth.logout()
    this.setState({loggedout: true})

  },
  render() {
    return (
      <HashRouter>
        <div>
          {/* <h1>Hello Pet Partner</h1> */}
          <Match exactly pattern="/" render={props =>
            <Home auth={auth} {...props} />
          } />
          <MatchWhenAuthorized pattern="/about" component={About} />

          <MatchWhenAuthorized exactly pattern="/pets" component={Pets} />
          <MatchWhenAuthorized pattern="/pets/new" component={PetForm} />
          <MatchWhenAuthorized pattern="/pets/:id/show" component={Pet} />
          <MatchWhenAuthorized pattern="/pets/:id/edit" component={PetForm} />

          <MatchWhenAuthorized exactly pattern="/procedures" component={Procedures} />
          <MatchWhenAuthorized pattern="/procedures/new" component={ProcedureForm} />
          <MatchWhenAuthorized pattern="/procedures/:id/show" component={Procedure} />
          <MatchWhenAuthorized pattern="/procedures/:id/edit" component={ProcedureForm} />


          <MatchWhenAuthorized exactly pattern="/categories" component={Categories} />
          <MatchWhenAuthorized pattern="/categories/new" component={CategoryForm} />
          <MatchWhenAuthorized pattern="/categories/:id/show" component={Category} />
          <MatchWhenAuthorized pattern="/categories/:id/edit" component={CategoryForm} />

        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized =({component: Component, ...rest}) =>
  <Match {...rest} render={props =>
    auth.loggedIn() ?
      <div>
        <button onClick={e => auth.logout() }>logout</button>
        <Component {...props} />
      </div> : <Redirect to="/" />
  }
  />
module.exports = App
