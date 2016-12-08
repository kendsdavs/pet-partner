//procedures show page//
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm')

const Procedure = React.createClass({
  getInitialState() {
    return {
      procedure: {},
      removed: false,
      showconfirm: false
    }
  },
  componentDidMount() {
    data.get("procedures", this.props.params.id)
      .then(res => this.setState({procedure: res}))
  },
  handleCancel(e) {
    e.preventDefault()
    this.setState({showconfirm: false})
  },
  handleConfirm() {
    data.remove('procedures', this.props.params.id, this.state.procedure)
      .then(res => {
        this.setState({
          removed: true,
          showconfirm: false
        })
      })
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
  },
  render() {
    return (
      <div>
        {this.state.removed ? <Redirect to="/procedures" /> : null}
        {this.state.showconfirm ?
          <Confirm
            msg="Are you sure?"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null }

        {this.state.showconfirm ? null :
          <div>
            <h1>{this.state.procedure.proc}</h1>
              <nav>
              <Link to={`/procedures/${this.state.procedure._id}/edit`}>Edit Procedure</Link>
              |
              <a href="#" onClick={this.handleRemove}>Remove</a>
              |
              <Link to="/procedures">Back to Procedures</Link>
              </nav>
           </div>
           }
      </div>

    )
  }
})

module.exports = Procedure
