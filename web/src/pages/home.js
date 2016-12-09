const React = require('react')
const {Link} = require('react-router')
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

const Home = React.createClass({
  render() {
    return (
      <div>

        <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Home</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Link</NavItem>
      <NavItem eventKey={2} href="#">Link</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
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
