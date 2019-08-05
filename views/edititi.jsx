var React = require("react");
var Default = require('./layouts/default');
const { getCode, getName } = require('country-list');
import CountryData from 'country-data'

class Edititi extends React.Component {
  render() {
    console.log('Display current iti for edit');
    var username = this.props.username;
    console.log(username);

    var daylength = this.props.itiToEdit.length;
    console.log(daylength);
    var id = this.props.itiToEdit[0].iti_id;
    var url1 = "/shareitee/"+username;
    var url2 = "/shareitee/"+username+"/new";
    var url3 = "/shareitee/"+username+"/current";
    var url4 = "/shareitee/logout";
    var url5 = "/shareitee/itinerary/"+id+"/edit?_method=PUT"

    var country = getName(this.props.itiToEdit[0].country);
    console.log(this.props.itiToEdit[0].country);
    console.log(country);

    let dayDetail = this.props.itiToEdit.map(day => {
        return (
            <div className="form-group col-6">
            <input type="hidden" name="detail_id" value={day.id}/>
            <input type="hidden" name="day" value={day.day}/>
            <label>Day {day.day}</label>
            <input type="text" className="form-control" id="day" name="places" value={day.places}/>
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
                    <div className="navbar-nav">
                      <a className="nav-item nav-link" href={url1}>Home</a>
                      <a className="nav-item nav-link" href={url2}>New</a>
                      <a className="nav-item nav-link" href={url3}>Current</a>
                      <a className="nav-item nav-link" href={url4}>Log out</a>
                    </div>
                </div>
            </nav>
            <div className="main-container">
                <div className="row">
                    <div className="col-10 offset-1">
                        <h4>Edit itinerary</h4>
                        <input type="hidden" name="iti_id" value={this.props.itiToEdit[0].iti_id}/>
                        <form action={url5} method="POST">
                            <div className="form-group">
                                <label className="col-form-label">Name of itinerary</label>
                                <input name="itiName" type="text" className="form-control" id="itiName" value={this.props.itiToEdit[0].itiname}/>
                            </div>
                            <div className="form-row">
                                <input name="country" type="hidden" className="form-control" id="country" value={country}/>
                              <div className="form-group col-4">
                                <label>City</label>
                                <input type="text" className="form-control" id="city" name="city" value={this.props.itiToEdit[0].city}/>
                              </div>
                              <div className="form-group col-4">
                                <label>Season</label>
                                <input name="season" type="text" className="form-control" id="season" value={this.props.itiToEdit[0].season}/>
                              </div>
                              <div className="form-group col-4">
                                <label>Experience</label>
                                <input type="text" className="form-control" id="experience" name="experience" value={this.props.itiToEdit[0].experience}/>
                              </div>
                            </div>

                            <div className="form-row">{dayDetail}</div>
                             <input type="hidden" name="day_num" value={daylength}/>
                            <button type="submit" className="btn btn-light">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Edititi;