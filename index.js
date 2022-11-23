import express from 'express';
const app = express();
import exphbs from "express-handlebars";
import bodyParser from 'body-parser';
import flash from 'express-flash'
import session from 'express-session';
import SpazaSuggest from './spaza-suggest.js'
// import pgp from ('pg-promise')({});
import pgPromise from 'pg-promise';
const pgp = pgPromise({});

// import ShortUniqueId from 'short-unique-id';



app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// create database akhe;
// create role sibone login password 'sibone123';
// grant all privileges on database akhe to sibone;
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://sibone:sibone123@localhost:5432/akhe";
const config = {
   connectionString: DATABASE_URL
}
if(process.env.NODE_ENV === "production"){
   config.ssl = {
      rejectUnauthorized: false
   }
}

app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'))

// const db = pgp(config);
// const waitersFunction = SpazaSuggest(db)

app.get('/', function (req, res) {
   res.render('index')
})


const PORT = process.env.PORT || 1943
app.listen(PORT, function () {
   console.log('App started at port:', PORT)
})