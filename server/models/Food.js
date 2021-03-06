const { Schema, model } = require('mongoose');

//This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const foodSchema = new Schema({
  foodName:
    {
      type: String,
      required: true,
    },
  expiration: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Food = model('Food', foodSchema); 

module.exports = Food;
