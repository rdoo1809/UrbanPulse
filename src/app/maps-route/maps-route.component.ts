import {Component, OnInit} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-maps-route',
  standalone: true,
  imports: [],
  templateUrl: './maps-route.component.html',
  styleUrl: './maps-route.component.css'
})
export class MapsRouteComponent implements OnInit{
  private map: google.maps.Map | undefined;

  ngOnInit(): void {
    //load the api
    const loader = new Loader({
      apiKey: "AIzaSyCJQ2L6lM5Bx_D1wIEOdKN7btQAtVK3XUw",
      version: "weekly",
    });
    //
    loader.importLibrary("maps").then(async () => {
      const {Map} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      //hard code to conestoga campus for assignment
      let userLoc = [43.4778789, -80.51785869630504];
      this.map = new Map(document.getElementById("map") as HTMLElement, {
        // center: {lat: Number(locationArray[0]), lng: Number(-80.51785869630504)},
        center: {lat: userLoc[0], lng: userLoc[1]},
        zoom: 13
      });
      //retrieve user location for origin from localStorage
   /*   let userLoc = localStorage.getItem("userLocation");
      console.log("Location: " + userLoc);
      // @ts-ignore
      let locationArray = userLoc.split(","); */

      //ret destination
      let destinLoc = localStorage.getItem("destination");
      console.log("Destination: " + destinLoc);
      // @ts-ignore
      let destinationArray = destinLoc.split(",");

      /*
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      let origin = new google.maps.LatLng(43.479996362933996, -80.51794452698508);
      let destination = new google.maps.LatLng(Number(destinationArray[0]), Number(destinationArray[1]));
      directionsDisplay.setMap(map);


      function calcRoute() {
        var request = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }

        directionsService.route(request, (result, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            //display route
            directionsDisplay.setDirections(result);
          } else {
            //directionsDisplay.setDirections();
            map.setCenter(origin);
          }
        })
      } */
      this.calcRoute(destinationArray);
    });
  }


  calcRoute(destinationArray: String[]) {

    //alert(destinationArray);
    //
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    let origin = new google.maps.LatLng(43.479996362933996, -80.51794452698508);
    let destination = new google.maps.LatLng(Number(destinationArray[0]), Number(destinationArray[1]));
    // @ts-ignore
    directionsDisplay.setMap(this.map);


    var request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        //display route
        directionsDisplay.setDirections(result);
      } else {
        // @ts-ignore
        this.map.setCenter(origin);
      }
    })
  }

  //end of class
}
