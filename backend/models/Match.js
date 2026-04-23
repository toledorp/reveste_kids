const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clothing',
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    interestedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['MATCHED', 'CLOSED', 'CANCELLED'],
      default: 'MATCHED',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', MatchSchema);