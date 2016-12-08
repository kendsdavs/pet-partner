///categories index///

const React = require('react')
const {Link} = require('react-router')
const data = require('../../utils/data')()

const Categories = React.createClass({
  getInitialState() {
    return {
      categories: []
    }
  },
  componentDidMount() {
    data.list('categories')
      .then(rows => {
        console.log("these are cats", rows.docs)
        this.setState({categories: rows.docs})
      })
  },
  render() {
    const list = c => <li key={c._id}>
      <Link to={`/categories/${c._id}/show`}>
      {c.name}
    </Link>
  </li>
    return (
      <div>
        <h1>Categories</h1>
        <ul>
        {this.state.categories.map(list)}
        </ul>
      <Link to="/categories/new">Add Category</Link>
      |
      <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Categories
