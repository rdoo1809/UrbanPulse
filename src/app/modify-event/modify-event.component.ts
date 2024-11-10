import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsDalService} from "../../services/events-dal.service";
import {Occasion} from "../../models/occasion.model";
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: 'app-modify-event',
  standalone: true,
  imports: [
    FormsModule,
    CameraComponent
  ],
  templateUrl: './modify-event.component.html',
  styleUrl: './modify-event.component.css'
})
export class ModifyEventComponent implements OnInit{
  activatedRoute = inject(ActivatedRoute);
  dal = inject(EventsDalService);
  occasion: Occasion = new Occasion();
  router = inject(Router);
  types: string[] = ["Music", "Art", "Market", "Sport"];
  MIN_LENGTH = 3;
  MIN_PRICE = 0;
  MIN_DATE = new Date().toISOString().substring(0, 10);


  constructor(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then((data)=>{
      console.log("Selected " + data);
      this.occasion = data;
    }).catch((e)=>{
      console.log(e.message());
    });
  }

  //
  ngOnInit(): void {
    const input = document.getElementById('txtAddress') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
  }

  //
  btnSave_click(){
    this.geocodePlaceName(this.occasion.address);
  }


  //
  geocodePlaceName(placeName: string) {
    const geocoder = new google.maps.Geocoder();
    //
    geocoder.geocode({address: placeName}, (results: any, status: any) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        console.log('geocode -  Latitude:', lat);
        console.log('geocode - Longitude:', lng);
        let locationString = `${lat}, ${lng}`;
        this.occasion.coords = locationString;

        console.log("geocode - " + this.occasion.coords);
        this.dal.update(this.occasion).then(data=>{
          alert("Successfully updated " + this.occasion.title);
          this.router.navigate([`/events`]);
        }).catch(e=>{
          console.log(e.message());
        });
      } else {
        console.error('Geocode was not successful:', status);
      }
    });
  }

//end of class
}
