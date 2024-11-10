import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventsDalService} from "../../services/events-dal.service";
import {UserDalService} from "../../services/user-dal.service";
import {Occasion} from "../../models/occasion.model";
import {User} from "../../models/user.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  dal = inject(EventsDalService);
  userDal=inject(UserDalService);
  occasion: Occasion = new Occasion();
  router = inject(Router);
  user: User = new User;

  constructor(){
    //id comes from routes /details/:id
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.dal.select(id).then((data)=>{
      console.log("Selected " + data);
      this.occasion = data;
    }).catch((e)=>{
      console.log(e.message());
    });
  }

  onDeleteClick(occasion: Occasion){
    if(localStorage.getItem("selectedUserId") != null) {
      this.userDal.select(Number(localStorage.getItem("selectedUserId"))).then((data) => {
        this.user = data;
        //
        if (occasion.organiser === this.user.fullName) {
          //alert("User is organiser")
          const result = confirm("Do you really want to delete this record");
          if (result) {
            this.dal.delete(occasion).then(data => {
              this.router.navigate([`/events`]);
              alert("Successfully DELETED " + occasion.title);
            }).catch(e => {
              console.log(e.message())
            });
          }
        } else {
          alert("Unable to Delete another users event");
        }
      }).catch((e) => {
        console.log(e.message());
      })
    } else {
      alert("Unable to Delete another users event");
    }
  }

  onModifyClick(occasion: Occasion){
    if(localStorage.getItem("selectedUserId") != null) {
      this.userDal.select(Number(localStorage.getItem("selectedUserId"))).then((data)=>{
        this.user = data;
        //
        if(occasion.organiser === this.user.fullName){
          alert("User is organiser")
          this.router.navigate(['/modify', occasion.id]);

        } else {
          alert("Unable to modify another users event");
        }
      }).catch((e)=>{
        console.log(e.message());
      })
    } else {
      alert("Unable to modify another users event");
    }
  }



 //end of class
}
