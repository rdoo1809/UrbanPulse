import {Component, inject, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EventsDalService} from "../../services/events-dal.service";
import {ListDalService} from "../../services/list-dal.service";
import {UserDalService} from "../../services/user-dal.service";
import {User} from "../../models/user.model";
import {Router} from '@angular/router';
import {routes} from "../app.routes";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  formTitle = 'Create Account';
  user: User = new User();
  users: User[] = [];
  router = inject(Router);
  userDalService = inject(UserDalService);
  eventDAL = inject(EventsDalService);
  listDAL = inject(ListDalService);

  constructor() {
    this.showAllUsers();
  }

  //
  deleteAll() {

    let result = confirm("Are you sure you wish to delete all data?");
    if(result){
      this.eventDAL.deleteAll().then((data) => {
        //alert("all events have been cleared")
      }).catch((e) => {
        console.log(e.message());
      })

      this.listDAL.deleteAll().then((data) => {
        //alert("all list items have been cleared")
      }).catch((e) => {
        console.log(e.message());
      })

      this.userDalService.deleteAll().then((data) => {
        alert("All APP Data Has Been Cleared");
        this.router.navigate(["/home"]);
      }).catch((e) => {
        console.log(e.message());
      })
    }
  }

  //
  btnSave_click() {
    this.userDalService.insert(this.user).then(
      (data) => {
        alert('User profile Created!');
        console.log('User inserted successfully with ID:', data);
        this.clearForm();
        this.showAllUsers();
      },
      (error) => {
        console.error('Error inserting user:', error);
      }
    );
  }

  //
  showAllUsers() {
    this.userDalService.selectAll().then(users => {
      this.users = users;
    }).catch(error => {
      console.error('Error fetching users:', error);
      this.users = [];
    });
  }

  //
  onModifyClick(user: User): void {
    console.log('Modify user:', user);
    this.router.navigate([`/user-modify/${user.id}`]);

  }

  //
  onDeleteClick(user: User): void {
    console.log('Delete user:', user);
    this.userDalService.delete(user).then((data)=>{
      alert("Successfully DELETED user: " + user.fullName);
      this.showAllUsers();
    }).catch((e)=>{
      console.log("error in deleting user");
    });
  }

  //
  onSelect(user: User) {
    // Store the selected user ID in local storage
    // @ts-ignore
    localStorage.setItem('selectedUserId', user.id);
    alert(`User ${user.id}: ` + user.fullName);
  }

  //
  clearForm(){
    let txtEmail = document.getElementById("email");
    // @ts-ignore
    txtEmail.value = "";
    let txtPass = document.getElementById("password");
    // @ts-ignore
    txtPass.value = "";
    let txtName = document.getElementById("fullName");
    // @ts-ignore
    txtName.value = "";
  }
  //end of class
}
