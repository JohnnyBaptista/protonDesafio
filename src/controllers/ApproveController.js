const { Music } = require('../models');

module.exports = {

	async index(req, res){
		const approvedMusics = await Music.find({approved: true}, (err, musics) => {
			if(err) res.status(500).json({err});
			musicsMap = {};

			musics.forEach(music => {
				musicsMap[music._id] = music;
			});
			return musicsMap;
		});

		if(!approvedMusics) return res.status(200).json({message: "Nenhuma música encontrada"});

		return res.status(200).json(approvedMusics); 
	},

	async store(req, res){
		const { musicID } = req.params;

		const targetMusic = await Music.findById(musicID);

		if(!targetMusic){
			return res.status(400).json({error: "Music does not Exists"});
		}
		
		if(targetMusic.disapproved){
			targetMusic.disapproved = false;
		}

		targetMusic.approved = true;

		await targetMusic.save();

		// return res.status(200).json(targetMusic);
		res.redirect('/musics');
	}
}