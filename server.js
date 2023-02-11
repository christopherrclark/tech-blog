const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// all routes will controllers folder
// Import routes and give the server access to them.
//link to homepage
app.get('/', (req, res) => {
  res.render('all');
});

//link to dashbord file
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

//link to log in file
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(PORT, () => {
  console.log(`Listening on route ${PORT}...`)
})