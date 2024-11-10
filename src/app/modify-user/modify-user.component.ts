import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserDalService} from "../../services/user-dal.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modify-user',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css'
})
export class ModifyUserComponent {

  formTitle = 'Update Account';
  user: User = new User();
  userDalService = inject(UserDalService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);


  //
  constructor(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.userDalService.select(id).then((data)=>{
      console.log("Selected " + data);
      this.user = data;
    }).catch((e)=>{
      console.log(e.message());
    });
  }



  btnSave_click(){
   this.userDalService.update(this.user).then((data)=>{
     alert("Profile Updated!")
     this.router.navigate(["/settings"]);
   }).catch((e)=>{
     console.log("Error in updating user");
   });
  }


  //end of class
}
