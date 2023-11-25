package com.recipe.controller;

import com.recipe.domain.Recipe;
import com.recipe.service.IRecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@AllArgsConstructor
public class RecipeController {

    private IRecipeService recipeService;

    @PostMapping
    public ResponseEntity<Object> createRecipe(@RequestBody Recipe recipe) {
        System.out.println(recipe);
        try {
            // Validation: Ensure that the recipe name is not empty
            if (recipe.getName() == null || recipe.getName().trim().isEmpty()) {
                return new ResponseEntity<>("Recipe name cannot be empty", HttpStatus.BAD_REQUEST);
            }

            // Assume the currently authenticated user is the recipe owner
            //Long userId = getUserIdFromPrincipal(principal);
            Long userId = 1L;
            Recipe createdRecipe = recipeService.createRecipe(recipe, userId);
            return new ResponseEntity<>(createdRecipe, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create recipe. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllRecipes() {
        try {
            //Long userId = getUserIdFromPrincipal(principal);
            List<Recipe> recipes = recipeService.getAllRecipes();
            return new ResponseEntity<>(recipes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve recipes. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<Object> getRecipeById(@PathVariable Long recipeId, Principal principal) {
        try {
            Long userId = 1L;
            Recipe recipe = recipeService.getRecipeById(recipeId, userId);
            if (recipe != null) {
                return new ResponseEntity<>(recipe, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve recipe. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{recipeId}")
    public ResponseEntity<Object> updateRecipe(
            @PathVariable Long recipeId,
            @RequestBody Recipe updatedRecipe
    ) {
        System.out.println(updatedRecipe);
        try {
            // Validation: Ensure that the recipe name is not empty
            if (updatedRecipe.getName() == null || updatedRecipe.getName().trim().isEmpty()) {
                return new ResponseEntity<>("Recipe name cannot be empty", HttpStatus.BAD_REQUEST);
            }

            Long userId =  1L;
            Recipe updated = recipeService.updateRecipe(recipeId, updatedRecipe, userId);
            System.out.println(updated);
            if (updated != null) {
                return new ResponseEntity<>(updated, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Recipe not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update recipe. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{recipeId}")
    public ResponseEntity<Object> deleteRecipe(@PathVariable Long recipeId) {
        try {
//            Long userId = getUserIdFromPrincipal(principal);
            Long userId=1L;
            recipeService.deleteRecipe(recipeId, userId);
            return new ResponseEntity<>("Recipe deleted successfully", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete recipe. " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long getUserIdFromPrincipal(Principal principal) {
        // This assumes that the Principal object contains user information, adjust as needed
        // For a more sophisticated implementation, consider using Spring Security
        // For simplicity, we're assuming the username is the user ID
        return Long.parseLong(principal.getName());
    }
}
