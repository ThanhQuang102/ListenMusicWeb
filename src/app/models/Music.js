const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//slug
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Music = new Schema({
        name: { type: String, required: true },
        author: String,
        style: String,
        duration: String,
        track: String,
        image: String,
        sub: String,
        slug: { type: String, slug: "name", unique: true }
    }, {
        timestamps: true,
    },

);

// Add plugins
mongoose.plugin(slug);
Music.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Song', Music);