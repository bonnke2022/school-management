const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
    },
    studentId: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: mongoose.Types.ObjectId,
    }
});

module.exports = mongoose.model('Student', StudentSchema);