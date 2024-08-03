const User = require('../models/user-model');
const {sendEmail} = require('../controllers/mail-controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id, role, expiresIn ) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};
const generateRefreshToken = (id, role , expiresIn) => {
  return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET,  { expiresIn });
};
const AuthController = {
  registerUser: async function (req, res) {
    const { username, email, password, role } = req.body;

    try {
      // Kullanıcı var mı kontrol et
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Yeni kullanıcı oluştur
      const user = new User({ username, email, password, role });
      
      // E-posta doğrulama token'ı oluştur
      const verificationToken = user.createVerificationToken();
      await user.save();

      // Doğrulama bağlantısını oluştur
      const verificationUrl = `http://${req.headers.host}/api/users/verify/${verificationToken}`;
      
      // Kullanıcıya e-posta gönder
      await sendEmail(email, 'Please verify your email', `Click the link to verify your email: ${verificationUrl}`);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Error in registerUser:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  },

  verifyEmail: async function (req, res) {
    const { token } = req.params;

    try {
      const user = await User.findOne({ verificationToken: token });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({ message: 'Email successfully verified' });
    } catch (error) {
      console.error('Error in verifyEmail:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  authUser: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        if (!user.isVerified) {
          return res.status(401).json({ message: 'Email not verified' });
        }


        const accessToken = generateToken(user._id, user.role, '1h');
        const refreshToken = generateRefreshToken(user._id, user.role, '30d');
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('accessToken', accessToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 60 * 60 * 1000 // 1 hour
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error in authUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  refreshToken: async function (req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = generateToken(user._id, user.role, '1h');

      res.cookie('accessToken', newAccessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 1 hour
      });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error in refreshToken:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  logoutUser: async function (req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token provided' });
    }

    try {
      const user = await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });

      if (!user) {
        return res.status(400).json({ message: 'Invalid refresh token' });
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error in logoutUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = AuthController;
