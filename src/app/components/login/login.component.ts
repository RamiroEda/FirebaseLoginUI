import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './login.component.scss',
    './../../../../node_modules/firebaseui/dist/firebaseui.css'
  ]
})
export class LoginComponent implements OnInit {
  ui : firebaseui.auth.AuthUI;

  constructor() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  ngOnInit(): void {
    this.ui.start("#login-container", {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/index'
    });
  }


  ngOnDestroy(): void {
    this.ui.delete();
  }
}
