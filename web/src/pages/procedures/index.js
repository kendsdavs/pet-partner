const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { filter, propEq} = require('ramda')
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';


const Procedures = React.createClass({
  getInitialState() {
    return {
      procedures: []
    }
  },
  componentDidMount() {
    data.list('procedures')
      .then(procedures => {
        console.log("these are the results of mount", procedures)
        return procedures
      })

      .then(filter(propEq('parent_id', this.props.petID)))
      .then(procedures => {
        this.setState({procedures: procedures})
  // .then(procedures => procedures = procedures.doc)
      })

  },
  render() {
    const record = procedure =>
        <tr key={procedure._id}>
            <td><Link to={`/procedures/${procedure._id}/show?parent_id=${this.props.petID}`}>{procedure.proc}</Link></td>
            <td>{procedure.date}</td>
            <td>{procedure.category.name}</td>
        </tr>
    return (
      <div className="container">
        <Grid>
                <Row>
                    <Col xs={6} md={8}>
                      <h3>Procedures</h3>
                    </Col>
                    <Col xs={6} md={2} mdOffset={2}>
                      <Button><Link to={`/procedures/new?parent_id=${this.props.petID}&pet_id=${this.props.petID}`}>Add Procedure</Link></Button>
                    </Col>
                  </Row>
            </Grid>

        {/* <Button pullRight>
          <Link to={`/procedures/new?pet_id=${this.props.petID}`}>Add Procedure</Link>
        </Button> */}

        {/* <Link to={`/procedures/new?pet_id=${this.state.pet._id}&name=${this.state.pet.name}`}>Add Procedure</Link> */}

          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Date</td>
                <td>Category</td>
              </tr>
            </thead>
            <tbody>
              {this.state.procedures.map(record)}
            </tbody>

          </Table>
        {/* <Link to="/procedures/new">Add Procedure</Link> */}

      </div>

    )
  }
})
module.exports = Procedures
