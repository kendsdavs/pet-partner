const React = require('react')
const {FormGroup, Button, ControlLable, Grid, Row, Col, Form, Checkbox} = require('react-bootstrap')
//const Vacbox = require("../../components/checkbox")

const items =["vaccine 1", "vaccine 2", "vaccine 3"]

let VaccineForm = React.createClass({
  handleFormSubmit(e) {
    e.preventDefault();
    for (let checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.')
    }
  },
  toggleCheckbox(label) {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label)
    } else {
      this.selectedCheckboxes.add(label)
    }
  },
  componentWillMount() {
    console.log("new set created")
    this.selectedCheckboxes = new Set()
  },
  createCheckbox(label) {
    return <Checkbox
      value={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label} />
  },
  createCheckboxes() {
    return items.map(this.createCheckbox)
  },
  render() {
    return (
      <Grid><Row><Col xs={12}>
      <Form onSubmit={this.handleFormSubmit}>
        {this.createCheckbox()}
      <Button type="submit">Save Vaccines</Button>
    </Form>
    </Col></Row></Grid>
    )
  }
})

module.exports = VaccineForm
