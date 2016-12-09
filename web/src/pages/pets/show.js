//pets show page//
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm')

const Pet = React.createClass({
    getInitialState() {
        return {
            pet: {},
            removed: false,
            showconfirm: false,
            procedures:[]}
    },
    componentDidMount() {
        data.get("pets", this.props.params.id).then(res => this.setState({pet: res}))
        data.list('procedures')
            .then(procedures => {
                console.log("procedures are here ", procedures)
                return procedures
            })
          .then(procedures => procedures = procedures.docs)
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
        const record = procedure =>
            <tr>
                <td>{procedure.proc}</td>
                <td>{procedure.date}</td>
                <td>{procedure.category.name}</td>
            </tr>
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
                        <main>
         {/* this.props.location.query.pet_id */}
         {/* this.props.location.query.name */}

         {/* <Link to={`/procedures/new?pet_id=${this.state.pet.id}&name=${this.state.pet.name}`}>New Procedure</Link> */}

                 <h3>Procedures</h3>
                 <table>
                   <thead>
                     <tr>
                       <td>Name</td>
                       <td>Date</td>
                       <td>Category</td>
                     </tr>
                   </thead>
                   <tbody>
                     {this.state.procedures.map(record)}
                   </tbody>

                 </table>

                        <nav>

                            <Link to={`/procedures/new?pet_id=${this.state.pet._id}&name=${this.state.pet.name}`}>Add Procedure</Link>
                            |
                            <Link to="/pets">Back to Pets</Link>
                            |
                            <a href="#" onClick={this.handleRemove}>Remove</a>
                            |
                            <Link to="/procedures">View History</Link>
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
