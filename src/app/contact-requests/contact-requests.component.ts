import {Component, inject} from '@angular/core';
import {EventsDalService} from "../../services/events-dal.service";
import {ContactDalService} from "../../services/contact-dal.service";
import {Contact} from "../../models/contact";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-requests',
  standalone: true,
  imports: [],
  templateUrl: './contact-requests.component.html',
  styleUrl: './contact-requests.component.css'
})
export class ContactRequestsComponent {

  dal = inject(ContactDalService);
  router = inject(Router);
  requests: any[] = [];


  //
  showAll(){
    let selUser = Number(localStorage.getItem("selectedUserId"));

    this.dal.selectAll().then((data)=>{
      const filteredData = data.filter(request => request.user === selUser);
      this.requests = filteredData;
      console.log("Successfully selected all Events");
      console.log(this.requests);
    }).catch((e)=>{
      console.log(e.message());
      this.requests = [];
    });
  }

  //
  constructor(){
    this.showAll();
  }




  showOneRequest(req: Contact){
    this.router.navigate([`/request-details/${req.id}`])
  }

  removeFromList(req: Contact){
    this.dal.delete(req).then((data)=>{
      console.log("successful delete: " + data);
      this.showAll();
      //this.router.navigate(["/contact-requests"]);
    }).catch((e)=>{
      console.log(e.message());
    });
  }

}
