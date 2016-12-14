const React = require('react')
const {Link} = require('react-router')


const PetPartnerNav = React.createClass({
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/* <!-- Brand and toggle get grouped for better mobile display --> */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Pet Partner</a>
          </div>

    {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        {/* <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li> */}
        <li className="active"><Link to="/about">About <span className="sr-only">(current)</span></Link></li>
        <li><a href="#">New User</a></li>
        <li className="dropdown">
          <Link to="/pets" className="dropdown-toggle" data-toggle="dropdown"
            role="button" aria-haspopup="true" aria-expanded="false">Find A Pet
            <span className="caret"></span></Link>
          <ul className="dropdown-menu">
            <li><Link to="/pets">Find a Pet</Link></li>
            <li role="separator" className="divider"></li>
            <li><Link to="/procedures/new">Add a Procedure</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
  }
})

module.exports = PetPartnerNav
