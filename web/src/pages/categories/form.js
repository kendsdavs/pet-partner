const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const TextField = require('../../components/text-field')
const { Grid, Row, Col, FormGroup} = require('react-bootstrap')


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
        {this.state.resolved ? <Redirect to={`/procedures/new?parent_id=${this.props.location.query.parent_id}`} /> : null}
        <Grid><Row><Col xs={8} xsOffset={2}>
        <h1>{titleChange} Category</h1>
         <form onSubmit={this.handleSubmit}>
           {/* <div className="form-group col-xs-6">
               <Row>
               <Col xs={4}>
                   <label for="Category Name">Category Name</label>
                   {' '}
               </Col>
               <Col xs={8}>
                   <input type="text" className="form-control" style={{width: '200px'}}
                     value={this.state.category.name} onChange={this.handleChange('name')}/>
               </Col>
               </Row>
           </div> */}



           <FormGroup controlId="formInlineName">
             <TextField label="Category Name"
              type="text"
              value={this.state.category.name}
              onChange={this.handleChange('name')} />
            </FormGroup>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
                {' '}
                <Link className="btn btn-default" to={`/procedures/new?parent_id=${this.props.location.query.parent_id}`}>Cancel</Link>
            </div>
          {/* {" "}
            <Button bsStyle="primary">Submit</Button>
          {" "}
            <Link to="/categories" className="btn btn-default">Back</Link> */}


        </form>
      </Col></Row></Grid>
      </div>
    )
  }
})
module.exports = CategoryForm
