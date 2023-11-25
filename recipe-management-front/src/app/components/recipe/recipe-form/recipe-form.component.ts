import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe = new Recipe();
  isEditMode: boolean = false;
  preparationSteps: String = "";
  ingredients: String = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'] as number | undefined;
      if (id !== undefined) {
        this.isEditMode = true;
        this.loadRecipe(id);
      }
    });
  }
  loadRecipe(id: number | undefined): void {
    if (id !== undefined) {
      this.recipeService.getRecipeById(id).subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;

          this.ingredients = this.recipe.ingredients.join('\n');
          this.preparationSteps = this.recipe.preparationSteps.join('\n');

        },
        error => {
          console.log('Error loading recipe:', error);

        }
      );
    }
  }

  submitForm(): void {
    if (this.isEditMode) {
      this.updateRecipe();
    } else {
      this.createRecipe();
    }
  }

  createRecipe(): void {
    this.recipe.ingredients = this.ingredients.split("\n");
    this.recipe.preparationSteps = this.preparationSteps.split("\n");
    console.log('Recipe created:', this.recipe);
    this.recipeService.createRecipe(this.recipe).subscribe(
      (createdRecipe: Recipe) => {
        console.log('Recipe created:', createdRecipe);

        // Redirect to the recipe detail page or any other desired location
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log('Error creating recipe:', error);

      }
    );
  }

  updateRecipe(): void {
    this.recipe.ingredients = this.ingredients.split("\n");
    this.recipe.preparationSteps = this.preparationSteps.split("\n");
    this.recipeService.updateRecipe(this.recipe.id, this.recipe).subscribe(
      (updatedRecipe: Recipe) => {
        console.log('Recipe updated:', updatedRecipe);
        // Redirect to the recipe detail page or any other desired location
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log('Error updating recipe:', error);
        // Handle error, e.g., show an alert
      }
    );
  }

  cancelForm(): void {
    // Redirect to the recipe list or any other desired location
    this.router.navigate(['/recipes']);
  }
}