const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStartDate: { type: Date, required: true },
  meals: [
    {
      day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
      meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const MealPlanModel = mongoose.model('MealPlan', MealPlanSchema);
module.exports = MealPlanModel;
