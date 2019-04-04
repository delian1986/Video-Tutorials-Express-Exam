const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,maxlength:[50,'Description should be max 50 chars long!'],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  isListed: {
    type: Boolean,
    default: false
  },
  lectures: [{
    type: Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  usersEnrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  timesEnrolled:{
    type:Number,
    default:0
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course