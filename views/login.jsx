var React = require("react");
var Default = require('./layouts/default');

class Login extends React.Component {
  render() {
     console.log('Log in page');

    return (
        <Default>

            <div className="row">
                <div className="col-2 offset-3">
                    <h5>New user</h5>
                    <form method="POST" action="/shareitee/register">
                        <div className="form-group row">
                            <input name="username1" type="text" className="form-control" placeholder="User name"/>
                        </div>
                        <div className="form-group row">
                            <input name="password1" type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group row">
                            <button type="submit" className="btn btn-primary">Sign up</button>
                        </div>
                    </form>
                </div>
                <div className="col-2 offset-1">
                    <h5>Existing user</h5>
                    <form method="POST" action="/shareitee/login">
                        <div className="form-group row">
                            <input name="username2" type="text" className="form-control" placeholder="User name"/>
                        </div>
                        <div className="form-group row">
                            <input name="password2" type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group row">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </Default>
    );
  }
}

module.exports = Login;

          //   <div className="register">
          //   <h1>new user</h1>
          //   <form method="POST">
          //       <input name="username1" value="user name"/><br/>
          //       <input name="password1" value="password"/><br/>
          //       <input type="submit" value="Submit"/>
          //   </form>
          //   </div>
          //   <div className="login">
          //   <h1>existing user</h1>
          //   <form method="POST">
          //       <input name="username2" value="user name"/><br/>
          //       <input name="password2" value="password"/><br/>
          //       <input type="submit" value="Submit"/>
          //   </form>
          // </div>