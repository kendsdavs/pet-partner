const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const TextField = require('../../components/text-field')

const CategoryForm = React.createClass({
  getInitialState() {
    return {
      category: '',
      resolved: false
    }
  },
  componentDidMount() {
    if(this.props.params.id) {
      data.get("categories", this.props.params.id)
        .then(res => {
          this.setState({category:res})
        })
    }
  },
  handleChange(field) {
    return (e) => {
      let category = {...this.state.category}
      category[field] = e.target.value
      this.setState({category})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    data.post("categories", this.state.category)
    this.setState({resolved: true})
  },
  render() {
    const titleChange = this.props.params.id ? "Edit" : "New"
    return (
      <div>
        {this.state.resolved ? <Redirect to="/categories" /> : null}
        <h1>{titleChange} Category</h1>
        <form onSubmit={this.handleSubmit}>

          <TextField label="Category Name"
            type="text"
            value={this.state.category.name}
            onChange={this.handleChange('name')} />

          <div>
            <button>Submit</button>
            |
            <Link to="/categories">Back</Link>

          </div>
        </form>
      </div>
    )
  }
})
module.exports = CategoryForm
