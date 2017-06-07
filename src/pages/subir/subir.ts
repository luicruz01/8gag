import { Component } from '@angular/core';
import { ViewController, ToastController } from "ionic-angular";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPrewiew:string = null;
  img:string = null;

  constructor( private viewCtrl:ViewController, private camera: Camera, private toastCtrl:ToastController, private imagePicker: ImagePicker ) {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  showCamera(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imgPrewiew = 'data:image/jpeg;base64,' + imageData;
     this.img = imageData;

    }, (err) => {
     // Handle error
     this.showToast( "Error: " + err );
     console.error("Camera error: ", err);
    });
  }

  selectImage() {

    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
       quality: 60,
       outputType: 1
    };

    this.imagePicker.getPictures(options).then((results) => {

      for(let img of results){
        this.imgPrewiew = 'data:image/jpeg;base64,' + img;
        this.img = img;
      }

    }, (err) => {
      this.showToast( "Error select images: " + err );
      console.error( "Error selectImage: ", JSON.stringify( err ) );
    });
  }

  private showToast( text:string ) {
    this.toastCtrl.create({
      message: text,
      duration: 2500
    }).present();
  }

}
