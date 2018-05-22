'use strict'

var express = require('express')

var routes = express.Router()

var User = require('./User')

var jwt = require('jwt-simple');


routes.route('/all').get(function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(new Error(err))
    }

    res.json(users) // return all todos
  })
})

routes.route('/get/:id').get(function (req, res, next) {
  var id = req.params.id
  User.findById(id, function (err, user) {
    if (err) {
      return next(new Error(err))
    }
    res.json(user) // return all todos
  })
})

routes.route('/login').post(function (req, res, next) {
    var token = jwt.encode(payload, secret);
    console.log(token);
    res.json(token) // return all todos
  })

routes.route('/add').post(function (req, res) {
  User.create(
    {
      name: req.body.name,
      calorieGoal: req.body.calorieGoal,
      burnedCalories: req.body.burnedCalories,
      finished: req.body.finished,
      fitbit: req.body.fitbit
    },
    function (error, user) {
      if (error) {
        res.status(400).send('Unable to create User')
      }
      res.status(200).json(user)
    }
  )
})

routes.route('/update/:id').post(function (req, res, next) {
  var id = req.params.id
  User.findById(id, function (error, user) {
    if (error) {
      console.log("User not found");
      return next(new Error('User was not found'))
    } else {
      console.log("User found")
      user.name = req.body.name
      user.calorieGoal = req.body.calorieGoal
      user.finished = req.body.calorieGoal === 0
      console.log(user)

      user.$__save({},
        function (error, user)
        {
          if (error) {
            console.log("ERROR")
            res.status(400).send('Unable to update user')
          } else {
            console.log("NO ERROR")
            res.status(200).json(user)
          }
        })
    }
  })
})

routes.route('/reset/:id').post(function (req, res, next) {
  var id = req.params.id
  User.findById(id, function (error, user) {
    if (error) {
      console.log("User not found");
      return next(new Error('User was not found'))
    } else {
      console.log("User found")
      user.burnedCalories = 0
      user.finished = false
      console.log(user)

      user.$__save({},
        function (error, user)
        {
          if (error) {
            console.log("ERROR")
            res.status(400).send('Unable to update user')
          } else {
            console.log("NO ERROR")
            res.status(200).json(user)
          }
        })
    }
  })
})

routes.route('/addBurntCalories/:id').post(function (req, res, next) {
  var id = req.params.id
  User.findById(id, function (error, user) {
    if (error) {
      console.log("User not found");
      return next(new Error('User was not found'))
    } else {
      console.log("User found")
      user.burnedCalories = user.burnedCalories + req.body.burnedCalories
      user.finished = user.calorieGoal-user.burnedCalories === 0
      console.log(user)

      user.$__save({},
        function (error, user)
        {
          if (error) {
            console.log("ERROR")
            res.status(400).send('Unable to update user')
          } else {
            console.log("NO ERROR")
            res.status(200).json(user)
          }
        })
    }
  })
})

function calculateCaloriesLeft(calorieGoal, burntCalories){
  console.log(calorieGoal)
  console.log(burntCalories)
  console.log("Calculating")
  calorieGoal = calorieGoal - burntCalories
  if(calorieGoal < 0)
    return 0
  console.log(calorieGoal)
  return calorieGoal
}

module.exports = routes
