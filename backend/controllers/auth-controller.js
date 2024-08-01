const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id,role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const AuthController = {
  registerUser: async function (req, res) {
    const { username, email, password, role } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({ username, email, password, role });

      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      console.error('Error in registerUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  authUser: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.role);
        res.cookie('token', token, {
          httpOnly: false, // değiştir
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 30 * 24 * 60 * 60 * 1000
        });
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        });
        console.log('User',user);
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error in authUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = AuthController;
