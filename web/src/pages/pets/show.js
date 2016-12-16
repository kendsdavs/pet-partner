//pets show page//procedure show page//pets-card show page
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Procedures = require('../procedures')
const PetCard = require('./card')
const Confirm = require('../../components/confirm')
const PetPartnerNav = require('../../components/navbar')
import {Row, Col,} from 'react-bootstrap'

const Pet = React.createClass({
    getInitialState() {
        return {pet: { name: '', ownerLastName: '', ownerFirstName:''}, removed: false, showconfirm: false, procedures: []}
    },
    componentDidMount() {
        data.get("pets", this.props.params.id).then(res => this.setState({pet: res}))
        data.list('procedures')
        //     .then(procedures => {
        //     console.log("procedures are here ", procedures)
        //     return procedures
        // })
            .then(procedures => procedures.filter(proc => proc.parent_id === this.state.pet._id))
            .then(procedures => this.setState({procedures: procedures}))
    },
    handleCancel(e) {
        e.preventDefault()
        this.setState({showconfirm: false})
    },
    handleConfirm() {
        data.remove('pets', this.props.params.id, this.state.pet).then(res => {
            this.setState({removed: true, showconfirm: false})
        })
    },
    handleRemove(e) {
        e.preventDefault()
        this.setState({showconfirm: true})
    },
    render() {
        return (
            <div>
                <PetPartnerNav/> {this.state.removed
                    ? <Redirect to="/pets"/>
                    : null}
                {/* Remove a pet from the database */}
                {this.state.showconfirm
                    ? <Confirm msg="Are you sure?" onCancel={this.handleCancel} onConfirm={this.handleConfirm}/>
                    : null}
                {/* If not showing the Confirm delete screen show this */}
                {this.state.showconfirm
                    ? null
                    : <div className="container">
                {/* Left side bar */}
                        <Row>
                            <Col xs={3}>
                                <h3>Vaccine Quick View</h3>
                                {/* Saved in the pet object as injections */}
                                <h4>Received</h4>
                                <ul className="list">
                                {this.state.pet._id ? this.state.pet.injections.map(i =>
                                  <li>{i.name}</li>
                              ) : null }
                                </ul>
                                {' '}
                                {/* ToDo: <h4>Upcoming Vaccines</h4> */}

                            </Col>
                {/* middle pet card from pets/card.js */}
                            <Col xs={6}>

                                    <PetCard pet={this.state.pet}/>

                            </Col>
                {/* right side bar */}
                            <Col xs={3} className="text-right">

                                <nav>
                                    <Link className="btn btn-primary btn-block" to="/pets">Back to Pets</Link>
                                    <br />
                                    <Link className="btn btn-info btn-block" to={`/pets/${this.state.pet._id}/edit`}>Edit Pet</Link>
                                    <br />
                                    <a className="btn btn-danger btn-block" href="#" onClick={this.handleRemove}>Remove Pet</a>

                                </nav>
                            </Col>
                        </Row>
                        <br />
                        <br />
                            <main>
                    {/* procedures table from procedures/index.js */}
                                {this.state.pet._id
                                    ? <Procedures petID={this.state.pet._id}/>
                                    : null}
                            </main>
                        </div>}
            </div>

        )

    }
})
module.exports = Pet
