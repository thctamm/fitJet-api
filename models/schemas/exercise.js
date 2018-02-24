const mongoose = require('mongoose')
const Schema = mongoose.Schema

var exerciseSchema = new Schema(
  {
    name: {type: String, required: true},
    repsGoal: {type: Number, required: true},
    repsDone: {type: Number, required: true, default: 0},
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  }
)

var Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise
