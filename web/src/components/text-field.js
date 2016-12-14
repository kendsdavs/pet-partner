const React = require('react')

const TextField = React.createClass({
  render() {
    
    return (

        <div className="form-group">

          <label>{this.props.label}</label>

          {/* //<label style={labelStyle}>{this.props.label}</label> */}
          {/* <div className="col-sm-10"> */}

            <input
              className="form-control"
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange} />
          {/* </div> */}


      </div>


    )
  }
})

module.exports = TextField
