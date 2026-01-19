const mongoose = require('mongoose');

const reputationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    points: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    relatedEntity: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'entityType', // Dynamic Ref
    },
    entityType: {
      type: String,
      enum: ['Question', 'Chat', 'Report'],
    },
  },
  {
    timestamps: true,
  }
);

const Reputation = mongoose.model('Reputation', reputationSchema);

module.exports = Reputation;
