const React = require('react')
const {Link} = require('react-router')
const PetPartnerNav = require('../components/navbar')


const About = React.createClass({
    render() {
        return (

            <div className="container" style={{background: "#ECECEA", color: "#558C89"}}>
              <PetPartnerNav/>
            <h1 className="dim b f2 f-headline-ns tc db mb3 mb4-ns">About Pet Partner</h1>
            <div className="main">
                <div className="row">
                    <div className="col-lg-4 text-center">
                        <img className="img-circle" src="http://www.pfma.org.uk/_assets/images/general/image/Mixed_Pets.jpg" alt="Generic placeholder image" width="200" height="200"/>
                        <h3>Great for Pets</h3>
                        <p>Coordinate pet medical records and keep track of vaccinations so the pet receives the best possible care.</p>
                        <p>
                            <Link to="/pets" className="btn btn-default">View details &raquo;</Link>
                        </p>
                    </div>

                    <div className="col-lg-4 text-center">
                        <img className="img-circle" src="http://www.petsworld.in/blog/wp-content/uploads/2015/05/dog-care1.jpg" alt="Generic placeholder image" width="200" height="200"/>
                        <h3>Great for Owners</h3>
                        <p>Access to pet's medical records so they're in the know. </p>
                        <p>
                            <Link to="/pets" className="btn btn-default">View details &raquo;</Link>
                        </p>
                    </div>

                    <div className="col-lg-4 text-center">
                        <img className="img-circle" src="http://mypetvalues.com/vet-finder/vets-and-pets.jpg" alt="Generic placeholder image" width="200" height="200"/>
                        <h3>Easy for Veterinary Professionals</h3>
                        <p>Update records with a click of a button</p>
                        <p>
                            <Link to="/pets" className="btn btn-default">View details &raquo;</Link>
                        </p>
                    </div>

                </div>
            </div>
            <Link to="/">Home</Link>
        </div>

  )
    }
})

module.exports = About
