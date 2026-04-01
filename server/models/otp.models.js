import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: Number,
    required: true,
  },

  tempUserData: {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 10,
    },

    password: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
      default: 'https://www.gravatar.com/avatar/default?d=mp&s=200',
    },

    bio: {
      type: String,
      default: '',
      maxlength: 150,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

export const Otp = mongoose.model('otp', otpSchema);
