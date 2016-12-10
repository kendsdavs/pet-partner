const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { filter, propEq} = require('ramda')

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
      .then(procedures => procedures = procedures.docs)
      .then(filter(propEq('parent_id', this.props.petID)))
      .then(procedures => {
        this.setState({procedures: procedures})
      })

  },
  render() {
    const record = procedure =>
        <tr key={procedure._id}>
            <td>{procedure.proc}</td>
            <td>{procedure.date}</td>
            <td>{procedure.category.name}</td>
            <td><Link to={`/procedures/${procedure._id}/show?pet_id=${this.props.petID}`}>View</Link></td>
        </tr>
    return (
      <div>
        <h3>Procedures</h3>
        <Link to={`/procedures/new?pet_id=${this.props.petID}`}>Add Procedure</Link>

        {/* <Link to={`/procedures/new?pet_id=${this.state.pet._id}&name=${this.state.pet.name}`}>Add Procedure</Link> */}

          <table>
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

          </table>
        {/* <Link to="/procedures/new">Add Procedure</Link> */}

      </div>

    )
  }
})
module.exports = Procedures
