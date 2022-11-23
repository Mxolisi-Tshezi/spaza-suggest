import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId({ length: 5 })
import express from 'express';
const app = express();
import exphbs from "express-handlebars";
import bodyParser from 'body-parser';
import flash from 'express-flash'
import session from 'express-session';
import SpazaSuggest from './spaza-suggest.js'
import Routes from './route.js'
import pgPromise from 'pg-promise';
const pgp = pgPromise({});
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://zuggs:suggest123@localhost:5432/spaza_suggest';
const config = {
    connectionString: DATABASE_URL
 }
 if(process.env.NODE_ENV === "production"){
    config.ssl = {
       rejectUnauthorized: false
    }
 }
 const db = pgp(config);
const suggestions = SpazaSuggest(db)
const spazaRoute = Routes(suggestions)
// const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

 app.use(bodyParser.json());

 app.use(session({
    secret: "secret",
    cookie: {
        maxAge: 1000 * 36000
      },
    resave: false,
    saveUninitialized: true
}));

 app.use(flash());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', spazaRoute.clientPage);
app.post('/', spazaRoute.addUser);
app.get('/login/:name', spazaRoute.Login);
app.post('/login/:name', spazaRoute.getUsersCode);
app.get('/Addsuggestion/:name', spazaRoute.Addsuggestion)

const PORT = process.env.PORT || 1925
app.listen(PORT, function () {
   console.log('App started at port:', PORT)
})