var React = require("react");
var Default = require('./layouts/default');

class Singleiti extends React.Component {
  render() {
     console.log('display 1 iti');

    let username = this.props.username;
    let itiId = this.props.oneIti[0].iti_id;

    var url1 = "/shareitee/"+username;
    var url2 = "/shareitee/"+username+"/new";
    var url3 = "/shareitee/"+username+"/current";
    var url4 = "/shareitee/logout";

    let itiDetails = this.props.oneIti.map(iti => {
           return (

                <div className="card" id="oneday">
                    <div className="row no-gutters"id="onedayyyy">
                        <div className="col-md-4">
                            <img className="card-img" src={iti.photo_url}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body-day">
                                <h5 className="card-title">Day {iti.day}</h5>
                                    <p className="card-text">{iti.places}</p>
                            </div>
                        </div>
                    </div>
                </div>)
    });

    return (
        <Default>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <span className="navbar-brand mb-0 h1">share.itee</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="nav navbar-nav">
                      <a className="nav-item nav-link" href={url1}>Home</a>
                      <a className="nav-item nav-link" href={url2}>New</a>
                      <a className="nav-item nav-link" href={url3}>Current</a>
                      <a className="nav-item nav-link" href={url4}>Log out</a>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                      <p className="header-username" id="username">{username}</p>
                    </div>
                </div>
            </nav>

            <div className="main-container">
                <div className="col-10 offset-1">
                    <h4>{this.props.oneIti[0].itiname}</h4>
                    <h6>{this.props.oneIti[0].city}</h6>
                    <div>{itiDetails}</div>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Singleiti;