const express = require('express');

const { UserController, 
	MusicController, 
	ApproveController, 
	DisapproveController 
} = require('./controllers');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/musics', MusicController.index);
routes.post('/musics', MusicController.store);
routes.patch('/musics/:musicID', MusicController.patch);
routes.delete('/musics/:musicID', MusicController.delete);

routes.get('/approve', ApproveController.index);
routes.post('/approve/:musicID', ApproveController.store);

routes.get('/disapprove', DisapproveController.index);
routes.post('/disapprove/:musicID', DisapproveController.store);

module.exports = routes;