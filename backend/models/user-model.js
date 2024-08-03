const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');  // Add this import

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    enum: [0, 1, 2]  // Sadece bu değerler kabul edilecek
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  verificationToken: {
    type: String,
    default: null
  },
  refreshToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Şifreyi kaydetmeden önce hashle
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre karşılaştırma metodu
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Token oluşturma metodu
UserSchema.methods.createVerificationToken = function () {
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.verificationToken = verificationToken;
    return verificationToken;
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
