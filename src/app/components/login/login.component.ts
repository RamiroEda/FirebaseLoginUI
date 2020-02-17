import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { auth, User } from 'firebase';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Router } from '@angular/router';

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

  constructor(private firebaseService : FirebaseService, private router : Router) {
    this.ui = new firebaseui.auth.AuthUI(firebaseService.firebase.auth());
    firebaseService.setOnAuthChangeListener((user : User) => {
      if(user){
        router.navigateByUrl("/index");
      }
    });

    console.log(firebaseService.firebase.auth().currentUser);

    if(firebaseService.firebase.auth().currentUser){
      router.navigateByUrl("/index");
    }
  }

  ngOnInit(): void {
    this.ui.start("#login-container", {
      signInOptions: [
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: '/index'
    });
  }


  ngOnDestroy(): void {
    this.ui.delete();
  }
}
