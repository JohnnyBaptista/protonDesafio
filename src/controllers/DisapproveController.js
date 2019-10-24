const { Music } = require('../models');

module.exports = {

	async index(req, res){
		const disapprovedMusics = await Music.find({disapproved: true}, (err, musics) => {
			if(err) res.status(500).json({err});
			musicsMap = {};

			musics.forEach(music => {
				musicsMap[music._id] = music;
			});
			return musicsMap;
		});

		if(!disapprovedMusics) return res.status(200).json({message: "No songs found!"});

		return res.status(200).json(disapprovedMusics); 
	},

	async store(req, res){
		const { musicID } = req.params;

		const targetMusic = await Music.findById(musicID);

		if(!targetMusic){
			return res.status(400).json({error: "Music does not Exists"});
		}

		if(targetMusic.approved){
			targetMusic.approved = false;
		}

		targetMusic.disapproved = true;

		await targetMusic.save();

		// return res.status(200).json(targetMusic);
		res.redirect('/musics');
	}
}