const mongoose = require('mongoose')
const modelName = 'Student'

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(modelName, QuestionSchema)