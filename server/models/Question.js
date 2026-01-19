const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 500,
    },
    subjects: {
      type: [String],
      required: true,
      index: true, // For searching
    },
    institution: {
      type: String, // Optional targeting
    },
    urgency: {
      type: String,
      enum: ['Normal', 'Urgent'],
      default: 'Normal',
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Resolved', 'Expired'],
      default: 'Open',
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      index: { expires: '1s' }, // TTL index, auto-delete if set? Or just use scheduled job. will leave optional for now.
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
