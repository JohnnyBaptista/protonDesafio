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

		const regUsers = await User.create({
			user,
			password,
			type,
		});

		return res.json(regUsers)
	}

}