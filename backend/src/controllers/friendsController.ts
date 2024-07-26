import { Request, Response } from "express";
import dotenv from "dotenv";
import { Op } from "sequelize";
import User from "../models/user";
import { AuthenticatedRequest } from "../common/types/types";
import Friendship from "../models/friendship";

dotenv.config();

const getUsersByName = async (req: Request, res: Response) => {
  const { name } = req.query as { name: string };
  const userId = (req as AuthenticatedRequest).user.id;

  try {
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
        id: {
          [Op.not]: userId,
        },
      },
      attributes: ["id", "name"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { friendId } = req.body;
  const userId = (req as AuthenticatedRequest).user.id;

  try {
    const existingFriendship = await Friendship.findOne({
      where: {
        [Op.or]: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });

    if (existingFriendship) {
      return res.status(400).json({ error: 'Friendship request already exists' });
    }

    const friendship = await Friendship.create({
      userId,
      friendId,
      status: 'pending',
    });

    res.status(201).json(friendship);
  } catch (error) {
    console.error('Error in sendFriendRequest:', error);
    res.status(500).json({ error: 'Failed to send friend request' });
  }
};

export const getFriendRequests = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).user.id;

  try {
    const requests = await Friendship.findAll({
      where: {
        friendId: userId,
        status: 'pending',
      },
      include: [{ model: User, as: 'user', attributes: ['name'] }],
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch friend requests' });
  }
};

export const approveFriendRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as AuthenticatedRequest).user.id;

  try {
    const friendship = await Friendship.findOne({
      where: {
        id,
        friendId: userId,
        status: 'pending',
      },
      include: [{ model: User, as: 'user', attributes: ['name'] }],
    });

    if (!friendship) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    friendship.status = 'accepted';
    await friendship.save();

    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve friend request' });
  }
};

export const denyFriendRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as AuthenticatedRequest).user.id;

  try {
    const friendship = await Friendship.findOne({
      where: {
        id,
        friendId: userId,
        status: 'pending',
      },
    });

    if (!friendship) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    friendship.status = 'denied';
    await friendship.save();

    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ error: 'Failed to deny friend request' });
  }
};

export const getFriends = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).user.id;
  try {
    const friends = await Friendship.findAll({
      where: {
        [Op.or]: [
          { userId, status: 'accepted' },
          { friendId: userId, status: 'accepted' },
        ],
      },
      include: [
        {
          model: User,
          as: 'friend',
          attributes: ['name'],
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          required: false,
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          required: false,
        },
      ],
    });
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching friends", error });
  }
};



export { getUsersByName };
