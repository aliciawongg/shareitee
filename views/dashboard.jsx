var React = require("react");
const { getCode, getName } = require('country-list');
var Default = require('./layouts/default');
import CountryData from 'country-data'

class Dashboard extends React.Component {
  render() {
     console.log('Logged in and showing search page');

        var username = this.props.username;
        console.log(username);

        var url1 = "/shareitee/"+username+"/new";
        var url2 = "/shareitee/"+username+"/current";
        var url3 = "/shareitee/logout";
        var url4 = "/shareitee/search/country";
        var url5 = "/shareitee/search/season";
        var url6 = "/shareitee/search/experience";

        let itiByCountry = this.props.allIti.map(iti => {
            return (
                <option>{`${getName(iti.country)}`}</option>
                )
        });
        console.log(itiByCountry);

        let itiBySeason = this.props.allIti.map(iti => {
            return (
                <option>{`${iti.season}`}</option>
                )
        });
        let itiByExperience= this.props.allIti.map(iti => {
            return (
                <option>{`${iti.experience}`}</option>
                )
        });
    return (
        <Default>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <span className="navbar-brand mb-0 h1">{`${username}`}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <a className="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                      <a className="nav-item nav-link" href={url1}>New</a>
                      <a className="nav-item nav-link" href={url2}>Current</a>
                      <a className="nav-item nav-link" href={url3}>Log out</a>
                    </div>
                </div>
            </nav>
            <div className="main-container">
              <div className="col-10 offset-1">
                    <h4>Find an itinerary</h4>
                    <form method="POST">
                        <div className="form-row">
                            <div className="form-group col-4">
                                <div className="card" width= "18rem">
                                    <img src="/images/goldengate.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Country</h5>
                                            <select>{itiByCountry}</select><br/>
                                            <a href={url4} class="btn btn-outline-danger btn-sm">Go</a>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" width= "18rem">
                                    <img src="/images/shirakawago.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Season</h5>
                                            <select>{itiBySeason}</select><br/>
                                            <a href={url5} class="btn btn-outline-danger btn-sm">Go</a>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" width= "18rem">
                                    <img src="/images/camping.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Experience</h5>
                                            <select>{itiByExperience}</select><br/>
                                            <a href={url6} class="btn btn-outline-danger btn-sm">Go</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </Default>
    );
  }
}

module.exports = Dashboard;