const UserModel = require('../models/user-model');

const followUser = async (req, res) => {
    try {
      const userToFollow = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user.id);
  
      if (!userToFollow || !currentUser) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  
      if (currentUser.following.includes(userToFollow._id)) {
        return res.status(400).json({ message: 'Zaten bu kullanıcıyı takip ediyorsunuz' });
      }
  
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
  
      await currentUser.save();
      await userToFollow.save();
  
      res.status(200).json({ message: 'Kullanıcı başarıyla takip edildi' });
    } catch (error) {
      res.status(500).json({ error: 'Takip işlemi sırasında bir hata oluştu.' });
    }
  };
  
  const unfollowUser = async (req, res) => {
    try {
      const userToUnfollow = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.user.id);
  
      if (!userToUnfollow || !currentUser) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  
      currentUser.following.pull(userToUnfollow._id);
      userToUnfollow.followers.pull(currentUser._id);
  
      await currentUser.save();
      await userToUnfollow.save();
  
      res.status(200).json({ message: 'Kullanıcı başarıyla takipten çıkarıldı' });
    } catch (error) {
      res.status(500).json({ error: 'Takipten çıkma işlemi sırasında bir hata oluştu.' });
    }
  };
  // Kullanıcının takipçilerini al
const getFollowers = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('followers', 'name email');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({ error: 'Takipçiler alınırken bir hata oluştu.' });
  }
};

// Kullanıcının takip ettiği kişileri al
const getFollowing = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('following', 'name email');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({ error: 'Takip ettikleriniz alınırken bir hata oluştu.' });
  }
};
  module.exports = { followUser, unfollowUser , getFollowers , getFollowing};
  