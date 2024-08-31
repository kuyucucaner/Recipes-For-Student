import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFilterRecipes,
  fetchRecipes,
} from "../features/recipes/recipes-slice";
import Recipe from "./recipe";
import "../styles/recipe-list.css";

const RecipeList = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recipeStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  // State Definitions
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrepTime: "",
    maxPrepTime: "",
    minCookTime: "",
    maxCookTime: "",
  });
  const [isFiltered, setIsFiltered] = useState(false);

  // UseEffect Hook
  useEffect(() => {
    if (!isFiltered) {
      dispatch(fetchRecipes());
    }
  }, [isFiltered, dispatch]);

  // Event Handler Functions
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setIsFiltered(true);
    dispatch(fetchFilterRecipes(filters));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrepTime: "",
      maxPrepTime: "",
      minCookTime: "",
      maxCookTime: "",
    });
    setIsFiltered(false);
  };

  // Status Checks
  if (recipeStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (recipeStatus === "failed") {
    return <div>{error}</div>;
  }

  // Render
  return (
    <div className="recipe-list-container">
      <div className="filters">
        <input
          type="text"
          className="recipe-filter-input"
          placeholder="Ara..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          className="recipe-filter-input"
          placeholder="Kategori..."
          value={filters.category}
          onChange={handleFilterChange}
        />
        <div className="time-filters">
          <input
            type="number"
            className="recipe-filter-input"
            placeholder="Min. Hazırlama Süresi..."
            value={filters.minPrepTime}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            className="recipe-filter-input"
            placeholder="Maks. Hazırlama Süresi..."
            value={filters.maxPrepTime}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            className="recipe-filter-input"
            placeholder="Min. Pişirme Süresi..."
            value={filters.minCookTime}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            className="recipe-filter-input"
            placeholder="Maks. Pişirme Süresi..."
            value={filters.maxCookTime}
            onChange={handleFilterChange}
          />
        </div>
        <button className='recipe-filter-button' onClick={handleSearch}>Ara</button>
        <button className='recipe-filter-button' onClick={handleClearFilters}>Filtreleri Temizle</button>
      </div>
      <div className="recipe-list-row">
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
