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
