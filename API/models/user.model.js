import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [ true, "Name is required" ],
    trim: true,
  },
  email: {
    type: String,
    required: [ true, "email is required" ],
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [ true, "Mobile is required" ],
    maxlength: 13,
    minlength: 10,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [ true, "Password is required" ],
    maxlength: 20,
    minlength: 5,
    trim: true
  },
  role: String,
  status: Number,
  date: String,
  time: String,
  user_token: String,
});

// Apply the uniqueValidator plugin to UserSchema.
UserSchema.plugin(uniqueValidator);

// compile schema to model
const UserSchemaModel = mongoose.model('user_collection', UserSchema);

export default UserSchemaModel