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
    // const list = p => <li key={p._id}><Link to={`/procedures/${p._id}/show`}>
    //   {p.petname + " " + p.date + " " + p.proc}
    // </Link>
    //  </li>
    return (
      <div>
        <h1>Procedures</h1>
          <ul>
            {this.state.procedures.map(procedure => <li>{procedure.proc}</li>)}
          </ul>
        {/* <Link to="/procedures/new">Add Procedure</Link> */}

      </div>

    )
  }
})
module.exports = Procedures
