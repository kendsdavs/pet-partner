const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')() //it is a factory function that runs the data factory so we need to call it here.
const TextField = require('../../components/text-field')
const OwnerForm = React.createClass({
  getInitialState() {
    return {
      owner: {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: ''


      },
      resolved: false
    }
  },
  handleChange(field) {
    return (e) => {
      let owner = {...this.state.owner}
      owner[field] = e.target.value
      this.setState({owner})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    data.post('owners', this.state.owner)
    this.setState({resolved: true})
  },
  render() {
    return (
      <div>
        {this.state.resolved ? <Redirect to='/owners' /> : null}
        <h1>New Owner</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField label="First Name"
            type="text"
            value={this.state.owner.firstName}
            onChange={this.handleChange('firstName')} />

          <TextField label="Last Name"
            type="text"
            value={this.state.owner.lastName}
            onChange={this.handleChange('lastName')} />

          <TextField label="Address"
            type="text"
            value={this.state.owner.address}
            onChange={this.handleChange('address')} />

          <TextField label="Email"
            type="email"
            value={this.state.owner.email}
            onChange={this.handleChange('email')} />

          <TextField label="Phone Number"
            type="text"
            value={this.state.owner.phone}
            onChange={this.handleChange('phone')} />


          {/* <div>
            <label>First Name</label>
            <input value={this.state.owner.firstName} onChange={this.handleChange('firstName')}/>
          </div> */}
          <div>
            <button>Submit</button>
            <Link to="/owners">Cancel</Link>
          </div>

        </form>
      </div>
    )
  }
})
module.exports = OwnerForm
