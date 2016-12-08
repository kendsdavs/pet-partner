const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
const { pluck , props } = require('ramda')

const Owners = React.createClass({
  getInitialState() {
    return {
      owners: []
    }
  },
  componentDidMount() {
    data.list('owners')
      .then(rows => {
        console.log('rows',rows)
        // const owners = pluck('_id'),rows.docs)
        console.log('rows',rows)
        console.log("these are the owners ", rows.docs)
        this.setState({owners: rows.docs})
      })

  },
  render() {
    const list = owner => <li key={owner._id}>
      {owner.firstName + " " + owner.lastName}</li>
    return (
      <div>
        <h1>Owners</h1>
          <ul>
            {this.state.owners.map(list)}
          </ul>
        <Link to="/owners/new">Add Owner</Link>
        |
        <Link to="/">Home</Link>
        {/* <pre>
          {JSON.stringify(this.state,null,2)}
        </pre> */}
      </div>

    )
  }
})
module.exports = Owners
