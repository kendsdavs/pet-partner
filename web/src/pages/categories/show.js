const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const Category = React.createClass({
  getInitialState() {
    return {
      category: ''
    }
  },
  componentDidMount() {
    data.get("categories", this.props.params.id)
      .then(res => {
        this.setState({category: res})
      })
  },
  render() {
    return (
      <div>
        <h1>Category Details</h1>
        <h2>{this.state.category.name}</h2>
        <Link to="/categories">Back</Link>
      </div>
    )
  }
})

module.exports = Category
