import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent {


  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';

  onSearch(): void {
    this.searchEvent.emit(this.searchQuery);
  }

}