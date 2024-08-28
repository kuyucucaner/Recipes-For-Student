const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan', required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const ShoppingListModel = mongoose.model('ShoppingList', ShoppingListSchema);
module.exports = ShoppingListModel;
