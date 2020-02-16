import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private firebaseService : FirebaseService) {
    firebaseService.onAuthChange((user : firebase.User) => {
      if(user == null) window.location.href = "/login"
    });
  }

  ngOnInit(): void {
  }

}
