import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';
import { AuthenticatedRequest } from '../common/types/types';

dotenv.config();

const signUp = async (req: Request, res: Response) => {
  console.log("sign-up")
  const { fullName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name:fullName, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    res.status(201).json({ message: 'User created successfully', token, user: newUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
};

const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk((req as AuthenticatedRequest).user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export { signUp, signIn, getAuthenticatedUser };
