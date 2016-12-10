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
            },
            parent_id: this.props.location.query.pet_id ? this.props.location.query.pet_id :
              this.props.params

      },
      pet: {},
      resolved: false
    }
  },
  componentDidMount() {
    data.list("categories")
      .then(res => {
        console.log(res.docs)
        return res})
      .then(res => this.setState({categories: res.docs}))
    // if(this.props.location.query.pet_id)
    //   data.get("pets", this.props.location.query.pet_id)
    //     .then()
    data.get("pets", this.props.location.query.pet_id)
      .then(res =>this.setState({pet: res}))
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
      procedure.petname = this.state.pet.name
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
    const nameChange = this.props.params.id ? this.state.procedure.petname : this.state.pet.name
    //const petName = this.props.location.query.name ? this.props.location.query.name : null
    return (
      <div>
        {this.state.resolved ? <Redirect to={`/pets/${this.props.location.query.pet_id}/show`} /> : null}
        <h1>{titleChange} Procedure</h1>
        {/* <h2>{petName}</h2> */}
        <h2>{this.props.location.query.name}</h2>
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
          <h3>{this.state.pet.name}</h3>

          <TextField label="Pet Name"
            type="text"
            value={nameChange}
            onChange={this.handleChange('petname')} />

            <TextField label="Procedure"
              type="text"
              value={this.state.procedure.proc}
              onChange={this.handleChange('proc')} />



          <div>
            <button>Submit</button>
            <Link to={`/pets/${this.props.location.query.pet_id}/show`}>Cancel</Link>
          </div>

        </form>
      </div>
    )
  }
})
module.exports = ProcedureForm
