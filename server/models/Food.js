const { Schema } = require('mongoose');

//This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const foodSchema = new Schema({
  food:
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

module.exports = foodSchema;
