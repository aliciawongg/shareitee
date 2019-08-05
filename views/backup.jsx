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


 <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[0].day}</h5>
                                            <p className="card-text">{this.props.oneIti[0].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[1].day}</h5>
                                            <p className="card-text">{this.props.oneIti[1].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[2].day}</h5>
                                            <p className="card-text">{this.props.oneIti[2].places}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" id="oneday">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="/images/travel1.jpg" className="card-img"/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Day {this.props.oneIti[3].day}</h5>
                                            <p className="card-text">{this.props.oneIti[3].places}</p>
                                    </div>
                                </div>
                            </div>


<div className="form-row">
  <div className="form-group col-6">
    <label>Day 1</label>
    <input type="text" className="form-control" id="day1" name="day1" value={this.props.itiToEdit[0].places}/>
  </div>
  <div className="form-group col-6">
    <label>Day 2</label>
    <input type="text" className="form-control" id="day2" name="day2" value={this.props.itiToEdit[1].places}/>
  </div>
</div>
<div className="form-row">
  <div className="form-group col-6">
    <label>Day 3</label>
    <input type="text" className="form-control" id="day1" name="day1" value={this.props.itiToEdit[2].places}/>
  </div>
  <div className="form-group col-6">
    <label>Day 4</label>
    <input type="text" className="form-control" id="day2" name="day2" value={this.props.itiToEdit[3].places}/>
  </div>
</div>