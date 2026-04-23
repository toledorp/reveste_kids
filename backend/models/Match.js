import mongoose from 'mongoose';

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

const Match = mongoose.model('Match', MatchSchema);

export default Match;