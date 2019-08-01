console.log("starting up!!");

var sha256 = require('js-sha256');

const SALT = "i love mickey";

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'aliciawong',
  host: '127.0.0.1',
  database: 'project2',
  port: 5432,
};

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
app.get('/shareitee/login',(request, response)=>{
  console.log("show login & register page");
  response.render('login');
})

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


//
app.get('/shareitee/:username', (request, response)=>{
  console.log("showing user's dashboard");

  let name = request.params.username;

  const queryString = "SELECT * from users WHERE username=$1";

  let values=[name];


  pool.query(queryString, values, (err, result) => {

   if (err) {
        console.error('query error:', err.stack);
        response.send( 'query error' );
        } else {
        console.log('query result:', result);


    const data = {
            userId : result.rows[0].user_id,
            userName : result.rows[0].username,
        };

        console.log(data);
    response.render('dashboard', data);
}
})

})

app.post('/shareitee/logout', (request, response) => {
    console.log("clicked log out");


        response.clearCookie('user_id');
        response.clearCookie('loggedin');
        response.redirect('/shareitee/login');

});



// Listen to requests on port 3000
 const server = app.listen(3000, () => console.log('~~~ Tuning in to port 3000 ~~~'));

 let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
})
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);