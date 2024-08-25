const request = require('supertest');
const express = require('express');
const RecipeModel = require('../../models/recipe-model'); 
const RecipeController = require('../../controllers/recipe-controller'); 
// const { expect } = require('chai');

const app = express();

app.use(express.json()); 
app.get('/api/recipes', RecipeController.getRecipes); 
app.post('/api/recipes', RecipeController.addRecipe);
app.put('/api/recipes/:id', RecipeController.updateRecipe);
app.delete('/api/recipes/:id', RecipeController.deleteRecipe);
app.get('/api/recipes/filter', RecipeController.filterRecipes);

jest.mock('../../models/recipe-model'); 

describe('GET /api/recipes', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should return all recipes', async () => {
    const mockRecipes = [
      { title: 'Recipe 1', ingredients: ['ingredient1'], instructions: 'Mix all.' },
      { title: 'Recipe 2', ingredients: ['ingredient2'], instructions: 'Bake it.' },
    ];

    RecipeModel.find.mockResolvedValue(mockRecipes); 

    const response = await request(app).get('/api/recipes'); 

    expect(response.status).toBe(200); 
    expect(response.body).toEqual(mockRecipes); 
    expect(RecipeModel.find).toHaveBeenCalled(); 
  });

  it('should return 500 if there is a server error', async () => {
    RecipeModel.find.mockRejectedValue(new Error('Server Error')); 

    const response = await request(app).get('/api/recipes'); 

    expect(response.status).toBe(500); 
    expect(response.text).toBe('Server Error'); 
    expect(RecipeModel.find).toHaveBeenCalled(); 
  });
});

describe('POST /api/recipes', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should create a new recipe', async () => {
    const newRecipe = { 
      title: 'Recipe 3', 
      ingredients: ['ingredient3'], 
      instructions: 'Prepare it.', 
      category: 'Food', 
      prepTime: 20, 
      cookTime: 20, 
      totalTime: 40, 
      servings: 4, 
      nutrition: { calories: 100, protein: 20, fat: 20, carbohydrates: 20 }, 
      author: 'Caner', 
      datePublished: '2024-08-19T00:00:00.000+00:00', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeeazugzVRRy-xKO1nZpzhfxrEk9mHH0xXA&s',
      notes: 'This recipe is delicious!', 
      tags: ['food'], 
      reviews: ['66c7aaae209f1c8f1cdc56e1'], 
      averageRating: 5 
    };

    const mockSave = jest.fn().mockResolvedValue(newRecipe);
    RecipeModel.mockImplementation(() => ({ save: mockSave }));

    const response = await request(app)
      .post('/api/recipes')
      .send(newRecipe);

    expect(response.status).toBe(201); 
    expect(response.body).toEqual(newRecipe); 
    expect(RecipeModel).toHaveBeenCalledTimes(1); 
    expect(mockSave).toHaveBeenCalledTimes(1); 
  });
  
  it('should return 500 if there is a server error', async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error('Server Error'));
    RecipeModel.mockImplementation(() => ({ save: mockSave }));

    const response = await request(app)
      .post('/api/recipes')
      .send({});

    expect(response.status).toBe(500); 
    expect(response.text).toBe('Server Error'); 
    expect(RecipeModel).toHaveBeenCalledTimes(1); 
    expect(mockSave).toHaveBeenCalledTimes(1); 
  });
});

