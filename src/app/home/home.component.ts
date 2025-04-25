import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any = []

  constructor(private api: ApiService) { }

  ngOnInit(){
    this.getAllRecipies()
  }

  getAllRecipies() {
    this.api.getAllRecipiesAPI().subscribe((res: any) => {
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
    })
  }

}
