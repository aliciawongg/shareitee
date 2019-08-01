var React = require("react");
var Default = require('./layouts/default');

class Dashboard extends React.Component {
  render() {
     console.log('Log in page');
     var url = "/shareitee/"+this.props.userName;
     var url2 = "/shareitee/"+this.props.userName + "/new";
    return (
        <Default>

            <p>{this.props.userName}'s Dashboard</p>

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