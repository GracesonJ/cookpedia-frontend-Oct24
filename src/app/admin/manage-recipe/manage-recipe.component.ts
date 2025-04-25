import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !: string

  cuisineArray: any = []
  mealTypeArray: any = []
  recipeDetails: RecipeModel = {}
  ingredient: any = []
  instructions: any = []
  mealType: any = []

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipiesAPI().subscribe((res: any) => {
      if (this.id) {
        this.recipeDetails = res.find((item: any) => item._id == this.id)
        this.ingredient = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealType = this.recipeDetails.mealType
      }
      // cuisine
      res.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);
      // this.dummyAllRecipies = this.allRecipies
      // meal type
      const dummyMeals = res.map((item: any) => item.mealType)
      // console.log(dummyMeals.flat(Infinity));
      const flatMealArray = dummyMeals.flat(Infinity)
      flatMealArray.forEach((item: any) => {
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      console.log(this.mealTypeArray);
    })
  }

  addIngredients(ingredientsInput: any) {
    if (ingredientsInput.value) {
      this.ingredient.push(ingredientsInput.value)
      ingredientsInput.value = ""
      console.log(this.ingredient);
    }
  }

  removeIngredients(value: string) {
    this.ingredient = this.ingredient.filter((item: string) => item != value)
  }

  addInstructions(instructionsInput: any) {
    if (instructionsInput.value) {
      this.instructions.push(instructionsInput.value)
      instructionsInput.value = ""
    }
  }

  removeInstructions(value: string) {
    this.instructions = this.instructions.filter((item: string) => item != value)
  }

  mealtypeSelect(event: any) {
    if (event.target.checked) {
      !this.mealType.includes(event.target.name) && this.mealType.push(event.target.name)
    } else {
      this.mealType = this.mealType.filter((item: string) => item != event.target.name)
    }
    console.log(this.mealType);
  }

  removeMealType(value: string) {
    this.mealType = this.mealType.filter((item: string) => item != value)
  }

  addRecipe() {
    console.log(this.recipeDetails);
    // 1. add intstruction, ingredients and mealtype in recipedetails
    this.recipeDetails.ingredients = this.ingredient
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealType

    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails

    // 2. check all fields have value

    if (name && instructions!.length > 0 && ingredients!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      // alert(`Ready for api call`)
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next: (res: any) => {
          alert(`Recipe Added Successfully`)
          this.recipeDetails = {}
          this.ingredient = []
          this.instructions = []
          this.mealType = []
          this.router.navigateByUrl("/admin/recipe-list")
        },
        error: (reason: any) => {
          alert(reason.error)
        }
      })


    } else {
      alert(`Fill the form completly`)
    }

  }

  updateRecipe() {
    console.log(this.recipeDetails);
    // 1. add intstruction, ingredients and mealtype in recipedetails
    this.recipeDetails.ingredients = this.ingredient
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealType

    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails

    // 2. check all fields have value

    if (name && instructions!.length > 0 && ingredients!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      // alert(`Ready for api call`)
      this.api.updateRecipeAPI(this.id, this.recipeDetails).subscribe((res: any) => {
        alert(`Recipe Updated Successfully`)
        this.recipeDetails = {}
        this.ingredient = []
        this.instructions = []
        this.mealType = []
        this.router.navigateByUrl("/admin/recipe-list")
      })
    } else {
      alert(`Fill the form completly`)
    }

  }


}
