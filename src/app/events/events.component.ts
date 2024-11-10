import {Component, inject} from '@angular/core';
import {EventsDalService} from "../../services/events-dal.service";
import {routes} from "../app.routes";
import {Router} from "@angular/router";
import {Occasion} from "../../models/occasion.model";
import {ListDalService} from "../../services/list-dal.service";
import {List} from "../../models/list.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  dal = inject(EventsDalService);
  listDAL = inject(ListDalService);
  router = inject(Router);
  occasions: any[] = [];
  listItem = new List();
  outputList: List[] = [];

  //
  showAll() {
    this.dal.selectAll().then((data) => {
      this.occasions = data;
      console.log("Successfully selected all Events");
      console.log(this.occasions);
    }).catch((e) => {
      console.log(e.message());
      this.occasions = [];
    });
  }

  //
  constructor() {
    this.showAll();
  }

  //
  showOneEvent(occasion: Occasion) {
    this.router.navigate([`/details/${occasion.id}`])
  }



  isInList() {
    //get current users list
    //if event is already in list - do not all to add again
    //get current users list
   /*   this.showEventsById();
      let isThere = false;

    for (let i = 0; i < this.outputList.length; i++) {
      for (let j = 0; j < this.occasions.length; j++) {
        if (this.occasions[j].id === this.outputList[j].id) {
          isThere = true;
          break;
        }
      }
      if (isThere) {
        return true;
      }
    }

    //return true to disable
    return false; */
  }

  //
  addToList(occasion: Occasion) {
    let selUser = Number(localStorage.getItem("selectedUserId"));
    if(selUser == 0){
      alert("Create an account to Save Events!")
    } else {
      this.listItem.eventID = Number(occasion.id);
      // this.listItem.userID=parseInt(localStorage.getItem('selectedUserId') || '0');
      //user id
      this.listItem.userID = Number(localStorage.getItem("selectedUserId"));
      this.listItem.print();

      this.listDAL.insert(this.listItem).then((data) => {
        console.log("List Item inserted Successfully! ID:" + data)
        occasion.isSaved = true;
        this.dal.update(occasion).then((data) => {
          //alert("Successfully updated " + occasion.title);
        }).catch((e) => {
          console.log(e.message());
        });
        alert("List Item inserted Successfully! ID:" + data);
      }).catch((e) => {
        console.log(e.message());
        alert("Error in INSERTING Item: " + e.message());
      });
    }
  }

  //
  showEventsById() {
   /* const selectedUserId = Number(localStorage.getItem('selectedUserId'));
    //clear the output list before populating it with new event details
    this.outputList = [];

    // Retrieve all list items associated with the selected user
    this.listDAL.selectAll().then((listItems) => {
      const userItems = listItems.filter(item => item.userID === selectedUserId);

      //now have list of users list items
      this.outputList = userItems;

    }).catch(error => {
      console.error('Error getting list items:', error);
    }); */
  }

  //end of class
}
