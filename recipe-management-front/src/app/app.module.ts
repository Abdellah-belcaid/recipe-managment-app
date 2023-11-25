import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/recipe/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './components/recipe/recipe-search/recipe-search.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeFormComponent,
    RecipeSearchComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
