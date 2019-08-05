console.log("starting up!!");

var sha256 = require('js-sha256');

const SALT = "i love mickey";

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
//require the url library
//this comes with node, so no need to yarn add
const url = require('url');

//check to see if we have this heroku environment variable
if( process.env.DATABASE_URL ){

  //we need to take apart the url so we can set the appropriate configs

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{

  //otherwise we are on the local network
  var configs = {
      user: 'aliciawong',
      host: '127.0.0.1',
      database: 'project2'
  };
}

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));

app.use(express.static('public'));

const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);


const countryList = require('country-list');
const { getCode, getName } = require('country-list');
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (request, response) => {
    response.redirect("/shareitee");
});

app.get('/shareitee', (request, response) => {
    console.log('show main page');

    // response.send('home');
    response.render('home');

});

//form to register, log in
// app.get('/shareitee/login',(request, response)=>{
//   console.log("show login & register page");
//   response.render('login');
// })

//user register
app.post('/shareitee/register', (request, response)=>{
  console.log("hashing password");
  console.log(request.body);
  // hash the password
  let hashedPassword = sha256( request.body.password1 + SALT );

  const queryString = "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

  const values = [request.body.username1, hashedPassword];

  pool.query(queryString, values, (err, result) => {

    console.log("adding user");
    console.log(result.rows[0] );

    response.cookie('loggedin', true);
    response.cookie('user_id', result.rows[0].username);

    const data = {
            userId : result.rows[0].user_id,
            userName : result.rows[0].username,
        };

    console.log(data);
    response.redirect('/shareitee/'+result.rows[0].username);
  });
})


//user sign in
app.post('/shareitee/login', (request, response)=>{
    console.log('authenticating user');
    console.log(request.body);

    const queryString = "SELECT * FROM users WHERE username=$1";

    const values = [request.body.username2];

    pool.query(queryString, values, (err, result) => {

        if( err ){
          console.log( "error", err );
        }else{
          console.log(result.rows[0]);
          let hashedPassword = sha256( request.body.password2 + SALT );
          if(result.rows[0].password === hashedPassword){

            var user_id = result.rows[0].user_id;

            console.log("matched")

            // let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );

            response.cookie('loggedin', true);
            response.cookie('user_id', result.rows[0].username);

          }else{
            console.log("something is not right")

          }
        response.redirect('/shareitee/'+result.rows[0].username);
        }

    });

  });

app.get('/shareitee/logout', (request, response) => {
    console.log("clicked log out");

        response.clearCookie('user_id');
        response.clearCookie('loggedin');
        response.redirect('/shareitee');

});

//after log in, display user's page with search and nav bar
app.get('/shareitee/:username', (request, response)=>{
    console.log("showing user's dashboard");
    const queryString = "SELECT DISTINCT country FROM itineraries";

    pool.query(queryString, (err, result) => {
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result.rows);
            let username = request.cookies['user_id'];
            console.log(username);
            var data = {
                    username: username,
                    countries: result.rows
            }
            console.log(data);

            const queryString2 = "SELECT DISTINCT season FROM itineraries WHERE season!='null'";
            pool.query(queryString2, (err, result) => {
                if (err) {
                    console.error('query error:', err.stack);
                    response.send( 'query error' );
                } else {
                    console.log('query result:', result.rows);
                    data.seasons = result.rows;
                    console.log(data);

                    const queryString3 = "SELECT DISTINCT experience FROM itineraries WHERE experience !='null' ";
                    pool.query(queryString3, (err, result) => {
                        if (err) {
                            console.error('query error:', err.stack);
                            response.send( 'query error' );
                        } else {
                            console.log('query result:', result.rows);
                            data.experience = result.rows;
                            console.log(data);
                            //response.send('user dashboard');
                            response.render('dashboard', data);
                        }
                    });
                }
            });
        }
    })
});


//form to fill in itinerary
app.get('/shareitee/:username/new', (request, response)=>{
    console.log("iti form");
    let username = request.cookies['user_id'];
    const data = {
        username: username,
    }
    response.render('form', data);
});

