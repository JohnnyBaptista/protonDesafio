const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
        const { user, password } = req.body;

        const regUser = await User.findOne({user}).select('+password');
        
        if(!regUser) return res.status(400).json({error: 'User not found'});

        if(!await bcrypt.compare(password, regUser.password))
            return res.status(400).json({error: 'Invalid Password'});

        return res.json({regUser})
    }
}