//pets show page//
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Procedures = require('../procedures')
const PetCard = require('./card')
const Confirm = require('../../components/confirm')
const PetPartnerNav = require('../../components/navbar')

const Pet = React.createClass({
    getInitialState() {
        return {pet: {}, removed: false, showconfirm: false, procedures: []}
    },
    componentDidMount() {
        data.get("pets", this.props.params.id).then(res => this.setState({pet: res}))
        data.list('procedures').then(procedures => {
            console.log("procedures are here ", procedures)
            return procedures
        })
        //.then(procedures => procedures = procedures.docs)
            .then(procedures => procedures.filter(proc => proc.parent_id === this.state.pet._id)).then(procedures => this.setState({procedures: procedures}))
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
                {this.state.showconfirm
                    ? <Confirm msg="Are you sure?" onCancel={this.handleCancel} onConfirm={this.handleConfirm}/>
                    : null}

                {this.state.showconfirm
                    ? null
                    : <div>
                        <div className="container">
                            <PetCard pet={this.state.pet}/>
                        </div>
                        
                        <main>

                            {this.state.pet._id
                                ? <Procedures petID={this.state.pet._id}/>
                                : null}
                            <nav>
                                <Link to="/pets">Back to Pets</Link>
                                |
                                <a href="#" onClick={this.handleRemove}>Remove Pet</a>
                                |
                                <Link to={`/pets/${this.state.pet._id}/edit`}>Edit Pet</Link>
                            </nav>
                        </main>
                    </div>
}
            </div>

        )

    }
})
module.exports = Pet
