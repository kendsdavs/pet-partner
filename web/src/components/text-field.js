const React = require('react')

const TextField = React.createClass({
    render() {

        return (

            <div className="form-group">

                <label>{this.props.label}</label>

                <input className="form-control"
                  type={this.props.type} 
                  value={this.props.value}
                  onChange={this.props.onChange}/>

            </div>

        )
    }
})

module.exports = TextField
