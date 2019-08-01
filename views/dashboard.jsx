var React = require("react");
var Default = require('./layouts/default');

class Dashboard extends React.Component {
  render() {
     console.log('Log in page');
     var url = "/shareitee/"+this.props.userName;
    return (
        <Default>

            <p>Dashboard</p>
            <form action={url} method="GET">
            <input type="submit" value={this.props.userName}/>
             </form>
             <form action="/shareitee/logout" method="POST">
            <input type="submit" value="Log out"/>
             </form>
        </Default>
    );
  }
}

module.exports = Dashboard;