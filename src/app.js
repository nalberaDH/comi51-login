const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const router = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(session({
    secret: 'Secretooooo',
    resave: false,
    saveUninitialized: false,
}))


app.set("view engine","ejs");
app.set("views",__dirname + "/views");
app.use(express.urlencoded({extended:false}));

app.use(router);

app.listen(3001,()=>console.log("Servidor escuchando en puerto 3001"));