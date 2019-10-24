const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({ error: 'No token Provided!' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2) res.status(401).send({ error: "Token error!" });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json('Ivalid Token!');

        req.userId = decoded.id;
        return next();
    });
};