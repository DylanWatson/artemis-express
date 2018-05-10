var mongoose = require('mongoose')

// Define collection and schema for todo item

var user = new mongoose.Schema({
  name: {
    type: String
  },

  calorieGoal: {
    type: Number
  },

  finished: {
    type: Boolean
  }
},

  {
    collection: 'artemis'
  }
)

module.exports = mongoose.model('User', user)
