const React = require('react')

const TextField = React.createClass({
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <div>
          <input
            type={this.props.type}
            value={this.props.value}
            onChange={this.props.onChange} />
        </div>
      </div>
    )
  }
})

module.exports = TextField