describe('PUT /api/recipes/:id', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should update a recipe', async () => {
    const updateRecipe = {
      title: 'Updated Recipe', 
      ingredients: ['ingredient1', 'ingredient2'], 
      instructions: 'Mix and cook.', 
      category: 'Dessert', 
      prepTime: 15, 
      cookTime: 30, 
      totalTime: 45, 
      servings: 4, 
      nutrition: { calories: 250, protein: 10, fat: 10, carbohydrates: 30 }, 
      author: 'Caner', 
      datePublished: '2024-08-20T00:00:00.000+00:00', 
      image: 'https://example.com/updated-recipe.jpg',
      notes: 'This recipe is even better!', 
      tags: ['dessert'], 
      reviews: ['66c7aaae209f1c8f1cdc56e1'], 
      averageRating: 4.5 
    };

    const recipeID = '66c7a888057cebe2efcaf437';

    RecipeModel.findById.mockResolvedValue({ _id: recipeID, ...updateRecipe });
    RecipeModel.findByIdAndUpdate.mockResolvedValue({ _id: recipeID, ...updateRecipe });

    const response = await request(app)
      .put(`/api/recipes/${recipeID}`)
      .send(updateRecipe);

    expect(response.status).toBe(201); 
    expect(response.body).toEqual({ _id: recipeID, ...updateRecipe }); 
    expect(RecipeModel.findById).toHaveBeenCalledWith(recipeID); 
    expect(RecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(recipeID, updateRecipe, { new: true, runValidators: true }); 
  });

  it('should return 404 if recipe is not found', async () => {
    const recipeID = '66c7a888057cebe2efcaf437';

    RecipeModel.findById.mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/recipes/${recipeID}`)
      .send({});

    expect(response.status).toBe(404); 
    expect(response.body.msg).toBe('Recipe not found'); 
  });

  it('should return 500 if there is a server error', async () => {
    const recipeID = '66c7a888057cebe2efcaf437';

    RecipeModel.findById.mockResolvedValue({ _id: recipeID });
    RecipeModel.findByIdAndUpdate.mockRejectedValue(new Error('Server Error'));

    const response = await request(app)
      .put(`/api/recipes/${recipeID}`)
      .send({});

    expect(response.status).toBe(500); 
    expect(response.text).toBe('Server Error'); 
  });
});

describe('DELETE /api/recipes/:id', () => {
    beforeEach(() => {
        RecipeModel.findByIdAndDelete.mockReset();
      });
    
      afterAll(() => {
        jest.clearAllMocks();
      });
  
    it('should delete a recipe', async () => {
      const recipeID = '66c7a888057cebe2efcaf437';
      RecipeModel.findByIdAndDelete.mockResolvedValue({ _id: recipeID });
  
      const response = await request(app).delete(`/api/recipes/${recipeID}`);
  
      expect(response.status).toBe(200); // Başarı kodunu 200 yapın
      expect(response.body.msg).toBe('Recipe removed');
    });
  
    it('should return 404 if recipe is not found', async () => {
      const recipeID = '66c7a888057cebe2efcaf437';
      RecipeModel.findById.mockResolvedValue(null); // Reçete bulunamadığında null döndür
  
      const response = await request(app).delete(`/api/recipes/${recipeID}`);
  
      expect(response.status).toBe(404); // 404 döndürülmelidir
      expect(response.body.msg).toBe('Recipe not found');
    });
  
    it('should return 500 if there is a server error', async () => {
      const recipeID = '66c7a888057cebe2efcaf437';
  
      RecipeModel.findByIdAndDelete.mockRejectedValue(new Error('Server Error'));
  
      const response = await request(app).delete(`/api/recipes/${recipeID}`);
  
      expect(response.status).toBe(500);
      expect(response.text).toBe('Server Error');
    });
  });
  
describe('GET /api/recipes/filter', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return filtered recipes based on query parameters', async () => {
        const mockRecipes = [{ title: 'Test Recipe', category: 'Dessert' }];
        RecipeModel.find.mockResolvedValue(mockRecipes);
    
        const response = await request(app)
          .get('/api/recipes/filter')
          .query({ search: 'Test', category: 'Dessert' });
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockRecipes);
      });
      it('should return 500 if there is a server error', async () => {
        RecipeModel.find.mockRejectedValue(new Error('Server Error')); 
    
        const response = await request(app).get('/api/recipes'); 
    
        expect(response.status).toBe(500); 
        expect(response.text).toBe('Server Error'); 
        expect(RecipeModel.find).toHaveBeenCalled(); 
      });
});