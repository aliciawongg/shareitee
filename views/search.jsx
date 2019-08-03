var React = require("react");
var Default = require('./layouts/default');
//country, season, experience
class Search extends React.Component {
  render() {
        console.log('show search page');
        let itiByCountry = this.props.allIti.map(iti => {
            return (
                <option>{`${iti.country}`}</option>
                )
        });
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

            <div className="row">
                <div className="col-10 offset-1">
                    <h4>Search</h4>
                    <form method="POST">
                    <div className="form-row">
                        <div className="form-group col-4" id="iti-cat">
                            <label>Country</label><br/>
                            <select>{itiByCountry}</select><br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="form-group col-4">
                            <label>Season</label><br/>
                            <select>{itiBySeason}</select><br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                        <div className="form-group col-4">
                            <label>Experience</label><br/>
                            <select>{itiByExperience}</select><br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Search;



// let itiByCountry = [new Set(this.props.allIti.map(iti => iti.country))];

// console.log(itiByCountry);