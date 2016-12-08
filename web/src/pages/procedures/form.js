const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')() //it is a factory function that runs the data factory so we need to call it here.
const TextField = require('../../components/text-field')

const ProcedureForm = React.createClass({
  getInitialState() {
    return {
      procedure: {
            date: '',
            petname: '',
            proc: ''
      },
      resolved: false
    }
  },
  handleChange(field) {
    return (e) => {
      let procedure = {...this.state.procedure}
      procedure[field] = e.target.value
      this.setState({procedure})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    data.post('procedures', this.state.procedure)
    this.setState({resolved: true})
  },
  render() {
    return (
      <div>
        {this.state.resolved ? <Redirect to='/owners' /> : null}
        <h1>New Procedure</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField label="Date"
            type="date"
            value={this.state.procedure.date}
            onChange={this.handleChange('date')} />

          <TextField label="Pet Name"
            type="text"
            value={this.state.procedure.petname}
            onChange={this.handleChange('petname')} />

            <TextField label="Procedure"
              type="text"
              value={this.state.procedure.proc}
              onChange={this.handleChange('proc')} />

          <div>
            <button>Submit</button>
            <Link to="/pets">Cancel</Link>
          </div>

        </form>
      </div>
    )
  }
})
module.exports = ProcedureForm
