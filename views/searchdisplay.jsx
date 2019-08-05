var React = require("react");
var Default = require('./layouts/default');

class Searchdisplay extends React.Component {
  render() {
    console.log('showing list of iti based on user selection');

    let itiSelection = this.props.itiSelect.map(iti => {
        let link = "/shareitee/itinerary/"+iti.iti_id;
           return (
            <div>
                <li><a href={link}>{iti.itiname}</a></li>
            </div>)
           console.log(itiSelection);
    });

    let username = this.props.username;

    var url1 = "/shareitee/"+username;
    var url2 = "/shareitee/"+username+"/new";
    var url3 = "/shareitee/"+username+"/current";
    var url4 = "/shareitee/logout";

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
                <div className="col-10 offset-1">
                    <div>
                        <h4>Showing itineraries for "{this.props.select}"</h4>
                        <ul>{itiSelection}</ul>
                    </div>
                </div>
            </div>
        </Default>

    );
  }
}

module.exports = Searchdisplay;