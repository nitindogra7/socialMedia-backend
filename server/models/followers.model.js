import mongoose from 'mongoose';

const followerSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

followerSchema.index({ follower: 1, following: 1 }, { unique: true });

export const Followers = mongoose.model('Followers', followerSchema);
