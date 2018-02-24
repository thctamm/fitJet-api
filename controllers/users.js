const User = require('../models/schemas/user')
const config = require('../models/config')
const cognitive = require('cognitive-services');

const face = new cognitive.face({
  apiKey: config.msKey,
  endpoint: config.msEnd,
})

/*
* C.R.U.D. routes
*/
exports.createUser = (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save(err => {
    if (err)
      return next(err)
    return res.sendStatus(200)
  }).catch(next)
  return
}

exports.addFace = (req, res, next) => {
  face.addAFaceToAFaceList({
    parameters: {faceListId: config.faceListId},
    headers: {'Content-type': 'application/octet-stream'},
    body: req.body,
  }).then((response) => {
    parameters = {
        faceListId: faceListId,
        persistedFaceId: response.persistedFaceId
    }
    user.findById(req.params.userId).then(user => {
      user.faces.push(response.persistedFaceId)
      user.markModified('faces')
      user.save(err => {
        if (err)
          return next(err)
          return res.sendStatus(200)
      })
    }).catch(next)
  })
}

exports.getUserByPic = (req, res, next) => {
  const parameters = {
    returnFaceId: "true",
    returnFaceLandmarks: "false",
    returnFaceAttributes: "age"
  }

  const headers = {
      'Content-type': 'application/octet-stream'
  }

  const body = req.body

  face.detect({
    parameters,
    headers,
    body
  }).then((response) => {  
    const body2 = {
      "faceId": response[0].faceId,
      "faceListId": config.faceListId
    }
    
    face.findSimilar({
      body2
    }).then((resp2) => {
      if (resp2[0].confidence < 0.6)
        return res.status(400).send('could not identify user')
      User.findOne({'faces': resp2[0].faceId}).then(user => {
        if (!user)
          return res.status(400).send('invalid faceid returned - not linked to user')
        return res.json(user)
      })
    }).catch(next)
  }).catch(next)
}

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId).then(user => {
    if (user)
      return res.json(user)
    return res.status(404).send('user not found')

  }).catch(next)
}

exports.enterStation = (req, res, next) => {
  user.findOneAndUpdate({'id': req.params.userId},
    {'station': req.params.stationId}).then(user => {
    return res.sendStatus(200)
  }).catch(next)
}

exports.leaveStation = (req, res, next) => {
  user.findOneAndUpdate({'id': req.params.userId},
    {'station': -1}).then(user => {
    return res.sendStatus(200)
  }).catch(next)
}

