const React = require('react')
const {Link, Redirect} = require('react-router')
import { Row, Col, Grid, Button, Modal } from 'react-bootstrap';
const PetPartnerNav = require('../components/navbar')

const Home = React.createClass({
  getInitialState() {
    return {
      loggedout: false,
      picture: "https://4.bp.blogspot.com/-wzLUaLfsakQ/UQAzUJ-6ZAI/AAAAAAAABqc/v7ALKRmMiGA/s1600/Doctors+and+Indonesian+Doctors+Oath+beautiful.png",
      nickname: 'Local Vet',
      showLogout: false
    }
  },
  componentDidMount() {
    if (!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
  },
  close(e) {
    e.preventDefault()
    this.setState({showLogout: false})
  },

  logout(e) {
    this.props.auth.logout()
    console.log('logged out!')
    this.setState({loggedout:true, showLogout: true})
  },

  render() {
    return (

      <div className="container">

        <PetPartnerNav />
        { this.state.loggedout ? <Redirect to="/" /> : null }
        {this.state.showLogout ?
          <div className="static-modal">
          <Modal.Dialog >
            <Modal.Header>
              <Modal.Title>Logged Out</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center">
              <h1>You have been logged out of Pet Partner</h1>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>

          </Modal.Dialog>

      </div>
      : null }

      {this.state.showLogout ? null
        : <div className="container">
          <div style={{float: 'right'}}><Button onClick={this.logout}>Logout</Button></div>
          <img style={{height: '60px'}} src={this.state.picture} alt="headshot" />
          <br />
          {this.state.nickname}

        <Grid>
          <Row>
            <Col md={4}>
              <h2>Find A Pet</h2>
              <p>Look up a patient's medical history.</p>
              <p><Button><Link to="/pets">Find a Pet</Link></Button></p>
            </Col>
            <Col md={4}>
              <h2>Add A Pet</h2>
              <p>Add a new patient and begin their treatment.</p>
              <p><Button><Link to="/pets/new">Add a Pet</Link></Button></p>
            </Col>
            <Col md={4}>
              <h2>Add A Procedure</h2>
              <p>Ready to treat you patient?  Click here.</p>
              <p><Button><Link to="/pets">Add a Procedure</Link></Button></p>
            </Col>
          </Row>
        </Grid>
        </div>
      }
      </div>

    )
  }
})

module.exports = Home
