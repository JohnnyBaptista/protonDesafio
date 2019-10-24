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
		const { username, password, type, email } = req.body;

		try{
			if(await User.findOne({ username })) return res.json({error: "User already exists!"});

			const regUsers = await User.create({
				username,
				password,
				type,
				email,
			});

			regUsers.password = undefined; 
			const token = generateToken({id: regUsers._id, isAdmin: regUsers.isAdmin});
			// res.render('formulario', { regUsers, token });
			return res.status(200).json(regUsers);
		}catch(err) {
			console.log(err);
			return res.status(400).json({error: 'Registration Failed!'});
		}

	}

}