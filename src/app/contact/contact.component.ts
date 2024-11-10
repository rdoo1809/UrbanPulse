import {Component, inject} from '@angular/core';
import {CameraComponent} from "../camera/camera.component";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {UserDalService} from "../../services/user-dal.service";
import {User} from "../../models/user.model";
import {Contact} from "../../models/contact";
import {ContactDalService} from "../../services/contact-dal.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CameraComponent,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactDAL: ContactDalService = inject(ContactDalService);
  formTitle = "Contact";
  contact: Contact = new Contact();
  MIN_DATE = new Date().toISOString().substring(0, 10);
  router = inject(Router);
  userDal = inject(UserDalService);
  user: User = new User();
  userName = "";

  constructor() {
    this.getUser();
  }

  //
  getUser(){
    let currUser = Number(localStorage.getItem("selectedUserId"));
    this.userDal.select(currUser).then((data)=>{
      this.user = data;
      this.userName = this.user.fullName;
    }).catch((e)=>{
      console.log("error in getting user");
    });
  }

  //
  show_requests(){
    this.router.navigate(["/contact-requests"]);
  }

  //
  btnSave_click(){
    this.contact.user = Number(localStorage.getItem("selectedUserId"));

    this.contactDAL.insert(this.contact).then((data: string) => {
      alert("Contact Request inserted Successfully! ID:" + data);
      this.clearForm();
      this.getUser();
    }).catch((e: { message: () => string; }) => {
      console.log("Error in INSERTING Contact: " + e.message());
      alert("Error in INSERTING Contact: " + e.message());
    });
  }


  //
  clearForm(){
    let txtTitle = document.getElementById("txtTitle");
    // @ts-ignore
    txtTitle.value = "";
    let txtDate = document.getElementById("txtDate");
    // @ts-ignore
    txtDate.value = "yyyy-mm-dd";
    let txtComment = document.getElementById("txtComment");
    // @ts-ignore
    txtComment.value = "";
  }
  //end of class
}
