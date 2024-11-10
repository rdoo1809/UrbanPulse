import {Component, inject} from '@angular/core';
import {CameraServiceService} from "../services/camera-service.service";
import {AddComponent} from "../add/add.component";
import {ModifyEventComponent} from "../modify-event/modify-event.component";

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {

  //inject camera service
  cameraService = inject(CameraServiceService)
  addComp = inject(AddComponent);

  //
  capturePhoto() {
    this.cameraService.capturePhoto().then((data) => {
      //alert("Image captured: " + data)

      let imageDiv = document.getElementById("imgSnap") as HTMLImageElement;
      imageDiv.src = data;
      this.photoChange(data);

    }).catch((e) => {
      console.log(e.message());
    });
  }

  //
  loadPhoto() {
    //alert("load");
    this.cameraService.loadFromPhotoLibrary().then((data) => {

      let imageDiv = document.getElementById("imgSnap") as HTMLImageElement;
      imageDiv.src = data;
      this.photoChange(data);

    }).catch((e) => {
      console.log(e.message());
    })
  }

  //
  photoChange(location: string){
    this.addComp.setImage(location);
  }


  //end of class
}
