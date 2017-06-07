import { Component } from '@angular/core';
import {  ModalController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { SubirPage } from "../subir/subir";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;


  constructor(public modalCtrl: ModalController, private db: AngularFireDatabase) {
    this.posts = db.list('/posts');
  }

  showModal() {
    console.log("ALV");
    let modal = this.modalCtrl.create( SubirPage );
    modal.present();
  }

}
