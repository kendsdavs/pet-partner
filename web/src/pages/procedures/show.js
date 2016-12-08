//procedures show page//
const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const Procedure = React.createClass({
  getInitialState() {
    return {
      procedure: {},
      removed: false
    }
  },
  componentDidMount() {
    data.get("procedures", this.props.params.id)
      .then(res => this.setState({procedure: res}))
  },
  render() {
    return (
      <div>
        <h1>{this.state.procedure.proc}</h1>
        <Link to={`/procedures/${this.state.procedure._id}/edit`}>Edit Procedure</Link>
      </div>
    )
  }
})

module.exports = Procedure
