const express = require('express');
const multer = require('multer');

const multerConfig = require('./config/multer');
const { UserController, 
	ApproveController, 
	AuthenticateController,
	DisapproveController,
	MusicController, 
} = require('./controllers');

const routes = express.Router();

routes.get('/', (req, res) => {
	res.redirect('/musics');
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/musics', MusicController.index);
routes.get('/musics/:musicID', MusicController.get);
routes.get('/musics/download/:musicID', MusicController.download);
routes.post('/musics', multer(multerConfig).single('file'), async (req, res) => {
	const { originalname: name, size, filename: key, path } = req.file;
	const { author } = req.body;
	const upload = {
		name,
		size,
		key,
		path,
		author
	}
	
	const response = await MusicController.store(upload);
	console.log(response);
	res.redirect('/musics');
});
routes.patch('/musics/:musicID', MusicController.patch);
routes.delete('/musics/:musicID', MusicController.delete);

routes.get('/approve', ApproveController.index);
routes.post('/approve/:musicID', ApproveController.store);

routes.get('/disapprove', DisapproveController.index);
routes.post('/disapprove/:musicID', DisapproveController.store);

routes.post('/authenticate', AuthenticateController.index);

routes.get('/upload', (req, res) => {
	res.render('upload');
});

module.exports = routes;