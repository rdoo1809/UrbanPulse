/*import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  title = 'Add Events';
}
*/
import {Component, inject, input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
//import {Event, Occasion} from "../../models/occasion.model";
import {EventsDalService} from "../../services/events-dal.service";
import {Occasion} from "../../models/occasion.model";
import {Router} from "@angular/router";
import {MapsComponent} from "../maps/maps.component";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {CameraComponent} from "../camera/camera.component";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    MapsComponent,
    CameraComponent
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  dal = inject(EventsDalService);
  router = inject(Router);

  formTitle = "Add An Event!";
  types: string[] = ["Music", "Art", "Market", "Sport"];
  occasion = new Occasion();
  MIN_LENGTH = 3;
  MIN_PRICE = 0;
  MIN_DATE = new Date().toISOString().substring(0, 10);

  constructor() {
    this.occasion.type = this.types[0];

  }

  //
  ngOnInit(): void {
    const input = document.getElementById('txtAddress') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
  }


  //
  setAddress() {
    const input = document.getElementById('txtAddress') as HTMLInputElement;
    let addString = input.value;
    this.occasion.address = addString;
    //console.log(this.occasion.address);
  }

  //
  setImage(location: string) {
    //
    //alert("set photo: " + location);
    this.occasion.image = location;
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
        /*   this.dal.update(this.occasion).then((data) => {
             //
             alert("Event UPDATED Successfully! ID:" + data);

           }).catch((e)=>{
             console.log(e.message())}); */
        console.log("geocode - " + this.occasion);
        this.dal.insert(this.occasion).then((data) => {
          //console.log("Event inserted Successfully! ID:" + data)
          alert("Event inserted Successfully! ID:" + data);
          /*console.log(this.occasion.address)
          this.geocodePlaceName(this.occasion.address); */
          this.router.navigate([`/events`]);
        }).catch((e) => {
          console.log("Error in INSERTING Event: " + e.message());
          alert("Error in INSERTING Event: " + e.message());
        });
      } else {
        console.error('Geocode was not successful:', status);
      }
    });
  }


  //
  btnSave_click() {
    console.log(this.occasion.address)
    this.geocodePlaceName(this.occasion.address);

    /*this.dal.insert(this.occasion).then((data) => {
      //console.log("Event inserted Successfully! ID:" + data)
      alert("Event inserted Successfully! ID:" + data);
      /!*console.log(this.occasion.address)
      this.geocodePlaceName(this.occasion.address); *!/

      this.router.navigate([`/events`]);
    }).catch((e) => {
      console.log("Error in INSERTING Event: " + e.message());
      alert("Error in INSERTING Event: " + e.message());
    });*/
    //show in console
    //console.log("class print");
    //this.occasion.print();
  }

//end of class
}
