const mongoose = require('mongoose');
const Student = mongoose.Student;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var userStudent = new Student({
    userID: {
        type: Number, 
        required: true, 
        unique: true},
    mssv: {
        type: String, 
        required: true, 
        unique: true},
    name: { 
        type: String, 
        required: true },
    birthday:  { 
        type: Date, 
        required: true,
        default: 'user'},
	dateAdded : { type: Date, default: Date.now },
})

const User = mongoose.model('User', userStudent);
autoIncrement.initialize(mongoose.connection);
userStudent.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });

module.exports = {
    User
};