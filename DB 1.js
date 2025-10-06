const mongoose = require('mongoose');

// Define the schema for the Student model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required.'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Student age is required.'],
    min: [1, 'Age must be a positive number.'],
  },
  course: {
    type: String,
    required: [true, 'Course is required.'],
    trim: true,
  },
  grade: {
    type: String,
    required: [true, 'Student grade is required.'],
    trim: true,
  }
}, {
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true 
});

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

