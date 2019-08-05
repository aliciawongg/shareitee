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

        let itiByCountry = this.props.countries.map(iti => {
            return (
                <option>{`${getName(iti.country)}`}</option>
                )
        });
        console.log(itiByCountry);

        let itiBySeason = this.props.seasons.map(iti => {
            return (
                <option>{`${iti.season}`}</option>
                )
        });
        let itiByExperience= this.props.experience.map(iti => {
            return (
                <option>{`${iti.experience}`}</option>
                )
        });
    return (
        <Default>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <span className="navbar-brand mb-0 h1">share.itee</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                      <a className="nav-item nav-link active">Home <span className="sr-only">(current)</span></a>
                      <a className="nav-item nav-link" href={url1}>New</a>
                      <a className="nav-item nav-link" href={url2}>Current</a>
                      <a className="nav-item nav-link" href={url3}>Log out</a>
                    </div>
                </div>
            </nav>
            <div className="main-container">
              <div className="col-10 offset-1">
                    <h4>Find an itinerary</h4>

                        <div className="form-row" id="categorytitle">
                            <div className="form-group col-4">
                                <div className="card" id="cardcat" width= "18rem">
                                    <img src="/images/goldengate.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Country</h5>

                                            <form action={url4} method="GET">
                                                <select name="selection">{itiByCountry}</select><br/>
                                                <input type= "submit" className="btn btn-light btn-sm" value="Go"/>
                                            </form>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" id="cardcat" width= "18rem">
                                    <img src="/images/shirakawago.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Season</h5>
                                            <form action={url5} method="GET">
                                                <select name="selection" id="selection">{itiBySeason}</select><br/>
                                                <input type="submit" className="btn btn-light btn-sm" value="Go"/>
                                            </form>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" id="cardcat" width= "18rem">
                                    <img src="/images/skydive2.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Experience</h5>
                                            <form action={url6} method="GET">
                                                <select name="selection" id="selection">{itiByExperience}</select><br/>
                                                <input type="submit" className="btn btn-light btn-sm" value="Go"/>
                                            </form>
                                        </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>

        </Default>
    );
  }
}

module.exports = Dashboard;