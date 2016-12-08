//pets show page//
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm')

const Pet = React.createClass({
    getInitialState() {
        return {pet: {}, removed: false, showconfirm: false}
    },
    componentDidMount() {
        data.get("pets", this.props.params.id).then(res => this.setState({pet: res}))

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
                {this.state.removed
                    ? <Redirect to="/pets"/>
                    : null}
                {this.state.showconfirm
                    ? <Confirm msg="Are you sure?" onCancel={this.handleCancel} onConfirm={this.handleConfirm}/>
                    : null}

                {this.state.showconfirm
                    ? null
                    : <div>
                        <h1>{this.state.pet.name}</h1>
                        <nav>

                            <Link to="/procedures/new">Add Procedure</Link>
                            |
                            <Link to="/pets">Back to Pets</Link>
                            |
                            <a href="#" onClick={this.handleRemove}>Remove</a>
                            |
                            <Link to="/procedures">View History</Link>
                            |
                            <Link to={`/pets/${this.state.pet._id}/edit`}>Edit Pet</Link>
                        </nav>
                    </div>
                }
            </div>

          )


}
})
module.exports = Pet
