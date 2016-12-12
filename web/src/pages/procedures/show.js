//procedures show page//
const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm')
const PetCard = require('../pets/card')
const {set, lensProp} = require('ramda')
const PetPartnerNav = require('../../components/navbar')


const Procedure = React.createClass({
  getInitialState() {
    return {
      procedure: {},
      removed: false,
      showconfirm: false
    }
  },
  componentDidMount() {
    data.get("procedures", this.props.params.id)
      .then(procedure => data.get('pets', procedure.parent_id)
        .then(pet => set(lensProp('pet'), pet, procedure))
      )
      .then(procedure => {
        console.log("this is now a procedure", procedure)
        return procedure
      })
      .then(procedure => this.setState({procedure: procedure}))
  },
  handleCancel(e) {
    e.preventDefault()
    this.setState({showconfirm: false})
  },
  handleConfirm() {
    data.remove('procedures', this.props.params.id, this.state.procedure)
      .then(res => {
        this.setState({
          removed: true,
          showconfirm: false
        })
      })
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
  },
  render() {
    return (
      <div>
        <PetPartnerNav />
        {this.state.removed ? <Redirect to={`/pets/${this.props.location.query.parent_id}/show`} /> : null}
        {this.state.showconfirm ?
          <Confirm
            msg="Are you sure?"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null }

        {this.state.showconfirm ? null :

          <div>

            {this.state.procedure.pet ? <PetCard pet={this.state.procedure.pet} /> : null}
            <div className="container tc">
            <h1>{this.state.procedure.proc}</h1>

              <nav>
                {/* <Link to={`/procedures/${this.state.procedure._id}/edit?parent_id=${this.state.procedure.parent_id}`}>Edit Procedure</Link> */}

              <Link to={`/procedures/${this.state.procedure._id}/edit?parent_id=${this.state.procedure.parent_id}`}>Edit Procedure</Link>
              |
              <a href="#" onClick={this.handleRemove}>Remove</a>
              |
              <Link to={`/pets/${this.props.location.query.parent_id}/show`}>Back to {this.state.procedure.petname} </Link>
              </nav>
            </div>
           </div>
           }
      </div>

    )
  }
})

module.exports = Procedure