//adding itinerary to tables
app.post('/shareitee/:username/new', (request, response)=>{
    console.log("collect info in form");
    console.log(request.body);
    console.log(request.params);
    let username = request.params.username;
    console.log(username);

//getting user_id
    const queryString3 = "SELECT user_id from users WHERE username=$1";
    const values3 = [username];

    pool.query(queryString3, values3, (err,result) => {
        console.log(result.rows[0]);
        let userId = result.rows[0].user_id;
        console.log(userId);


//add a row into itineraries table
    const queryString1 = "INSERT INTO itineraries (itiname, country, season, experience, user_id, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [request.body.itiName, request.body.country, request.body.seasons, request.body.experience, userId, request.body.city];

    pool.query(queryString1, values, (err, result) => {
        console.log("adding to iti table");
        console.log(result.rows[0] );
        if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
        } else {
            console.log('query result:', result.rows);
            let itiId = result.rows[0].iti_id;

            let detailsArr = [request.body.day1, request.body.day2, request.body.day3, request.body.day4];

//then add a row into details table
            const queryString2 = "INSERT INTO details (day, places, iti_id) VALUES ($1, $2, $3) RETURNING *";

            for (var i = 0; i < detailsArr.length; i++) {
                if (detailsArr[i].length > 0) {
                    let values2 = [i+1, detailsArr[i], itiId];
                    pool.query(queryString2, values2, (err, result) => {
                        if (err) {
                            console.error('query error:', err.stack);
                            response.send( 'query error' );
                        } else {
                            console.log('query result:', result.rows);
                        }
                    });
                }
                if (i === 3) {
                    response.redirect('/shareitee/'+username+'/current');
                }
            }
        }
    });

});
});


app.get('/shareitee/:username/current', (request, response)=>{
  console.log("showing user's itineraries");

  let username = request.cookies['user_id'];
  console.log(username);

  const queryString = "SELECT users.user_id, users.username, itineraries.iti_id, itineraries.itiname FROM users INNER JOIN itineraries ON (users.user_id = itineraries.user_id) WHERE users.username=$1";

  let values=[username];
  console.log(values);

  pool.query(queryString, values, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);


        const data = {
            userIti: result.rows
        }
        console.log(data);
        // response.send('user dashboard');
        response.render('userlist', data);
}
})

})

//from search button on user dashboard. display search categories
app.get('/shareitee/search/country', (request, response) => {
    console.log("list itineraries by selected countries");
    console.log(request.query.selection);

    let values = [getCode(request.query.selection)];
    console.log(values);
    const queryString = "SELECT iti_id, itiname, country FROM itineraries WHERE country=$1";


  pool.query(queryString, values, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        let username = request.cookies['user_id'];
        console.log(username);
        const data = {
            username: username,
            select: request.query.selection,
            itiSelect: result.rows
        }
        console.log(data);

        //response.send('list of iti');
        response.render('searchdisplay', data);
}
});
});

//season
app.get('/shareitee/search/season', (request, response) => {
    console.log("list itineraries by selected season");
    console.log(request.query.selection);

    let values = [request.query.selection];
    console.log(values);
    const queryString = "SELECT iti_id, itiname FROM itineraries WHERE season=$1";


  pool.query(queryString, values, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        let username = request.cookies['user_id'];
        console.log(username);
        const data = {
            username: username,
            select: request.query.selection,
            itiSelect: result.rows
        }
        console.log(data);

        //response.send('list of iti');
        response.render('searchdisplay', data);
}
});
});

//experience
app.get('/shareitee/search/experience', (request, response) => {
    console.log("list itineraries by selected experience");
    console.log(request.query.selection);

    let values = [request.query.selection];
    console.log(values);
    const queryString = "SELECT iti_id, itiname FROM itineraries WHERE experience=$1";


  pool.query(queryString, values, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        let username = request.cookies['user_id'];
        console.log(username);
        const data = {
            username: username,
            select: request.query.selection,
            itiSelect: result.rows
        }
        console.log(data);

        //response.send('list of iti');
        response.render('searchdisplay', data);
}
});
});


