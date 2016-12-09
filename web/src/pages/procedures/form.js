const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')() //it is a factory function that runs the data factory so we need to call it here.
const TextField = require('../../components/text-field')

const ProcedureForm = React.createClass({
  getInitialState() {
    return {
      categories: [],
      procedure: {
            date: '',
            petname: '',
            proc: '',
            category: {
              _id: "",
              name: ""
            }
      },

      resolved: false
    }
  },
  componentDidMount() {
    data.list("categories")
      .then(res => {
        console.log(res.docs)
        return res})
      .then(res => this.setState({categories: res.docs}))
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
  handleSelect(e) {
    const procedure = {...this.state.procedure}
    const categories = [...this.state.categories]
    console.log(categories)
    procedure.category = categories.find(category => {
      return category._id === e.target.value
    })
    // console.log(procedure)
    this.setState({procedure})
  },
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.procedure._id) {
      data.put('procedures', this.state.procedure._id, this.state.procedure)
       .then(res => {
         console.log("this is state; ", this.state.procedure)
         return res
       })
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
          <div>
            <label>Category</label>
            <select value={this.state.procedure.category._id} onChange={this.handleSelect}>
              <option value='-1'>Select</option>
              {this.state.categories.map(cat =>
                <option key={cat._id} value={cat._id}>{cat.name}</option>)}
            </select>
          </div>
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
