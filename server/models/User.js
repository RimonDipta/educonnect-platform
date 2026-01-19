const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    academicLevel: {
      type: String,
      enum: ['School', 'College', 'University'],
      required: true,
    },
    year: {
      type: String, // Can be "1st Year", "Class 10", etc.
    },
    role: {
      type: String,
      enum: ['Junior', 'Senior'],
      default: function () {
        // Default logic: University students are Seniors, others are Juniors
        return this.academicLevel === 'University' ? 'Senior' : 'Junior';
      },
    },
    expertise: {
      type: [String], // Array of subjects for Seniors
      default: [],
    },
    availabilityStatus: {
      type: String,
      enum: ['Online', 'Busy', 'Offline'],
      default: 'Offline',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
