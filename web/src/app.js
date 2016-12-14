const React = require('react')

const { HashRouter, Match, Redirect } = require('react-router')
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
          {this.state.loggedIn === false ? <Redirect to="/" /> : null }
          {/* <h1>Hello Pet Partner</h1> */}
          <Match exactly pattern="/" render={props =>
            <Home auth={auth} {...props} />
          } />
          <MatchWhenAuthorized pattern="/about" component={About} />

          <MatchWhenAuthorized exactly pattern="/pets" component={Pets} logout={this.logout} />
          <MatchWhenAuthorized pattern="/pets/new" component={PetForm} logout={this.logout} />
          <MatchWhenAuthorized pattern="/pets/:id/show" component={Pet} logout={this.logout} />
          <MatchWhenAuthorized pattern="/pets/:id/edit" component={PetForm} logout={this.logout} />

          <MatchWhenAuthorized exactly pattern="/procedures" component={Procedures} logout={this.logout} />
          <MatchWhenAuthorized pattern="/procedures/new" component={ProcedureForm} logout={this.logout} />
          <MatchWhenAuthorized pattern="/procedures/:id/show" component={Procedure} logout={this.logout} />
          <MatchWhenAuthorized pattern="/procedures/:id/edit" component={ProcedureForm} logout={this.logout} />


          <MatchWhenAuthorized exactly pattern="/categories" component={Categories} logout={this.logout}/>
          <MatchWhenAuthorized pattern="/categories/new" component={CategoryForm} logout={this.logout}/>
          <MatchWhenAuthorized pattern="/categories/:id/show" component={Category} logout={this.logout} />
          <MatchWhenAuthorized pattern="/categories/:id/edit" component={CategoryForm} logout={this.logout} />

        </div>
      </HashRouter>
    )
  }
})

const MatchWhenAuthorized =({component: Component, logout, ...rest}) =>
  <Match {...rest} render={props =>
    auth.loggedIn() ?
      <div>
        <div style={{float: 'right'}}><button onClick={e => auth.logout() }>logout</button></div>
        <Component {...props} logout={logout} />
      </div> : <Redirect to="/" />
  }
  />
module.exports = App
