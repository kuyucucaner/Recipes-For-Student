const MealPlanModel = require('../models/meal-model');

const createMealPlan = async (req, res) => {
    try {
        const { weekStartDate, meals } = req.body;

        if (!weekStartDate || !meals) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMealPlan = new MealPlanModel({
            user: req.user.id,
            weekStartDate,
            meals
        });

        await newMealPlan.save();
        res.status(201).json(newMealPlan);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlanModel.find({ user: req.user.id }).populate('meals');

        if (!mealPlan) {
            return res.status(404).json({ message: 'No meal plan found' });
        }

        res.status(200).json(mealPlan);

    } catch (error) {
        res.status(500).json({ error: 'Server Error!' });
    }
};

module.exports = { createMealPlan, getMealPlan };
