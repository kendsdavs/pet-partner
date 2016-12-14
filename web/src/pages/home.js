const React = require('react')
const {Link} = require('react-router')
import { Row, Col, Grid, Button } from 'react-bootstrap';
const PetPartnerNav = require('../components/navbar')
// const title = (
// <h3>Find a Pet</h3>
// );
// const panelsInstance = (
//   <div className="col-lg-4">
//
//
//   </div>
//   );

const Home = React.createClass({
  getInitialState() {
    return {
      logout: false,
      picture: "https://4.bp.blogspot.com/-wzLUaLfsakQ/UQAzUJ-6ZAI/AAAAAAAABqc/v7ALKRmMiGA/s1600/Doctors+and+Indonesian+Doctors+Oath+beautiful.png",
      nickname: ''
    }
  },
  componentDidMount() {
    // this.props.auth.notify(profile => {
    //   this.setState({})
    // })
    if (!this.props.auth.loggedIn() && this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }

  },
  render() {
    return (
      <div>
        {/* {panelsInstance} */}
        <PetPartnerNav />
        <Grid>
          <Row>
            <Col md={4} mdOffset={1}>
              <h2>Find a Pet</h2>
              <p>Look up a pets medical history here</p>
              <p><Button><Link to="/pets">Find a Pet</Link></Button></p>
            </Col>
            <Col md={4} mdOffset={2}>
              <h2>Add a Procedure</h2>
              <p>Ready to treat you patient?  Click here.</p>
              <p><Button><Link to="/pets">Add a Procedure</Link></Button></p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
})

module.exports = Home
