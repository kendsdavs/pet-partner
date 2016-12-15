const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const TextField = require('../../components/text-field')
const {Form, Grid, Row, Col, Button, FormGroup} = require('react-bootstrap')


const CategoryForm = React.createClass({
  getInitialState() {
    return {
      category: {},
      resolved: false
    }
  },
  componentDidMount() {
    if(this.props.params.id) {
      data.get("categories", this.props.params.id)
        .then(res => {
        console.log("component mount res", res)
        return res
      })
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
    if(this.state.category._id) {
      data.put("categories", this.state.category._id, this.state.category)
        .then(res => this.setState({resolved: true}) )

    } else {

      data.post("categories", this.state.category)
      .then(res => this.setState({resolved: true}) )
    }
  },
  render() {
    const titleChange = this.props.params.id ? "Edit" : "New"
    return (
      <div>
        {this.state.resolved ? <Redirect to="/categories" /> : null}
        <Grid><Row><Col xs={8} xsOffset={2}>
        <h1>{titleChange} Category</h1>
         <Form inline onSubmit={this.handleSubmit}>
           <FormGroup controlId="formInlineName">
             <TextField label="Category Name"
              type="text"
              value={this.state.category.name}
              onChange={this.handleChange('name')} />
            </FormGroup>
          {" "}
            <Button bsStyle="primary">Submit</Button>
          {" "}
            <Link to="/categories" className="btn btn-default">Back</Link>


        </Form>
      </Col></Row></Grid>
      </div>
    )
  }
})
module.exports = CategoryForm
