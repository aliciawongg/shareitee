var React = require("react");
var Default = require('./layouts/default');

class Dashboard extends React.Component {
  render() {
     console.log('Log in page');
     var url = "/shareitee/"+this.props.userIti[0].username;
     var url2 = url + "/new";
     var url3 = url + "/search";
     let itiList = this.props.userIti.map(iti => {
        let link = "/shareitee/"+iti.username+"/"+iti.iti_id;
        return (
            <div>
            <li><a href={link}>{iti.itiname}</a></li>

            </div>)
        console.log(itiList);
    });
    return (
        <Default>

            <h3>{this.props.userIti[0].username}'s Dashboard</h3>
            <h4>Your itineraries</h4>
            <ul>{itiList}</ul>
             <form action={url3} method="GET">
            <input type="submit" value="Search"/>
             </form>
             <form action="/shareitee/logout" method="POST">
            <input type="submit" value="Log out"/>
             </form>

            <form action={url2} method="GET">
            <input type="submit" value="Share iti"/>
             </form>
        </Default>
    );
  }
}

module.exports = Dashboard;

//3 ways to search
                // <a href={`/shareitee/${this.props.userIti[0].username}/${iti.iti_id}`}>
                // <li>{iti.itiname}</li>
                // </a>