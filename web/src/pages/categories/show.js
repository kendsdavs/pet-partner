const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm')

const Category = React.createClass({
  getInitialState() {
    return {
      category: '',
      removed: false,
      showconfirm: false
    }
  },
  componentDidMount() {
    data.get("categories", this.props.params.id)
      .then(res => {
        this.setState({category: res})
      })
  },
  handleConfirm() {
    data.remove('categories', this.props.params.id, this.state.category)
     .then(res => {
       console.log("results ", res)
       this.setState({
         removed: true,
         showconfirm:false
       })
     })

  },
  handleCancel(e) {
    e.preventDefault()
    this.setState({showconfirm: false})
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
  },
  render() {
    return (
      <div>
        {this.state.removed ? <Redirect to="/categories" /> : null}

        {this.state.showconfirm ?
          <Confirm
            msg="Are you sure"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null }

        {this.state.showconfirm ? null :
            <div>
                <h1>Category Details</h1>
                <h2>{this.state.category.name}</h2>
              <nav>
                <a href="#" onClick={this.handleRemove}>Remove</a>
                ||
                <Link to="/categories">Back</Link>
                ||
                <Link to={`/categories/${this.state.category._id}/edit`}>Edit Category</Link>
              </nav>
            </div>
          }

      </div>
    )
  }
})

module.exports = Category
