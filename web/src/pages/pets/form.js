const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const TextField = require('../../components/text-field')
const {Grid, Row, Col, Well} = require('react-bootstrap')

const PetForm = React.createClass({
    getInitialState() {
        return {
            pet: {
                name: '',
                animal_type: '',
                breed: '',
                dob: '',
                markings: '',
                owner: '',
                gender: '',
                address: '',
                phone: '',
                file: '',
                email: ''


            },

            resolved: false
        }
    },
    componentDidMount() {
        if(this.props.params.id) {
            console.log("pet id in state ", this.props.params.id)
            data.get("pets", this.props.params.id)
              .then(res => {
                  console.log("results that were mounted ", res)
                  return res
              })
              .then(res => {
                  this.setState({pet: res})
              })
        }
    },
    handleChange(field) {
        return (e) => {
            let pet = {
                ...this.state.pet
            }
            pet[field] = e.target.value
            this.setState({pet})
        }
    },
    handleFile(e) {
        const pet = {...this.state.pet}
        const reader = new window.FileReader()
        reader.addEventListener('load', () => {
            pet.file = reader.result
            console.log(pet)
            this.setState({pet})
        }, false)
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    },
    handleSubmit(e) {
        e.preventDefault()
        if(this.state.pet._id) {
            console.log("id ", this.state.pet._id)
            data.put("pets", this.state.pet._id, this.state.pet)
            this.setState({resolved: true})
        } else {

        data.post("pets", this.state.pet)
        this.setState({resolved: true})
      }
    },
    render() {
      const formName = this.props.params.id ? "Edit" : "New"
      const link = this.props.params.id ? `/pets/${this.props.params.id}/show` : "/pets"
        return (
            <div>
                {this.state.resolved ? <Redirect to='/pets' /> : null}
                <div className="page-header">
                    <h1 className="text-center">{formName} Pet</h1>
                </div>

                <Grid><Row><Col xs={8} xsOffset={2}>
                  <Well>
                <form onSubmit={this.handleSubmit}>
                    <TextField label="Name" type="text" value={this.state.pet.name} onChange={this.handleChange('name')}/>

                    <TextField label="Animal Type" type="text" value={this.state.pet.animal_type} onChange={this.handleChange('animal_type')}/>

                    <TextField label="Breed" type="text" value={this.state.pet.breed} onChange={this.handleChange('breed')}/>

                    <TextField label="Date of Birth" type="date" value={this.state.pet.dob} onChange={this.handleChange('dob')}/>

                    <TextField label="Markings" type="text" value={this.state.pet.markings} onChange={this.handleChange('markings')}/>

                    <TextField label="Gender" type="text" value={this.state.pet.gender} onChange={this.handleChange('gender')}/>

                    <TextField label="Breeder" type="text" value={this.state.pet.breeder} onChange={this.handleChange('breeder')}/>

                    <TextField label="Owner Name" type="text" value={this.state.pet.owner} onChange={this.handleChange('owner')}/>

                    <TextField label="Address" type="text" value={this.state.pet.address} onChange={this.handleChange('address')}/>

                    <TextField label="Phone" type="text" value={this.state.pet.phone} onChange={this.handleChange('phone')}/>

                    <TextField label="Email" type="email" value={this.state.pet.email} onChange={this.handleChange('email')}/>

                    <input type="file" onChange={this.handleFile} />
                    <div>
                       <img src={this.state.pet.file} style={{height: '200px'}} />
                     </div>
                    <div>
                        <button>Submit</button>
                        <Link to={link}>Cancel</Link>
                    </div>

                </form>
                </Well>
                </Col></Row></Grid>
            </div>

        )
    }
})
module.exports = PetForm
