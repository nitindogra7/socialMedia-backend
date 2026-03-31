import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture, bio } = req.body;
    if (!username || username.length > 10 || username.length < 4)
      return res
        .status(400)
        .json({ success: false, message: 'enter a valid username' });

    if (!email || !emailRegex.test(email))
      return res
        .status(400)
        .json({ success: false, message: 'email must be correct' });

    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be 8-20 characters and include uppercase, lowercase, number, and special character',
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: 'user already exists' });
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
      bio,
    });
    const { password: _, ...saferUser } = user.toObject();
    res
      .status(201)
      .send({ success: false, user: saferUser, message: 'user registered' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: 'internal server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Must provide a password and either an email or username',
      });
    }

    const user = await (email
      ? User.findOne({ email })
      : User.findOne({ username }));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    const { password: _, ...saferUser } = user.toObject();
    if (!checkPassword)
      return res
        .status(400)
        .json({ success: false, message: 'invalid password please try again' });
    res
      .status(200)
      .json({ success: true, saferUser, message: 'User logged in' });
  } catch (error) {
    console.error('Login error:', error.message, error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
