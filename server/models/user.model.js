import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'user name required'],
      unique: [true, 'username must be true'],
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [10, 'Username cannot exceed 10 characters'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    profilePicture: {
      type: String,
      default: 'https://www.gravatar.com/avatar/default?d=mp&s=200',
    },
    bio: {
      type: String,
      default: '',
      maxLength: [150, 'cannot exceed 150 character'],
    },
    verified: {
      type: Boolean,
      required: true,
      default : false
    },
    refreshToken: {
      type : String,
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUNDS)
  );
});

export const User = mongoose.model('user', userSchema);
