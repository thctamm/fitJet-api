const Workout = require('../models/schemas/exercise')
const Exercise = require('../models/schemas/exercise')
const config = require('../models/config')

/*
* C.R.U.D. routes
*/
exports.createWorkout = (req, res, next) => {
  const newWorkout = new Workout(req.body)
  newWorkout.save(err => {
    if (err)
      return next(err)
    return res.sendStatus(200)
  }).catch(next)
  return
}

exports.addExercise = (req, res, next) => {
  Workout.findById(req.params.workoutId).then(wrk => {
    if (!wrk)
      return res.status(404).send('workout not found')
    const newExercise = new Exercise(req.body)
    newExercise.save(err => {
      if (err)
        return next(err)
      wrk.exercises.push(newExercise.id)
      wrk.markModified('exercises')
      wrk.save(err => {
        if (err)
          return res.status(400).send('failed to save workout after adding exercise')
        res.json(wrk)
      }).catch(next)
    }).catch(next)
  }).catch(next)
}

exports.nextExercise = (req, res, next) => {
  Workout.findById(req.params.workoutId).then(wrk => {
    if (!wrk)
      return res.status(404).send('workout not found')
    if (wrk.currentExercise >= wrk.exercise.length)
      return res.json(wrk)
    wrk.currentExercise++
    wrk.save(err => {
      if (err)
        res.status(400).send('failed to save workout after going to next exercise')
      return res.json(wrk)
    })
  }).catch(next)
}
