const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res) {
        const { username, password } = req.body;

        const regUser = await User.findOne({username}).select('+password');
        
        if(!regUser) return res.status(400).json({error: 'User not found'});

        if(!await bcrypt.compare(password, regUser.password))
            return res.status(400).json({error: 'Invalid Password'});

        regUser.password = undefined;

        const token = generateToken({ id: regUser._id, isAdmin: regUser.isAdmin })

        return res.json({regUser, token})
    }
}