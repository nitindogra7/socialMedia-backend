import { User } from '../models/user.model.js';
import generateOtp from '../services/otpGenerator.services.js';
import sendOtp from '../services/nodemailer.services.js';
import bcrypt from 'bcrypt';
import { Otp } from '../models/otp.models.js';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

export const registerUser = async (req, res) => {
  try {
    let { username, email, password, profilePicture, bio } = req.body;
    email = email.toLowerCase();
    if (!username || username.length > 10 || username.length < 3)
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

    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: 'user already exists' });

    const otp = generateOtp();
    await Otp.findOneAndUpdate(
      { email },
      {
        otp,
        tempUserData: {
          username,
          password,
          profilePicture,
          bio,
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    res.status(200).send({
      success: true,
      message: 'otp sent successfully',
    });
    sendOtp(otp, email);
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
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your account first',
      });
    }
    res
      .status(200)
      .json({ success: true, saferUser, message: 'User logged in' });
  } catch (error) {
    console.error('Login error:', error.message, error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    let { email, userOtp } = req.body;
    email = email.toLowerCase();
    const finalOtp = parseInt(userOtp);

    if (!userOtp)
      return res.status(400).json({ success: false, message: 'otp required' });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'OTP expired or not found',
      });
    }
    if (otpRecord.otp !== finalOtp)
      return res
        .status(400)
        .json({ success: false, message: 'enter a valid otp' });
    const { username, password, profilePicture, bio } = otpRecord.tempUserData;
    const user = await User.create({
      username,
      email,
      password,
      profilePicture,
      bio,
      verified: true,
    });
    await Otp.findOneAndDelete({ email });
    const { password: _, ...useraData } = user.toObject();
    res
      .status(201)
      .json({ success: true, message: 'user created successfully', useraData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'failed to verify otp' });
  }
};
