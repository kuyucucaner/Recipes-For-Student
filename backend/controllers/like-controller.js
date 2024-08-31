const PostModel = require('../models/post-model');

const likePost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Paylaşım bulunamadı' });
      }
  
      if (post.likes.includes(req.user.id)) {
        return res.status(400).json({ message: 'Bu paylaşımı zaten beğendiniz' });
      }
  
      post.likes.push(req.user.id);
      await post.save();
  
      res.status(200).json({ message: 'Paylaşım başarıyla beğenildi' });
    } catch (error) {
      res.status(500).json({ error: 'Paylaşımı beğenirken bir hata oluştu.' });
    }
  };
  
  const unlikePost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: 'Paylaşım bulunamadı' });
      }
  
      post.likes.pull(req.user.id);
      await post.save();
  
      res.status(200).json({ message: 'Beğeni başarıyla kaldırıldı' });
    } catch (error) {
      res.status(500).json({ error: 'Beğeniyi kaldırırken bir hata oluştu.' });
    }
  };
  
  module.exports = { likePost, unlikePost };
  