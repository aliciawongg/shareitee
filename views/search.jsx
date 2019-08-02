var React = require("react");
var Default = require('./layouts/default');
//country, season, experience
class Search extends React.Component {
  render() {
     console.log('show search page');

    return (
        <Default>


        <form action="/shareitee/search" method="POST">
            <input type="submit" value="Submit"/>
             </form>

        </Default>
    );
  }
}

module.exports = Search;