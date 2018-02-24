const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema(
  {
    name: {type: String, required: true},
    token: String,
    station: {type: Number},
    faces: [{type: String}],
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  }
)

var User = mongoose.model('User', userSchema)

module.exports = User
