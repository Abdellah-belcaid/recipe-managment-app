import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/recipe/recipe-form/recipe-form.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  // { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'edit-recipe/:id', component: RecipeFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
