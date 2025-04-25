import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImage: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhl6_v4-O41-nj3HpiiwDmK7VrapH74GA0g&s"
  allUserDownloadList: any = []

  constructor(private api: ApiService) { }

  ngOnInit(){
    this.getUserDownloadRecipe()

    const user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getUserDownloadRecipe() {
    this.api.getUserDownloadRecipeAPI().subscribe((res: any) => {
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList);

    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload= (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
    }
  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user", JSON.stringify(res))
      this.profileImage = res.profilePic
      alert(`Profile Updated Successfully`)
    })
  }

}
