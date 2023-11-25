package com.recipe.service;

import com.recipe.domain.Recipe;

import java.util.List;

public interface IRecipeService {

    Recipe createRecipe(Recipe recipe, Long userId);
    List<Recipe> getAllRecipes();
    Recipe getRecipeById(Long recipeId, Long userId);
    Recipe updateRecipe(Long recipeId, Recipe updatedRecipe, Long userId);
    void deleteRecipe(Long recipeId, Long userId);
}
