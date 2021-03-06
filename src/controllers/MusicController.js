const { Music } = require('../models');

module.exports = {

	async index(req, res){

		const regMusics = await Music.find({}, (err, musics) => {
			const musicsMap = {};
			
			musics.forEach((music) => {
				musicsMap[music._id] = music;
			});
			return musicsMap;
		});
		
		res.render('musicas', { data: regMusics });
	},
 
	async store(upload){
		const { name, size, key, path, author } = upload;
		
		const regMusic = await Music.create({
			name,
			size,
			key,
			author,
			path,
		});

		return regMusic;
	},

	async patch(req, res){
		const { musicID } = req.params;
		const { name, author } = req.body;

		const targetMusic = await Music.findById(musicID);

		if(!targetMusic){
			return res.status(400).json({error: "Music does not Exists"});
		}

		targetMusic.name = name;
		targetMusic.author = author;


		await targetMusic.save();

		// return res.status(200).json(targetMusic);
		res.redirect('/musics');
	},

	async delete(req, res){
		const { musicID } = req.params;
		
		const delMusic = Music.deleteOne({ _id: musicID }, (err, response) => { 
			if(err) return res.status(400).json({error: err});
			return response;
		});
		// return res.json({message: `Music Deleted`}); 
		res.redirect('/musics');
	},

	async get(req, res){
		const { musicID } = req.params;
		const targetMusic = await Music.findById(musicID);
		if(!targetMusic) return res.status(400).json({error: 'Music not found!'});
		
		res.render('musica', { data: targetMusic })
		
	},
	
	async download(req, res){
		const { musicID } = req.params;
		const targetMusic = await Music.findById(musicID);
		if(!targetMusic) return res.status(400).json({error: 'Music not found!'});

		res.download(targetMusic.path);
		
	},

}