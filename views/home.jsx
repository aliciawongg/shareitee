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

                    <div className="row" id="quote">
                        <h4 className="h1-responsive wow fadeInLeft" data-wow-delay="0.3s">Travel makes one modest, you see what a tiny place you occupy in the world. - Gustave Flaubert</h4>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <h6 className="mb-3 wow fadeInLeft" data-wow-delay="0.3s">Find a travel itinerary or share yours with others</h6>
                        </div>
                        <div className="col-3 offset-3">
                            <div className="card wow fadeInRight" data-wow-delay="0.3s">
                                <div className="card-body">

                                   <div className="text-center">
                                        <h3 className="white-text" id="logintext" >
                                        <img src="/images/air_baloon.svg" height="45px" width="45px" display="inline"/>
                                       New user</h3>
                                        <hr className="hr-light"/>
                                    </div>
                                    <form method="POST" action="/shareitee/register">
                                    <div className="md-form">
                                        <input type="text" id="form3" className="forminput" name="username1" placeholder="Username"/>
                                    </div>
                                    <div className="md-form">
                                        <input type="password" id="form4" className="forminput" name="password1" placeholder="Password"/>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-indigo">Sign up</button>
                                        <hr className="hr-light mb-3 mt-4"/>
                                    </div>
                                    </form>

                                     <div className="text-center">
                                        <h3 className="white-text" id="logintext">
                                        <img src="/images/cruise.svg" height="45px" width="45px" display="inline"/>
                                        Existing user</h3>
                                        <hr className="hr-light"/>
                                    </div>
                                    <form method="POST" action="/shareitee/login">
                                    <div className="md-form">
                                        <input type="text" id="form3" className="forminput" name="username2" placeholder="Username"/>
                                    </div>
                                    <div className="md-form">
                                        <input type="password" id="form4" className="forminput" name="password2" placeholder="Password"/>
                                    </div>
                                    <div className="text-center mt-4">
                                        <button className="btn btn-indigo">Log in</button>
                                        <hr className="hr-light mb-3 mt-4"/>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        </Default>
    );
  }
}

module.exports = Home;