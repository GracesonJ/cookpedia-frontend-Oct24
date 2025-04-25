import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [SearchPipe, FormsModule, NgxPaginationModule, HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipies: any = []
  dummyAllRecipies: any = []
  cuisineArray: any = []
  mealTypeArray: any = []
  searchKey: string = ""
  p: number = 1;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipiesAPI().subscribe((res: any) => {
      this.allRecipies = res
      console.log(this.allRecipies);

      // cuisine
      this.allRecipies.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);
      this.dummyAllRecipies = this.allRecipies

      // meal type
      const dummyMeals = this.allRecipies.map((item: any) => item.mealType)
      // console.log(dummyMeals.flat(Infinity));
      const flatMealArray = dummyMeals.flat(Infinity)
      flatMealArray.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
    })
  }

  filterAllRecipes(key: string, value: string) {
    this.allRecipies = this.dummyAllRecipies.filter((item: any) => item[key].includes(value))
  }

  viewRecipe(recipeId: string) {
    if (sessionStorage.getItem("token")) {
      // recipe/:id/view
      this.router.navigateByUrl(`recipe/${recipeId}/view`)
    }
  }
}
