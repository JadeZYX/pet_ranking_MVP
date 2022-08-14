const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
  category:String,
  nickname: String,
  age:Number,
  location:String,
  addiction:String,
  images_id:[String],
  like: Number
});

const Pet = mongoose.model('pets', PetSchema);

module.exports = Pet;