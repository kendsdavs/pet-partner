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
  componentDidMount() {
    if(this.props.params.id) {
      data.get("procedures", this.props.params.id)
        .then(res => {
          this.setState({procedure: res})
        })
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
    if (this.state.procedure._id) {
      data.put('procedures', this.state.procedure._id, this.state.procedure)
       .then(res => this.setState({resolved: true}) )
    } else {
    data.post('procedures', this.state.procedure)
       .then(res => this.setState({resolved: true})  )
    }
  },
  render() {
    const titleChange = this.props.params.id ? "Edit" : "New"
    return (
      <div>
        {this.state.resolved ? <Redirect to='/procedures' /> : null}
        <h1>{titleChange} Procedure</h1>
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
