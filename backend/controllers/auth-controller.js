const UserModel = require("../models/user-model");
const { sendEmail } = require("../controllers/mail-controller");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};
const generateRefreshToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn,
  });
};
const AuthController = {
  registerUser: async function (req, res) {
    const { username, email, password, role } = req.body;

    try {
      // Kullanıcı var mı kontrol et
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Yeni kullanıcı oluştur
      const user = new UserModel({ username, email, password, role });

      // E-posta doğrulama token'ı oluştur
      const verificationToken = user.createVerificationToken();
      await user.save();

      // Doğrulama bağlantısını oluştur
      const verificationUrl = `http://${req.headers.host}/api/users/verify/${verificationToken}`;

      // Kullanıcıya e-posta gönder
      await sendEmail(
        email,
        "Please verify your email",
        `Click the link to verify your email: ${verificationUrl}`
      );

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  },

  verifyEmail: async function (req, res) {
    const { token } = req.params;

    try {
      const user = await UserModel.findOne({ verificationToken: token });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      user.isVerified = true;
      user.verificationToken = null;
      await user.save();

      res.status(200).json({ message: "Email successfully verified" });
    } catch (error) {
      console.error("Error in verifyEmail:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  authUser: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        if (!user.isVerified) {
          return res.status(401).json({ message: "Email not verified" });
        }

        const accessToken = generateToken(user._id, user.role, "1h");
        const refreshToken = generateRefreshToken(user._id, user.role, "30d");
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error in authUser:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  refreshToken: async function (req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await UserModel.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = generateToken(user._id, user.role, "1h");

      res.cookie("accessToken", newAccessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Error in refreshToken:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  logoutUser: async function (req, res) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    try {
      const user = await UserModel.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
      );

      if (!user) {
        return res.status(400).json({ message: "Invalid refresh token" });
      }

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Error in logoutUser:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUserById: async function (req, res) {
    const { accessToken } = req.cookies;
    console.log("req cookies : ", req.cookies);
    if (!accessToken) {
      console.warn("Access token missing");

      return res.status(400).json({ message: "No access token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        console.warn(`User not found for ID: ${decoded.id}`);
        return res.status(404).json({ message: "User not found!" });
      }
      console.log("User : ", user);
      res.status(200).json({ user });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.warn("Access token expired");

        return res.status(401).json({ message: "Access token expired" });
      }

      if (error.name === "JsonWebTokenError") {
        console.warn("Invalid access token");

        return res.status(401).json({ message: "Invalid access token" });
      }

      console.error("Error in getUserById:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateUserById: async function (req, res) {
    try {
      const user = await UserModel.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updates = req.body; // `updates` nesnesi olarak `req.body`'yi kullanın

      Object.keys(updates).forEach((key) => {
        user[key] = updates[key];
      });
      await user.save();

      res.status(200).json({
        message: "User updated successfully!",
        user,
      });
    } catch (error) {
      console.error("Error in getUserById:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteUserById: async function (req, res) {
    try {
      const user = await UserModel.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role === 1) {
        await UserModel.deleteOne({ _id: req.params.userId });
        return res.status(200).json({ message: "User deleted successfully!" });
      } else {
        return res.status(400).json({ message: "User role is not Admin!" });
      }
    } catch (error) {
      console.error("Error in deleteUserById:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  addFavoriteRecipe: async function (req, res) {
    try {
      const { userId, recipeId } = req.params;

      const user = await UserModel.findById(userId);
      if (!user.favoriteRecipes.includes(recipeId)) {
        user.favoriteRecipes.push(recipeId);
      }

      await user.save();
      res.json(user);
    } catch (error) {
      console.error("Error in add favorite recipe:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  getFavoriteRecipeListByUserId: async function (req, res) {
    const { accessToken } = req.cookies;
    console.log("req cookies :", req.cookies);

    if (!accessToken) {
      console.warn("Access token missing");
      return res.status(400).json({ message: "No access token provided" });
    }

    try {
      // Access token'ı doğrula ve kullanıcıyı al
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id).populate(
        "favoriteRecipes"
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kullanıcının favori tariflerini döndür
      return res.status(200).json(user.favoriteRecipes);
    } catch (error) {
      console.error("Error in Get Favorite Recipe List By User ID", error);
      return res.status(500).json({ message: "Server Error!" });
    }
  },
};

module.exports = AuthController;
