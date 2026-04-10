import { use } from 'react';
import { Followers } from '../models/followers.model.js';
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.userId; // logged-in user
    const followingId = req.params.id; // target user

    if (!followerId || !followingId) {
      return res.status(400).json({
        success: false,
        message: 'User IDs required',
      });
    }
    const follow = await Followers.create({
      follower: followerId,
      following: followingId,
    });
    return res.status(201).json({
      success: true,
      message: 'User followed successfully',
      data: follow,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Already following',
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfollow = async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followingId = req.params.id;

    if (!userFromUnfollow || !userToUnfollow) {
      return res.status(400).json({
        success: false,
        message: 'User IDs required',
      });
    }

    const unfollow = await Followers.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!unfollow) return res.status(404).json('users relation not found ');
    return res.status(200).json({
      success: true,
      message: 'User unfollowed successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
