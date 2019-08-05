var React = require("react");
var Default = require('./layouts/default');

class Daycard extends React.Component {
  render() {

    return (
        <div className="card" id="oneday">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src="/images/travel1.jpg" className="card-img"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Day {this.props.oneIti[0].day}</h5>
                            <p className="card-text">{this.props.oneIti[0].places}</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

module.exports = Daycard;