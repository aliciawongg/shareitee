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

app.get('/shareitee/login',(request, response)=>{
  response.render('login');
})

app.post('/shareitee/login', (request, response)=>{
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

    response.render('dashboard');
  });
})


app.post('/shareitee/login', (request, response)=>{
  const queryString = "SELECT * FROM users WHERE username=$1";

  const values = [request.body.username2];

  pool.query(queryString, values, (err, result) => {

    if( err ){
      console.log( "error", err );
    }else{
      let hashedPassword = sha256( request.body.password2 + SALT );
      if(result.rows[0].password === hashedPassword){

        var user_id = result.rows[0].id;

        console.log("matched")

        let currentSessionCookie = sha256( user_id + 'logged_id' + SALT );


        response.cookie('loggedin', currentSessionCookie);
        response.cookie('user_id', user_id);
      }else{
        console.log("something is not right")

      }

    response.render('dashboard');

    }

  });
})

app.post('/shareitee/logout', (request, response) => {
    console.log("clicked log out");


        response.clearCookie('username');
        response.send('you have logged out');

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