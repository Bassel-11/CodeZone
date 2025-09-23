const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number,
        required: true 
        },
    descripution: String
});

mongoose.model('Course', courseSchema);

module.exports = mongoose.model('Course');