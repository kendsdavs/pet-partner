const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()

const Category = React.createClass({
  getInitialState() {
    return {
      category: '',
      removed: false
    }
  },
  componentDidMount() {
    data.get("categories", this.props.params.id)
      .then(res => {
        this.setState({category: res})
      })
  },
  handleRemove(e) {
    e.preventDefault()
    if(confirm('Are you sure you want remove?'))
    {
      console.log("remove this ", this.props.params.id)
      data.remove('categories', this.props.params.id, this.state.category)
       .then(res => {
         console.log("results ", res)
         this.setState({removed: true})
       })
    }
  },
  render() {
    return (
      <div>
        {this.state.removed ? <Redirect to="/categories" /> : null}

        <h1>Category Details</h1>
        <h2>{this.state.category.name}</h2>
        <a href="#" onClick={this.handleRemove}>Remove</a>
        ||
        <Link to="/categories">Back</Link>
        ||
        <Link to={`/categories/${this.state.category._id}/edit`}>Edit Category</Link>
      </div>
    )
  }
})

module.exports = Category
