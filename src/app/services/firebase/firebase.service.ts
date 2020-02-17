import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebase : firebase.app.App;
  private authChange : (user : firebase.User) => void;

  constructor() {
    this.firebase = firebase.initializeApp(environment.firebase);
    
  }

  setOnAuthChangeListener(fun : (user : firebase.User) => void){
    this.firebase.auth().onAuthStateChanged(fun);
  }

  get user() : firebase.User | null{
    return this.firebase.auth().currentUser
  }
}
