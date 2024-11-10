import {Component, inject} from '@angular/core';
import {MapsComponent} from "../maps/maps.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MapsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router);
  //maps = inject(MapsComponent);

  /*getLocation(){
    alert("UrbanPulse would like to use your current location (implement)");
    //this.maps.getNativeLocation();
  }*/



  navEvents(){
    this.router.navigate([`/events`])
  }


  //end of class
    protected readonly MapsComponent = MapsComponent;
}
