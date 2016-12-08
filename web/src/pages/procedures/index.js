const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { pluck , props } = require('ramda')

const Procedures = React.createClass({
  getInitialState() {
    return {
      procedures: []
    }
  },
  componentDidMount() {
    data.list('procedures')
      .then(rows => {
        console.log('rows',rows)
        // const owners = pluck('_id'),rows.docs)
        console.log('rows',rows)
        console.log("these are the procedures ", rows.docs)
        this.setState({procedures: rows.docs})
      })

  },
  render() {
    const list = p => <li key={p._id}><Link to={`/procedures/${p._id}/show`}>
      {p.petname + " " + p.date + " " + p.proc}
    </Link>
      </li>
    return (
      <div>
        <h1>Procedures</h1>
          <ul>
            {this.state.procedures.map(list)}
          </ul>
        <Link to="/procedures/new">Add Procedure</Link>
        |
        <Link to="/">Home</Link>
        |
        <Link to="/categories">View Categories</Link>
        {/* <pre>
          {JSON.stringify(this.state,null,2)}
        </pre> */}
      </div>

    )
  }
})
module.exports = Procedures
