var React = require("react");
const { getCode, getName } = require('country-list');
var Default = require('./layouts/default');
import CountryData from 'country-data'

class Dashboard extends React.Component {
  render() {
     console.log('Logged in and showing search page');
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

            <h3>Hello!</h3>
              <div className="row">
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
                                            <a href="#" class="btn btn-outline-danger btn-sm">Go</a>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" width= "18rem">
                                    <img src="/images/shirakawago.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Season</h5>
                                            <select>{itiBySeason}</select><br/>
                                            <a href="#" class="btn btn-outline-danger btn-sm">Go</a>
                                        </div>
                                </div>
                            </div>

                            <div className="form-group col-4">
                                <div className="card" width= "18rem">
                                    <img src="/images/camping.jpg" className="card-img-top" height="200px"/>
                                        <div className="card-body">
                                            <h5 class="card-title">Experience</h5>
                                            <select>{itiByExperience}</select><br/>
                                            <a href="#" class="btn btn-outline-danger btn-sm">Go</a>
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