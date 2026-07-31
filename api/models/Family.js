const mongoose = require('mongoose');

const SubFamilySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  headName: {
    type: String,
    required: true
  },
  members: [{
    name: String,
    relation: String,
    age: Number,
    contact: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FamilySchema = new mongoose.Schema({
  familyName: {
    type: String,
    required: [true, 'Please provide a family name'],
    unique: true
  },
  headName: {
    type: String,
    required: true
  },
  headUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  subFamilies: [SubFamilySchema],
  totalMembers: {
    type: Number,
    default: 0
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model('Family', FamilySchema);