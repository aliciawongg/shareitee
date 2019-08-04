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
    var url5 = "/shareitee/itinerary/"+itiId+ "/edit?_method=PUT";
    var url6 = "/shareitee/itinerary/"+itiId + "/delete?_method=delete";

    return (
        <Default>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <span className="navbar-brand mb-0 h1">{`${username}`}</span>
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
                <div className="col-10 offset-1">
                    <h3>{this.props.oneIti[0].itiname}</h3>
                    <h4>{this.props.oneIti[0].city}</h4>
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
                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[1].day}</h5>
                                            <p className="card-text">{this.props.oneIti[1].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[2].day}</h5>
                                            <p className="card-text">{this.props.oneIti[2].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[3].day}</h5>
                                            <p className="card-text">{this.props.oneIti[3].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form action={url5} method="POST">
                            <button className="btn btn-secondary" type="submit">Edit</button>
                        </form>
                        <form action={url6} method="POST">
                            <button className="btn btn-secondary" type="submit">Delete</button>
                        </form>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Singleiti;