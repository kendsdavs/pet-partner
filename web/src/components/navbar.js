const React = require('react')
const {Link} = require('react-router')
import {Navbar, NavItem, NavDropdown, Nav, MenuItem,} from 'react-bootstrap'

const PetPartnerNav = React.createClass({
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Pet Partners</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem><Link to="/about">About</Link></NavItem>
          <NavItem eventKey={2} href="#">New User</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem><Link to="/pets">Find a Pet</Link></MenuItem>
            <MenuItem><Link to="/procedures/new">Add a Procedure</Link></MenuItem>
            <MenuItem><Link to="/about">About</Link></MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
})

module.exports = PetPartnerNav
