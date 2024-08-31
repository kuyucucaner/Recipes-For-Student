const UserModel = require('../models/user-model');
const RecipeModel = require('../models/recipe-model');

const getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Kullanıcıyı veri tabanından çek
    const user = await UserModel.findById(userId)
      .populate('favoriteRecipes')
      .populate('viewedRecipes');

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Kullanıcının favori tariflerinden ve görüntülediği tariflerden kategorileri al
    const favoriteCategories = user.favoriteRecipes.map(recipe => recipe.category);
    const viewedCategories = user.viewedRecipes.map(recipe => recipe.category);
    const searchKeywords = user.searchHistory;

    // Kullanıcının favori ve görüntülediği tariflerin kategorileri ile eşleşen tarifleri getir
    const recommendedRecipes = await RecipeModel.find({
      $or: [
        { category: { $in: favoriteCategories } },
        { category: { $in: viewedCategories } },
        { tags: { $in: searchKeywords } }
      ]
    });

    res.status(200).json(recommendedRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Öneriler alınırken bir hata oluştu.' });
  }
};

module.exports = {
  getPersonalizedRecommendations
};
