import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    postUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
