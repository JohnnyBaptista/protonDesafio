const { Schema, model } = require('mongoose');

const MusicSchema = new Schema ({
	name: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	approved: {
		type: Boolean,
		default: false,
	},
	disapproved: {
		type: Boolean,
		default: false,
	}
}, {
	timestamps: true,
});

module.exports = model('Music', MusicSchema);