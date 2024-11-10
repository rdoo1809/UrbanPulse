import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContactDalService} from "../../services/contact-dal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Contact} from "../../models/contact";
import {ContactComponent} from "../contact/contact.component";
import {UserDalService} from "../../services/user-dal.service";
import {User} from "../../models/user.model";
import {ContactRequestsComponent} from "../contact-requests/contact-requests.component";

@Component({
  selector: 'app-request-details',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {

  formTitle ="Edit Contact Request";
  requestDAL = inject(ContactDalService);
  userDal = inject(UserDalService);
  activatedRoute = inject(ActivatedRoute);
  request = new Contact();
  userName = "";
  user = new User();
  MIN_DATE = new Date().toISOString().substring(0, 10);
  router = inject(Router);

  //
  showRequest(id: number){
    this.requestDAL.select(id).then((data)=>{
      this.request = data;
    }).catch(()=>{
      console.log("error in retrieving request")
    })
  }

  //
  getUser(){
    let currUser = Number(localStorage.getItem("selectedUserId"));
    this.userDal.select(currUser).then((data)=>{
      this.user = data;
      this.userName = this.user.fullName;
      //
      const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      this.showRequest(id);
    }).catch((e)=>{
      console.log("error in getting user");
    });
  }

  //
  btnUpdate_click(){
    this.requestDAL.update(this.request).then((data)=>{

      alert("Contact request updated!");
      this.router.navigate(["/contact-requests"]);
    }).catch(()=>{
      console.log("error");
    })
  }


  //
  constructor() {
    this.getUser();
  }


  //end of class
}
