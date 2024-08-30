const ShoppingListModel = require('../models/shopping-model');

// Create a new shopping list
const createShoppingList = async (req, res) => {
    try {
        const { mealPlan, items } = req.body;

        const shoppingList = new ShoppingListModel({
            user: req.user.id,
            mealPlan,
            items
        });

        await shoppingList.save();
        res.status(201).json(shoppingList);
    } catch (error) {
        res.status(500).json({ error: 'Server error!' });
    }
};

// Get a shopping list by user ID
const getShoppingList = async (req, res) => {
    try {
        const shoppingList = await ShoppingListModel.findOne({ user: req.user.id }).populate('mealPlan');

        if (!shoppingList) {
            return res.status(404).json({ message: 'No shopping list found' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        res.status(500).json({ error: 'Server error!' });
    }
};

// Update a shopping list
const updateShoppingList = async (req, res) => {
    try {
        const { items } = req.body;

        const shoppingList = await ShoppingListModel.findOneAndUpdate(
            { user: req.user.id },
            { items },
            { new: true }
        );

        if (!shoppingList) {
            return res.status(404).json({ message: 'No shopping list found to update' });
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        res.status(500).json({ error: 'Server error!' });
    }
};

// Delete a shopping list
const deleteShoppingList = async (req, res) => {
    try {
        const shoppingList = await ShoppingListModel.findOneAndDelete({ user: req.user.id });

        if (!shoppingList) {
            return res.status(404).json({ message: 'No shopping list found to delete' });
        }

        res.status(200).json({ message: 'Shopping list deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error!' });
    }
};

module.exports = {
    createShoppingList,
    getShoppingList,
    updateShoppingList,
    deleteShoppingList
};
