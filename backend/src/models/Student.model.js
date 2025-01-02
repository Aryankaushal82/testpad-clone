import mongoose, { Schema } from "mongoose";
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "StudentClass"
  },
  email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
  password : {
    type: String,
    required: true
  },
  rollNumber: {
    type: Number,
  },
  listedTest:{
    type:Schema.Types.ObjectId,
    ref:'Test'
  }
}, {timestamps: true})

export const Student = mongoose.model('Student', studentSchema);