const React = require('react')
const {Link, Redirect} = require('react-router')
const data = require('../../utils/data')() //it is a factory function that runs the data factory so we need to call it here.
const TextField = require('../../components/text-field')
const {
    Tab,
    Tabs,
    FormGroup,
    Button,
    ControlLabel,
    Grid,
    Row,
    Col,
    FormControl,
    Form,
    Panel,
    Well
} = require('react-bootstrap')
const PetCard = require('../pets/card')


const ProcedureForm = React.createClass({
    getInitialState() {
        return {
            categories: [],
            procedure: {
                date: '',
                petname: '',
                proc: '',
                category: {
                    _id: "",
                    name: ""
                },
                parent_id: this.props.location.query.parent_id
                    ? this.props.location.query.parent_id
                    : this.props.params

            },
            pet: {
                injections: []
            },
            resolved: false,
            key: 1,
            vacUpdate: false,
            vaccines: [
                {
                    name: "Lyme Disease",
                    _id: 1
                }, {
                    name: "Distemper",
                    _id: 2
                }, {
                    name: "Adenovirus 2",
                    _id: 3
                }, {
                    name: "Parvovirus",
                    _id: 4
                }, {
                    name: "Leptospira",
                    _id: 5
                }
            ],
           catVac:[
               {
                   name: "catvac1",
                   _id: 1
               },
               {
                   name: "catvac2",
                   _id: 2
               },
               {
                   name: "catvac3",
                   _id: 3
               },
           ]
        }
    },
    componentDidMount() {
        data.list("categories").then(res => {
            console.log(res.docs)
            return res
        }).then(res => this.setState({categories: res.docs}))
        // if(this.props.location.query.pet_id)
        //   data.get("pets", this.props.location.query.pet_id)
        //     .then()
        data.get("pets", this.props.location.query.parent_id).then(res => this.setState({pet: res}))

        if (this.props.params.id) {
            data.get("procedures", this.props.params.id).then(res => {
                this.setState({procedure: res})
            })
        }
    },
    addVac(vaccine) {
        return (e) => {
            let injections = this.state.pet.injections.filter(injection => injection._id !== vaccine._id)
            let pet = {
                ...this.state.pet
            }
            pet.injections = [
                vaccine, ...injections
            ]
            console.log("pet injections", pet.injections)
            this.setState({pet})
        }
    },
    removeInjection(i) {
        return (e) => {
            let injections = this.state.pet.injections.filter(inject => inject._id !== i._id)
            let pet = {
                ...this.state.pet
            }
            pet.injections = injections
            this.setState({pet})
        }
    },
    handleChange(field) {
        return (e) => {
            let procedure = {
                ...this.state.procedure
            }
            procedure[field] = e.target.value
            procedure.petname = this.state.pet.name
            this.setState({procedure})
        }
    },
    handleSelect(e) {
        const procedure = {
            ...this.state.procedure
        }
        const categories = [...this.state.categories]
        console.log(categories)
        procedure.category = categories.find(category => {
            return category._id === e.target.value
        })
        // console.log(procedure)
        this.setState({procedure})
    },
    handleTab(key) {
        this.setState({key});
    },
    handleSubmit(e) {
        e.preventDefault()
        if (this.state.procedure._id) {
            data.put('procedures', this.state.procedure._id, this.state.procedure).then(res => {
                console.log("this is state; ", this.state.procedure)
                return res
            }).then(res => this.setState({resolved: true}))
        } else {
            data.post('procedures', this.state.procedure).then(res => this.setState({resolved: true}))
        }
    },
    updateVacRecord(e) {
        e.preventDefault()
        console.log("this.state.pet", this.state.pet)
        data.put('pets', this.state.pet._id, this.state.pet).then(res => {
            console.log("the pet record has been updated", res)
            return res
        }).then(res => this.setState({vacUpdate: true}))
    },
    render() {
        const titleChange = this.props.params.id
            ? "Edit"
            : "New"
        const nameChange = this.props.params.id
            ? this.state.procedure.petname
            : this.state.pet.name
        const petTypeVac = this.state.pet.animal_type === "dog" ? this.state.vaccines : this.state.catVac
        const petPic = this.state.pet.animal_type === "dog" ? "http://www.zastavki.com/pictures/originals/2013/Animals___Dogs_Dog_beagle_on_a_white_background_closeup_049955_.jpg"
            : "http://tachyons.io/img/avatar_1.jpg"
        //const petName = this.props.location.query.name ? this.props.location.query.name : null
        return (
            <div className="container">
                {this.state.resolved || this.state.vacUpdate
                    ? <Redirect to={`/pets/${this.props.location.query.parent_id}/show`}/>
                    : null}
                <Tabs activeKey={this.state.key} onSelect={this.handleTab} id="controlled-tab-example">
                    <Tab eventKey={1} title="Health Check">
                        <div className="container">
                            <div className="page-header">
                                <h1 className="col-sm-offset-1">{titleChange}
                                    Procedure</h1>
                            </div>

                            {/* <h2>{petName}</h2> */}
                            <h2>{this.props.location.query.name}</h2>
                            <Grid><Row><Col xs={8} xsOffset={2}>
                            <Well>
                            <form onSubmit={this.handleSubmit}>
                                <h3>{this.state.pet.name}</h3>

                                <Form inline>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>Category</ControlLabel>
                                    {" "}
                                        <FormControl componentClass="select" placeholder="select" value={this.state.procedure.category._id}
                                            onChange={this.handleSelect}>
                                            <option value="-1">select a category</option>
                                            {this.state.categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                        </FormControl>
                                </FormGroup>
                                {" "}
                                    <Link className="btn btn-info text-right" to={`/categories/new?parent_id=${this.state.procedure.parent_id}`}>Add a Category</Link>
                                </Form>

                                <TextField label="Date" type="date" value={this.state.procedure.date} onChange={this.handleChange('date')}/>

                                <TextField label="Pet Name" type="text" value={nameChange} onChange={this.handleChange('petname')}/>

                                <TextField label="Procedure" type="text" value={this.state.procedure.proc} onChange={this.handleChange('proc')}/>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    {' '}
                                    <Link className="btn btn-default" to={`/pets/${this.props.location.query.parent_id}/show`}>Cancel</Link>
                                </div>
                            </form>
                            </Well>
                            </Col></Row></Grid>
                        </div>
                            </Tab>
                            <Tab eventKey={2} title="Pet Info">

                                <br />
                                <Grid><Row><Col xs={8} xsOffset={2}>
                                    <PetCard pet={this.state.pet}/>
                                </Col></Row></Grid>

                            </Tab>
                            {/* <Tab eventKey={3} title="Vaccines"> <VaccineForm /> </Tab> */}
                            <Tab eventKey={3} title="Vaccines">
                              <div className="container">
                                  <main className="text-center">
                                  <div>
                                      <h2>Add Vaccine to Medical History</h2>
                                      {petTypeVac.map(v => <article className="mw5 dib bg-white br3 pa3 pa4-ns ma3 ba b--black-10">
                                          <div className="tc">
                                              <img src={petPic} className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you" alt="cat or dog"/>
                                              <h1 className="f3 mb2">{v.name}</h1>
                                              <button onClick={this.addVac(v)}>Add</button>
                                          </div>
                                      </article>)}
                                  </div>
                                  </main>
                                  <div>
                                    <main className="col-sm-8 col-sm-offset-2">
                                      <h3>Vaccine History</h3>

                                          {this.state.pet.injections.map(i =>
                                              <Panel className="dt w-100 bb b--black-05 pb2 mt2">

                                                  <div className="col-sm-6">
                                                      <h5>{i.name}</h5>
                                                  </div>
                                                  <div className="col-sm-6">
                                                      <form className="w-100 tr">
                                                          <Button className="btn btn-danger" bsSize="xsmall"
                                                              onClick={this.removeInjection(i)}>Remove</Button>
                                                     </form>
                                                  </div>
                                              </Panel>
                                          )}

                                      </main>
                                  </div>
                                  <div>
                                      <hr/>
                                      <button onClick={this.updateVacRecord}>Update Record</button>
                                  </div>
                              </div>

                            </Tab>

                        </Tabs>

                    </div>
)
}
})
module.exports = ProcedureForm