//display info from 1 itinerary
app.get('/shareitee/itinerary/:id', (request, response)=>{
  console.log("showing 1 itinerary");

  let id = parseInt(request.params.id);
  console.log('iti id: ', id);

  const queryString = "SELECT itineraries.iti_id, itineraries.itiname, itineraries.city, details.id, details.day, details.places FROM details INNER JOIN itineraries ON (itineraries.iti_id = details.iti_id) WHERE itineraries.iti_id="+id+"ORDER BY details.day ASC";

  pool.query(queryString, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        let username = request.cookies['user_id'];

        const data = {
            username: username,
            oneIti: result.rows
        }
        console.log(data);
        //response.send('found the iti');
        response.render('singleiti', data);
}
})

})

//edit itinerary
app.get('/shareitee/itinerary/:id/edit', (request, response)=>{
  console.log("showing existing info for itinerary to edit");

  let Id = parseInt(request.params.id);
  console.log('iti id: ', Id);

  const queryString = "SELECT itineraries.iti_id, itineraries.itiname, itineraries.country, itineraries.city, itineraries.season, itineraries.experience, details.id, details.day, details.places FROM details INNER JOIN itineraries ON (itineraries.iti_id = details.iti_id) WHERE itineraries.iti_id="+Id+"ORDER BY details.day ASC";

  pool.query(queryString, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);

        let username = request.cookies['user_id'];

        const data = {
            username: username,
            itiToEdit: result.rows
        }
        console.log(data);
        //response.send('iti to be edited');
        response.render('edititi', data);
}
})

})

app.put('/shareitee/itinerary/:id/edit', (request, response)=>{
    console.log('edits submitted');
    let Id = parseInt(request.params.id);
    console.log(Id);

    console.log('rb', request.body);

    let edits = request.body;
    console.log(edits);

    let queryString = "UPDATE itineraries SET itiname=$1, country=$2, season=$3, experience=$4, city=$5 WHERE iti_id="+Id;

    const values = [edits.itiName, edits.country, edits.season, edits.experience, edits.city];

    console.log('values are ', values);

    pool.query(queryString, values, (err, result) => {
        console.log('starting update query')
        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result.rows);
        }

    });
    console.log('no. of days is ', edits.day_num);

    if (edits.day_num === '1') {
        let editDay = [request.body.day];
        let editPlaces = [request.body.places];
        let detailsId = [request.body.detail_id];
        console.log('editDay is ', editDay );
        console.log('editPlaces is ', editPlaces);
        console.log('detailsId is ', detailsId);
        console.log('detail length is ', editDay.length);

        var queryString2 = "UPDATE details SET places=$1 WHERE id="+detailsId;

        const values2 = editPlaces;

        console.log('values are ', values2);

        pool.query(queryString2, values2, (err, result) => {
            console.log('starting update query')
            if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
            } else {
            console.log('query result:', result.rows);
            }
        });

    } else {
        for (let i=0; i< edits.day.length; i++) {

        let deetsId = edits.detail_id[i];
        console.log('i and details Id = ', i, deetsId);
        var queryString3 = "UPDATE details SET places=$1 WHERE id="+deetsId;

        const values3 = [edits.places[i]];

        console.log('values are ', values3);

        pool.query(queryString3, values3, (err, result) => {
            console.log('starting update query')
            if (err) {
            console.error('query error:', err.stack);
            response.send( 'query error' );
            } else {
            console.log('query result:', result.rows);
            }
        });
    }
}
    response.redirect("/shareitee/itinerary/"+Id);
            //response.send('edit');

});

//delete itinerary
app.delete('/shareitee/itinerary/:id/delete', (request, response) => {
    console.log('deleting iti');

    let Id = parseInt(request.params.id);
    console.log(Id);

    let queryString = "DELETE from itineraries WHERE iti_id="+Id;
    pool.query(queryString, (err, result) => {
        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);
        }
    });

    let queryString2 = "DELETE from details WHERE iti_id="+Id;
    pool.query(queryString2, (err, result) => {
        if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);
        }
    });
    let username = request.cookies['user_id'];
    response.redirect('/shareitee/'+username+'/current');
});



// Listen to requests on port 3000

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));


 let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
})
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);