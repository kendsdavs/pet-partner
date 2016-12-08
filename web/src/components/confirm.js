const React = require('react')

const Confirm = React.createClass({
  render() {
    return (
      <div>
        <h1>{this.props.msg}</h1>
        <button onClick={this.props.onConfirm}>Yes</button>
        <button onClick={this.props.onCancel}>No</button>
      </div>
    )
  }
})

module.exports = Confirm
