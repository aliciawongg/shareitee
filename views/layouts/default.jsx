var React = require("react");

class Default extends React.Component {
  render() {
    return (
        <html>
            <head>

                <title>share.itee</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />

                <link rel="stylesheet" href="/style.css"/>
            </head>
            <body>
                {this.props.children}
            </body>
        </html>
    );

  }
}

module.exports = Default;

// integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"