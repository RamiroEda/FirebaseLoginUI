import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { auth, User } from 'firebase';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

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

  constructor(private firebaseService : FirebaseService) {
    this.ui = new firebaseui.auth.AuthUI(firebaseService.firebase.auth());
    firebaseService.onAuthChange((user : User) => {
      if(user != null) window.location.href = "/index"
    });
  }

  ngOnInit(): void {
    this.ui.start("#login-container", {
      signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/index'
    });
  }

}
