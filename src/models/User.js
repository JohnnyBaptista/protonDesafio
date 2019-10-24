const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
		minlength: 3,
		maxlength: 255,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	type: {
		type: Number,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	}
}, {
	timestamps: true,
});

UserSchema.pre('save', async function(next){
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});

module.exports = model('User', UserSchema);