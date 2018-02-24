const Exercise = require('../models/schemas/exercise')
const config = require('../models/config')

/*
* C.R.U.D. routes
*/
exports.createExercise = (req, res, next) => {
  const newExercise = new Exercise(req.body)
  newExercise.save(err => {
    if (err)
      return next(err)
    return res.sendStatus(200)
  }).catch(next)
  return
}

exports.addRep = (req, res, next) => {
  user.findOneAndUpdate({'id': req.params.exerciseId},
    {$inc : {'repsDone' : 1}}).then(user => {
    return res.sendStatus(200)
  }).catch(next)
}
