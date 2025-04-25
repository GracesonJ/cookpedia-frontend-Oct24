import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  allRecipes: any = []
  
  constructor(private api: ApiService) { }

  ngOnInit(){
    this.getAllSavedRecipes()
  }

  getAllSavedRecipes() {
    this.api.getUserSavedRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res
      console.log(this.allRecipes);

    })
  }

  removeSavedRecipe(id:string){
    this.api.deleteSavedRecipeAPI(id).subscribe((res:any)=>{
      alert(`Recipe Removed`)
      this.getAllSavedRecipes()
    })
  }

}
