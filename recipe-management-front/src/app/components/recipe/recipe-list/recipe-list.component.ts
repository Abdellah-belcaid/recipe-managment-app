import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/service/recipe.service';
import { getStatusName, showAlert } from 'src/app/utils/alertMessages';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = []; // New array to hold filtered recipes
  noResultsMessage: String = "";
  randomMealImage: string | undefined;



  constructor(private recipeService: RecipeService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadRecipes();
    this.getRandomMealImage();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
        // Initially, both arrays are the same
        this.filteredRecipes = [...this.recipes];
      },
      (error) => {
        showAlert('error', `Error : ${getStatusName(error.status)}`, `${error.message}`);
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
          showAlert('success', 'Success', 'Recipe deleted successfully.');
          console.log('Recipe deleted successfully.');
          // Refresh the recipe list after deletion
          this.loadRecipes();
        },
        (error) => {
          showAlert('error', `Error : ${getStatusName(error.status)}`, `${error.message}`);
          console.log('Error deleting recipe:', error);
        }
      );
    } else {
      showAlert('error', `Error : ${getStatusName(400)}`, `Recipe ID is undefined. Cannot delete.`);
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

    // Display a message when there are no results
    if (this.filteredRecipes.length === 0) {
      this.noResultsMessage = `No recipes found for "${query}".`;
    } else {
      this.noResultsMessage = '';
    }
  }




  getRandomMealImage(): void {
    this.http.get(`https://www.themealdb.com/api/json/v1/1/random.php`).subscribe(
      (data: any) => {

        console.log(data.meals[0].strMealThumb);
        this.randomMealImage = data.meals[0].strMealThumb;
      },
      (error) => {
        console.error('Error fetching random meal image:', error);
      }
    );
  }
}