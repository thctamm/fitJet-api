const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema(
  {
    name: {type: String, required: true},
    station: {type: Number, required: true, default: -1},
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
