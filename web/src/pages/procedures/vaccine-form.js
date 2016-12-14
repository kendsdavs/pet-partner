const React = require('react')
// const {FormGroup, Button, ControlLable, Grid, Row, Col, Form, Checkbox} = require('react-bootstrap')
//const Vacbox = require("../../components/checkbox")
const data = require('../../utils/data')()
const {Panel, Button} = require('react-bootstrap')

const items =["vaccine 1", "vaccine 2", "vaccine 3"]

const VaccineForm = React.createClass({
  getInitialState() {
    return {
    // pet: {
    //   injections: []
    // },
    vaccines: [
      {
      name: "Lyme Disease",
      _id: 1
      },
      {
      name: "Distemper",
      _id: 2
    },{
      name: "Adenovirus 2",
      _id: 3
    },{
      name: "Parvovirus",
      _id: 4
    },{
      name: "Leptospira",
      _id: 5
    }]
  }
},
  // componentDidMount() {
  //   data.get('pets', this.props.params.parent_id).then(res => {
  //     console.log("this is the pet", res)
  //     return res
  //   }).then(res => this.setState({pet: res}))
  // },
  addVac(vaccine) {
      return (e) => {
          let injections = this.props.pet.injections.filter(injection => injection._id !== vaccine._id)
          let pet = {
              ...this.props.pet
          }
          pet.injections = [
              vaccine, ...injections
          ]
          console.log("pet injections", pet.injections)
          this.setState({pet})
      }
  },
  removeInjection(i) {
      return (e) => {
          let injections = this.props.pet.injections.filter(inject => inject._id !== i._id)
          let pet = {
              ...this.props.pet
          }
          pet.injections = injections
          this.setState({pet})
      }
  },
  updateVacRecord(e) {
      e.preventDefault()
      console.log("this.state.pet", this.props.pet)
      data.put('pets', this.props.pet._id, this.props.pet).then(res => {
          console.log("the pet record has been updated", res)
          return res
      }).then(res => this.setState({vacUpdate: true}))
  },
  render() {
    return (
      <div className="container">
          <main className="text-center">
          <div>
              <h2>Add Vaccine to Medical History</h2>
              {this.props.vaccines.map(v => <article className="mw5 dib bg-white br3 pa3 pa4-ns ma3 ba b--black-10">
                  <div className="tc">
                      <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you"/>
                      <h1 className="f3 mb2">{v.name}</h1>

                      <button onClick={this.props.addVac(v)}>Add</button>
                  </div>
              </article>)}
          </div>
          </main>
          <div>
            <main className="col-sm-8 col-sm-offset-2">
              <h3>Vaccine History</h3>

                  {this.props.pet.injections.map(i =>
                      <Panel className="dt w-100 bb b--black-05 pb2 mt2">

                          <div className="col-sm-6">
                              <h5>{i.name}</h5>
                          </div>
                          <div className="col-sm-6">
                              <form className="w-100 tr">
                                  <Button className="btn btn-danger" bsSize="xsmall"
                                      onClick={this.props.removeInjection}>Remove</Button>
                             </form>
                          </div>
                      </Panel>
                  )}

              </main>
          </div>
          <div>
              <hr/>
              <button onClick={this.props.updateVacRecord}>Update Record</button>
          </div>
      </div>
    )
  }
})

module.exports = VaccineForm
