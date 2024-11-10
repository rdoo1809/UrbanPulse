import {Component, OnInit} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {
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
      this.map = new Map(document.getElementById("map") as HTMLElement, {
        center: {lat: 43.47977838252308, lng: -80.51785869630504},
        zoom: 13
      });

      const input = document.getElementById('autocomplete') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input);

    });
  }


  setMarker(lati: number, long: number) {
    //set marker to current location
    //console.log("set marker");
    //console.log(`Latitude: ${lati} \nLongitude: ${long}`);
    const marker = new google.maps.Marker({
      position: {lat: lati, lng: long},
      map: this.map,
      title: "Hello world"
    })

    const centerLatLng = new google.maps.LatLng(lati, long);
    // @ts-ignore
    this.map.setCenter(centerLatLng);
  }


  //get native location
  getLocation() {
      try {
        if (navigator.geolocation !== null) {
          navigator.geolocation.getCurrentPosition((data) => {
            const coordinates = data.coords;
            let lat = coordinates.latitude;
            let lng = coordinates.longitude;

            //console.log(`Coordinates retrieved\n Latitude: ${lat} \nLongitude: ${lng}`);
            alert(`Coordinates retrieved\n Latitude: ${lat} \nLongitude: ${lng}`);

            this.setMarker(lat, lng)
          }, (e) => {
            let message = "";
            if (e) {
              switch (e.code) {
                case e.TIMEOUT :
                  message = "TIMEOUT: " + e.message;
                  break;
                case e.PERMISSION_DENIED :
                  message = "PERMISSION_DENIED: " + e.message;
                  break;
                case e.POSITION_UNAVAILABLE :
                  message = "POSITION_UNAVAILABLE: " + e.message;
                  break;
                default :
                  message = "OTHERS: " + e.message;
                  break;
              }
              console.error(message);
            }
          });
        } else {
          console.error("Geolocation is not supported");
        }
      } catch (e) {
        console.error("exception in getPosition() " + e);
      }
  }
  //end of class
}
