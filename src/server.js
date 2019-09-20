const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

mongoose.connect('mongodb+srv://johnnybaptista:j05020598p@testesmongo-wutm3.mongodb.net/desafio?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


app.use(express.json());
app.use(routes);


server.listen(3333, () => console.log('Server on! Listening to localhost:3333'));