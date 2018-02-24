const mongoose = require('mongoose')
const Schema = mongoose.Schema

var workoutSchema = new Schema(
  {
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    exercises: [{type: Schema.ObjectId, ref: 'Exercise'}],
    currentExercise: {type: Number, required: true, default: 0},
  },
  {
    toObject: { getters: true },
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  }
)

var Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
