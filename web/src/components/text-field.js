const React = require('react')

const TextField = React.createClass({
  render() {
    const labelStyle = {display: 'block', color: 'green'}
    return (

        // <div className="form-group">
          <div>
          <label className="col-sm-12">{this.props.label}</label>

          {/* //<label style={labelStyle}>{this.props.label}</label> */}
          {/* <div className="col-sm-10"> */}
          <div className="col-sm-12">
            <input
              className="col-sm-10 form-control"
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange} />
          {/* </div> */}
          </div>
        </div>


    )
  }
})

module.exports = TextField
