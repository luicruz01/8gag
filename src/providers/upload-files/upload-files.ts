import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

import { AngularFireDatabase } from "angularfire2";
import * as firebase from "firebase";

@Injectable()
export class UploadFilesProvider {

  private IMAGE_FOLDER:string = "img";
  private POSTS:string = "posts";

  images:any[] = [];
  lastKey:string = null;

  constructor(public afm:AngularFireDatabase, private toastCtrl:ToastController) {}

  uploadFirebaseImages( file:uploadFile ) {
    let promise = new Promise( ( resolve, reject ) => {
      this.showToast("Comenzando la carga");

      let storageRef = firebase.storage().ref();
      let fileName = new Date().valueOf();

      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.IMAGE_FOLDER }/${ fileName }`)
          .putString( file.img, 'base64', { contentType: 'image/jpeg' } );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot ) => {}, // know the file advance
        ( error ) => { // handle errors
          console.error("Error uploanding file: ", JSON.stringify( error ) );
          this.showToast("Error uploading file: " + JSON.stringify(error) );
          reject(error);
        },
        () => { // End process
          let url = uploadTask.snapshot.downloadURL;
          this.showToast("Sucess image loading");
          this.createPost( file.title, url );
          resolve()
        }
      );

    });

    return promise;
  }

  private createPost( title:string, url:string ) {
    let post:uploadFile = {
      img: url,
      title: title
    };

    let $key = this.afm.database.list(`/${ this.POSTS }`).push( post ).key;
    post.$key = $key;

    this.images.push( post );

  }

  private showToast( text:string ) {
    this.toastCtrl.create({
      message: text,
      duration: 2500,
    }).present();
  }

}

interface uploadFile{
  $key?:string;
  img:string;
  title:string;
}
