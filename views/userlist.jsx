var React = require("react");
var Default = require('./layouts/default');

class Userlist extends React.Component {
  render() {
     console.log('generating user iti');

    let username = this.props.userIti[0].username;
    var url1 = "/shareitee/"+username;
    var url2 = "/shareitee/"+username+"/new";
    var url3 = "/shareitee/logout";

     let itiList = this.props.userIti.map(iti => {
        let link = "/shareitee/itinerary/"+iti.iti_id;
        var link2 = "/shareitee/itinerary/"+iti.iti_id+ "/edit";
        var link3 = "/shareitee/itinerary/"+iti.iti_id + "/delete?_method=delete";
        return (
            <div className="row" id="itirows">
                <div className="col-6">
                <li><a href={link}>{iti.itiname}</a></li>
                </div>
                <div className="col-6">
                    <div className="row">
                <form action={link2} method="GET">
                    <button className="btn btn-light edit" type="submit">Edit</button>
                </form>
                <form action={link3} method="POST">
                    <button className="btn btn-light delete" type="submit">Delete</button>
                </form>
                </div>
                </div>
            </div>)
        console.log(itiList);
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
                      <a className="nav-item nav-link active">Current <span className="sr-only">(current)</span></a>
                      <a className="nav-item nav-link" href={url3}>Log out</a>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                      <p className="header-username" id="username">{username}</p>
                    </div>
                </div>
            </nav>
            <div className="main-container">
                <div className="col-10 offset-1">
                    <h4>Your itineraries</h4>
                    <ul>{itiList}</ul>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Userlist;

//3 ways to search
                // <a href={`/shareitee/${this.props.userIti[0].username}/${iti.iti_id}`}>
                // <li>{iti.itiname}</li>
                // </a>