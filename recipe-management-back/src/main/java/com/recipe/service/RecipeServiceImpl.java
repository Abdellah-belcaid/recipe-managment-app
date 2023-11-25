package com.recipe.service;

import com.recipe.domain.Recipe;
import com.recipe.repository.RecipeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class RecipeServiceImpl implements IRecipeService {

    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(Recipe recipe, Long userId) {
        // Set user id in the recipe before saving to associate the recipe with the user
        // Perform other necessary validations
        return recipeRepository.save(recipe);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe getRecipeById(Long recipeId, Long userId) {
        // Add logic to check if the recipe belongs to the user
        return recipeRepository.findById(recipeId).orElse(null);
    }

    @Override
    public Recipe updateRecipe(Long recipeId, Recipe updatedRecipe, Long userId) {
        // Step 1: Check if the existing recipe with the specified recipeId exists
        Optional<Recipe> optionalExistingRecipe = recipeRepository.findById(recipeId);

        if (optionalExistingRecipe.isPresent()) {
            Recipe existingRecipe = optionalExistingRecipe.get();

            // Step 2: Verify if the recipe belongs to the user with the specified userId
            //existingRecipe.getUserId().equals(userId
            if (1 == 1) {

                // Step 3: Update existingRecipe with fields from updatedRecipe
                existingRecipe.setName(updatedRecipe.getName());
                existingRecipe.setIngredients(updatedRecipe.getIngredients());
                existingRecipe.setPreparationSteps(updatedRecipe.getPreparationSteps());
                existingRecipe.setPreparationTime(updatedRecipe.getPreparationTime());
                existingRecipe.setPhotoUrl(updatedRecipe.getPhotoUrl());

                // You can perform additional validations or business logic here

                // Step 4: Save the updated recipe in the repository
                return recipeRepository.save(existingRecipe);
            } else {
                // Recipe does not belong to the specified user
                System.out.println("You do not have permission to update this recipe");
            }
        }

        return null;

    }


    @Override
    public void deleteRecipe(Long recipeId, Long userId) {
        // Add logic to check if the recipe belongs to the user
        recipeRepository.deleteById(recipeId);
    }
}