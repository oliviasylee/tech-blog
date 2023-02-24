// Require dependencies
const path = require('path');
const express = require('express');
const session = require('express-session'); // Import express-session
const routes = require('./controllers'); // Router
const exphbs = require('express-handlebars'); // View - Initiate express handlebars
const hbs = exphbs.create({}); // Handlebar object
const sequelize = require('./config/connection'); // Connect to a database
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Initializes Sequelize with session store

// Sets up the Express App - Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions - something you want to encrypt
const sess = {
    secret: process.env.SECRET,
    cookie: {
      maxAge: 30 * 60 * 1000, // expires after 30 mins
      // expires after 1 day maxAge: 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
      // Connect sequilize defendencies
    store: new SequelizeStore({
      db: sequelize
    })
  };
// Use sessions as middleware
app.use(session(sess));

// Set up the Handlebars view engine - define Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up middleware for the Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the Router object to handle requests
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});