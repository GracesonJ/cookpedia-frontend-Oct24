import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  allUsers: any = []

  constructor(private api: ApiService) { }

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers() {
    this.api.getAllUsersAPI().subscribe((res: any) => {
      this.allUsers = res
      console.log(this.allUsers);
    })
  }

}
