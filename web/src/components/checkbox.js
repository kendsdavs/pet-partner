const React = require('react')
const {FormGroup, Checkbox} = require('react-bootstrap')

let Vacbox = React.createClass({
  getInitialState() {
    return {
      isChecked: false
    }
  },
  toggleCheckbox() {
    this.setState({
      isChecked: !this.state.isChecked
    })
    this.props.handleCheckboxChange(this.props.label)
  },
  render() {
    return (
      <FormGroup>
        <Checkbox value={this.props.label}>

          {this.props.label}
        </Checkbox>
      </FormGroup>

      // {/* <div className="checkbox">
      //   <label>
      //     <input type="checkbox"
      //       value={this.props.label}
      //       checked={this.props.isChecked}
      //       onChange={this.toggleCheckbox} />
      //
      //     {this.props.label}
      //   </label>
      // </div> */}

    )
  }
})

module.exports = Vacbox
