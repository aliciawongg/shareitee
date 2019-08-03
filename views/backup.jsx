var React = require("react");
var Default = require('./layouts/default');

class Home extends React.Component {
  render() {
     console.log('homepage');

    return (
        <Default>
        <div className="bg-image"></div>
        <div className="site-wrapper">

            <div className="site-wrapper-inner">

                <div className="container">

                    <div className="masthead clearfix">
                        <div className="container inner">
                            <h3 className="masthead-brand">share.itee</h3>

                        </div>
                    </div>

                    <div className="inner cover">

                        <p className="lead">Travel makes one modest, you see what a tiny place you occupy in the world. - Gustave Flaubert</p>

                        <p>need a travel itinerary for that upcoming trip? </p>
                        <p>have an itinerary to share with others?</p>

                        <form action="/shareitee/login" method="GET">
                        <button className="btn btn-secondary" type="submit">Get started</button>
                        </form>
                    </div>

                </div>

            </div>
        </div>

        </Default>
    );
  }
}

module.exports = Home;