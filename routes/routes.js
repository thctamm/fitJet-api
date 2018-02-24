'use strict'

const express = require('express')
const router = express.Router()

const users = require('../controllers/users')
const workouts = require('../controllers/workouts')
const exercises = require('../controllers/exercises')

/*
 * User routes
 */
router.route('/users')
  .post(users.createUser)

router.route('/users/:userId')
  .get(users.getUserById)
  .put(users.addFace)

router.route('/users/pic')
  .put(users.getUserByPic)

router.route('/users/:userId/enter/:stationId')
  .post(users.enterStation)

router.route('/users/:userId/leave')
  .post(users.leaveStation)


/*
 * Workout routes
 */
router.route('/workouts')
  .post(workouts.createWorkout)

router.route('/workouts/:workoutId/exercises')
  .post(workouts.addExercise)

router.route('/workouts/:workoutId/exercises/next')
  .post(workouts.nextExercise)

/*
 * Exercise routes
 */
router.route('/exercises')
  .post(exercises.createExercise)

router.route('/exercises/addRep')
  .post(exercises.addRep)

// expose routes through router object
module.exports = router
