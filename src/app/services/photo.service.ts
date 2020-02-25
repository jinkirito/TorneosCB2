import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  public s:String;
  

  constructor(private camera: Camera) { }

  cogerFoto() {
    const optionc = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(optionc).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
        
        
      });
      this.s= imageData;
      return this.s;
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

  gets(){
    return this.s
  }

 
}
class Photo {
  data: any;
}
