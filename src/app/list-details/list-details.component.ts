import {Component, inject} from '@angular/core';
import {MapsRouteComponent} from "../maps-route/maps-route.component";
import {ActivatedRoute} from "@angular/router";
import {EventsDalService} from "../../services/events-dal.service";
import {Occasion} from "../../models/occasion.model";


@Component({
  selector: 'app-list-details',
  standalone: true,
    imports: [
        MapsRouteComponent
    ],
  templateUrl: './list-details.component.html',
  styleUrl: './list-details.component.css'
})
export class ListDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  dal = inject(EventsDalService);
  occasion: Occasion = new Occasion();


  constructor(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));

    this.dal.select(id).then((data)=>{
      //console.log("Selected " + data);
      //this.occasion.coords = data.coords;
      //this.setDestination();

      this.occasion = data;
    }).catch((e)=>{
      console.log(e.message());
    });
  }


  setDestination() {
    localStorage.setItem("destination", this.occasion.coords);
    //console.log("destination " + this.occasion.coords);
  }


  //end of class
}
