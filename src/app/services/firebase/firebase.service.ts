import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebase : firebase.app.App;
  private onAuthChangeFunction : (user :firebase.User) => any = (user :firebase.User)=>{};

  constructor() {
    this.firebase = firebase.initializeApp(environment.firebase);
    this.firebase.auth().onAuthStateChanged(this.onAuthChangeFunction);
  }

  onAuthChange(lambda : (user :firebase.User) => any){
    this.onAuthChangeFunction = lambda;
  }
}
