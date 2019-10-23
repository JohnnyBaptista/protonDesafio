const { User } = require('../models');

module.exports = {

	async index(req, res){
		const regUsers = await User.find({}, (err, users) => {
			if(!err){
				const userMap = {};

				users.forEach((user) => {
					userMap[user._id] = user;
				});
				return userMap;
			} else{
				throw(err);
			}
		});

		return res.json(regUsers);

	},

	async store(req, res){
		const { user, password, type } = req.body;

		try{
			if(await User.findOne({ user })) return res.json({error: "User already exists!"});

			const regUsers = await User.create({
				user,
				password,
				type,
			});

			regUsers.password = undefined; 

			res.render('formulario', { regUsers });
			return res.status(200).json(regUsers);
		}catch(err) {
			return res.status(400).json({error: 'Registration Failed!'});
		}

	}

}