import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import User from '../models/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    if (await User.exists({ username })) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch {
    res.status(500).send('Server error');
  }
};

export const logIn = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', (err: { message: any; }, user: Express.User, info: { message: any; }) => {
    if (err || !user) {
      return res.status(400).json({ msg: err ? err.message : info.message });
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json({ msg: 'Login failed' });
      }
      res.json({ msg: 'Logged in successfully' });
    });
  })(req, res, next);
};



export const logOut = (req: Request, res: Response): void => {
  req.logout((err) => {
      if (err) {
          return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logout successful' });
  });
};