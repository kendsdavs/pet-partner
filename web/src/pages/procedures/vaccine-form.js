const React = require('react')
// const {FormGroup, Button, ControlLable, Grid, Row, Col, Form, Checkbox} = require('react-bootstrap')
//const Vacbox = require("../../components/checkbox")

const items =["vaccine 1", "vaccine 2", "vaccine 3"]

let VaccineForm = React.createClass({
  getInitialState() {
    return {
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
    }],

    injections: [{
      name: "Coronavirus",
      _id: 6
    },{
      name: "Bordetella",
      _id: 7
    }]
  }
},
  addVac(vaccine) {
    return(e) => {
      let injections = this.state.injections.filter(injection =>
        injection._id !== vaccine._id)
      this.setState({injections: [vaccine, ...injections]})
    }
  },
  removeInjection(i) {
    return (e) => {
      let injections = this.state.injections.filter(inject => inject._id !== i._id)
      this.setState({injections})
    }
  },
  render() {
    return (
      <div>
      <div>
        <h2>Add Vaccine to Medical History</h2>
         {this.state.vaccines.map(v =>
           <article className="mw5 dib bg-white br3 pa3 pa4-ns ma3 ba b--black-10">
            <div className="tc">
              <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you" />
              <h1 className="f3 mb2">{v.name + v._id}</h1>
              <button onClick={this.addVac(v)}>Add</button>
            </div>
          </article>
         )}
      </div>
      <div>
        <h3>Vaccine History</h3>
        <ul>
          {this.state.injections.map(i =>
            <li key={i._id}>
              {i.name}
              <button onClick={this.removeInjection}>Remove</button>
            </li>
          )}
        </ul>
      </div>
      </div>
    )
  }
})

module.exports = VaccineForm
