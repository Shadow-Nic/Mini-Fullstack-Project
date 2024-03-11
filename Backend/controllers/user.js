import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { issueJwt } from "../helpers/jwt.js";




export const login = async (req, res) => {
  const { username, password } = req.body.user;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid login credentials',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid login credentials',
      });
    }


    const token = issueJwt(user);
    res.cookie("_auth", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: 'Logged in successfully',
      user: {
        username: user.username,
        token: token
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      return res.status(400).json({
        message: 'Username is not available',
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

// Helper functions

const checkUsernameAvailability = async (username) => {
  return !await User.findOne({ username });

};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

