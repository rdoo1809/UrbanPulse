import {Component, inject} from '@angular/core';
import {ListDalService} from "../../services/list-dal.service";
import {EventsDalService} from "../../services/events-dal.service";
import {Occasion} from "../../models/occasion.model";
import {MapsRouteComponent} from "../maps-route/maps-route.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [
    MapsRouteComponent
  ],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {

  router = inject(Router);
  listDal = inject(ListDalService);
  eventDal = inject(EventsDalService);
  listItems: any[] = [];
  events: any[] = [];
  outputList: any[] = [];

  //
  showEventsById() {
    const selectedUserId = Number(localStorage.getItem('selectedUserId'));
    if (!selectedUserId) {
      console.error('Selected user ID not found in local storage');
      return;
    }
    //clear the output list before populating it with new event details
    this.outputList = [];
    // Retrieve all list items associated with the selected user
    this.listDal.selectAll().then((listItems) => {
      const userItems = listItems.filter(item => item.userID === selectedUserId);
      if (userItems.length === 0) {
        console.log('No events found for the selected user');
        return;
      }

      //
      const eventIds = userItems.map(item => item.eventID);
      //
      eventIds.forEach(eventId => {
        this.eventDal.select(Number(eventId))
          .then(event => {
            if (event) {
              // Push event details to the output list
              this.outputList.push(event);
            } else {
              console.error(`Event with ID ${eventId} not found`);
            }
          })
          .catch(error => {
            console.error(`Error getting event with ID ${eventId}:`, error);
          });
      });
    })
      .catch(error => {
        console.error('Error getting list items:', error);
      });
  }

  /*
  showAll() {
    this.listDal.selectAll().then((data) => {
      this.listItems = data;

      //retrieve events
      this.eventDal.selectAll().then((someData) => {
        this.events = someData;

        // Filter events based on if they exist in the list
        this.events = this.events.filter((event) =>
          this.listItems.some(item => event.id === item.eventID)
        );
      }).catch((e) => {
        console.log(e.message());
      })
    }).catch((e) => {
      console.log(e.message());
      this.listItems = [];
    });
  } */

  //
  showOneEvent(occasion: Occasion){
    localStorage.setItem("destination", occasion.coords);
    console.log("destination " + occasion.coords);
    this.router.navigate([`/list-details/${occasion.id}`])
  }

  //
  removeFromList(id: number) {
    //specific to changing the button from disbaled
    //change isSaved prop back to false
    let upEvent = new Occasion();
    //select the event
    this.eventDal.select(id).then((data) => {
      upEvent = data;
      upEvent.isSaved = false;
      //save update
      this.eventDal.update(upEvent).then((data) => {
      }).catch((e) => {
        console.log(e.message());
      })

      //select a list item that shares upEventID
      this.listDal.selectAll().then((data) => {
        let list = data;
        list.filter(item => item.eventID === id);

        //delete it
        this.listDal.delete(Number(list[0].id)).then((data) => {
          //
          this.showEventsById();
        }).catch((e) => {
          console.log(e.message());
        });
      }).catch((e) => {
        console.log(e.message());
      })
    }).catch((e) => {
      console.log(e.message());
    })
  }

  //
  constructor() {
    //this.showAll();
    this.showEventsById();
  }
  //end of class
}
