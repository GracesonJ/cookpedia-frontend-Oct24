import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeId: string = ""
  recipe: any = []
  allRelatedRecipes: any = []

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails(recipeId: any) {
    this.api.viewRecipeAPI(recipeId).subscribe((res: any) => {
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine: string) {
    this.api.relatedRecipeAPI(cuisine).subscribe((res: any) => {
      if(res.length > 1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
      }else{
        this.allRelatedRecipes = []
      }
      console.log(this.allRelatedRecipes);
    })
  }

   // Download Recipe
   downloadRecipe(){
    this.api.downloadRecipeAPI(this.recipeId, this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePDF()
    })
  }

  // generatePDF
  generatePDF(){
    const pdf = new jspdf()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")

    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`,10,45)

    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId, this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe added to your Collection")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

}
