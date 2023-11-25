import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/service/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = []; // New array to hold filtered recipes

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
        // Initially, both arrays are the same
        this.filteredRecipes = [...this.recipes];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editRecipe(recipe: Recipe): void {
    // Navigate to the edit form with the recipe data
    this.router.navigate(['/edit-recipe', recipe.id]);
  }




  deleteRecipe(recipeId: number | undefined): void {
    if (recipeId !== undefined) {
      this.recipeService.deleteRecipe(recipeId).subscribe(
        () => {
          console.log('Recipe deleted successfully.');
          // Refresh the recipe list after deletion
          this.loadRecipes();
        },
        (error) => {
          console.log('Error deleting recipe:', error);
        }
      );
    } else {
      console.log('Recipe ID is undefined. Cannot delete.');
    }
  }


  searchRecipes(query: string): void {
    // Implement your logic to filter recipes based on the search query
    // For simplicity, this example filters recipes based on name, ingredients, or preparation time
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.join(',').toLowerCase().includes(query.toLowerCase()) ||
      recipe.preparationTime.toString().includes(query)
    );
  }
}