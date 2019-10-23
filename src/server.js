const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars')
const path = require('path');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

mongoose.connect('mongodb+srv://johnnybaptista:j05020598p@testesmongo-wutm3.mongodb.net/desafio?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.engine('handlebars', handlebars({
	defaultLayout: 'main',
	extname: 'handlebars',
	layoutsDir: 'src/views/layouts',
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routes);


server.listen(3333, () => console.log('Server on! Listening to localhost:3333'));