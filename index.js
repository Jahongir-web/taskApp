const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config()

const authRouter = require("./src/router/authRouter");
const dashRouter = require("./src/router/dashRouter");
const mainRouter = require("./src/router/mainRouter");

const app = express()
const PORT = process.env.PORT || 4000;

app.use(session({secret: 'seckret_key', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(methodOverride("_method"))

app.use(express.static('public'))


app.use(expressLayouts)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// app.get('/', (req, res)=> {
//   res.render('index')
// })

app.use('/', authRouter)
app.use('/', dashRouter)
app.use('/', mainRouter)


app.get('*', (req, res)=> {
  // res.status(404).send('404 Page Not Found!')
  res.status(404).render('404')
})

const sart = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    
    app.listen(PORT, ()=> console.log(`Server started on Port: ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}
sart()

