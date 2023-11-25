package com.recipe;

import com.recipe.domain.Recipe;
import com.recipe.service.IRecipeService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
@AllArgsConstructor
public class RecipeManagementApplication {

	private final IRecipeService recipeService;

	public static void main(String[] args) {
		SpringApplication.run(RecipeManagementApplication.class, args);
	}


	@Bean
	public CommandLineRunner dataLoader() {
		return args -> {
			// You can add your initial recipes here
			Recipe recipe1 = new Recipe();
			recipe1.setName("Spaghetti Bolognese");
			recipe1.setIngredients(Arrays.asList("Ground beef", "Tomato sauce", "Spaghetti"));
			recipe1.setPreparationSteps(Arrays.asList("Brown the ground beef", "Add tomato sauce", "Cook spaghetti"));
			recipe1.setPreparationTime(30);

			Recipe recipe2 = new Recipe();
			recipe2.setName("Chicken Stir Fry");
			recipe2.setIngredients(Arrays.asList("Chicken breast", "Vegetables", "Soy sauce"));
			recipe2.setPreparationSteps(Arrays.asList("Cook chicken", "Stir fry vegetables", "Add soy sauce"));
			recipe2.setPreparationTime(25);

			// Assuming a user with ID 1 is the owner of these initial recipes
			Long userId = 1L;

			// Save the recipes to the database
			recipeService.createRecipe(recipe1, userId);
			recipeService.createRecipe(recipe2, userId);
		};
	}
}
