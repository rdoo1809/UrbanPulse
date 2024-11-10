import {inject, Injectable} from '@angular/core';
import {resolve} from "@angular/compiler-cli";

declare var navigator: any;
declare var Camera: any;

@Injectable({
  providedIn: 'root'
})
export class CameraServiceService {
  constructor() {
  }

  //
  capturePhoto(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true
      };

      navigator.camera.getPicture(
        (data: string) => {
          //localStorage.setItem('capturedPhoto', base64Image);
          const imageData = "data:image/jpeg;base64," + data
          resolve(imageData);
        },
        (error: any) => reject(error),
       options
      );
    });
  }


  //
  loadFromPhotoLibrary() {
    return new Promise<string>((resolve, reject) => {
      const options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      };

      const onSuccess = (data: string) => {
        const imageData = "data:image/jpeg;base64," + data
        resolve(imageData);
      };

      const onFail = (e: any) => {
        reject("Failed: " + e.message);
      };

      navigator.camera.getPicture(onSuccess, onFail, options); //, options);
    });
  }


  //end of class
}
