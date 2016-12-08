const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const TextField = require('../../components/text-field')

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
                gender: ''

            },
            resolved: false
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
    handleSubmit(e) {
        e.preventDefault()
        data.post("pets", this.state.pet)
        this.setState({resolved: true})
    },
    render() {
        return (
            <div>
                {this.state.resolved ? <Redirect to='/owners' /> : null}
                <h1>Add Pet</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField label="Name" type="text" value={this.state.pet.name} onChange={this.handleChange('name')}/>

                    <TextField label="Animal Type" type="text" value={this.state.pet.animal_type} onChange={this.handleChange('animal_type')}/>

                    <TextField label="Breed" type="text" value={this.state.pet.breed} onChange={this.handleChange('breed')}/>

                    <TextField label="Date of Birth" type="date" value={this.state.pet.dob} onChange={this.handleChange('dob')}/>

                    <TextField label="Markings" type="text" value={this.state.pet.markings} onChange={this.handleChange('markings')}/>

                    <TextField label="Gender" type="text" value={this.state.pet.gender} onChange={this.handleChange('gender')}/>

                    <TextField label="Breeder" type="text" value={this.state.pet.breeder} onChange={this.handleChange('breeder')}/>

                    <TextField label="Owner" type="text" value={this.state.pet.owner} onChange={this.handleChange('owner')}/>

                    <div>
                        <button>Submit</button>
                        <Link to="/pets">Cancel</Link>
                    </div>

                </form>
            </div>

        )
    }
})
module.exports = PetForm
