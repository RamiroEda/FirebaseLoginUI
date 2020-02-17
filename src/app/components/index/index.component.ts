import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { async } from '@angular/core/testing';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private userInfo : UserInfo;
  private sessionId : string = Date.now().toString();

  constructor(private firebaseService : FirebaseService, private router : Router) {
    firebaseService.setOnAuthChangeListener((user : User)=>{
      if(user){
        this.ngOnInit();
      }else{
        router.navigateByUrl("/login");
      }
    });
  }

  ngOnInit(): void {
    if(this.firebaseService.user){
      this.initAll();
    }

    $("#fileUpload").change(() => {
      this.sessionId = Date.now().toString();
      this.uploadImage();
    });
  }

  private async initAll(){
    await this.getUserInfo();
    this.initProfilePicture();
    this.initName();
    this.initBackground();
  }

  private async getUserInfo(){
    if(this.firebaseService.user){
      this.userInfo = (await this.firebaseService.firebase.firestore().collection('users').doc(
        this.firebaseService.firebase.auth().currentUser.uid
      ).get()).data() as UserInfo
    }
  }

  private async initProfilePicture(){
    if(this.firebaseService.user.photoURL){
      $("#user-pic").attr("src", this.firebaseService.user.photoURL);
    }else if(this.userInfo){
      const pic = await this.firebaseService.firebase.storage().refFromURL(this.userInfo.imageUrl).getDownloadURL();
      $("#user-pic").attr("src", pic);
    }
  }

  private initName(){
    if(this.firebaseService.user.displayName){
      $("#username").text(this.firebaseService.user.displayName);
    }else if(this.userInfo){
      $("#username").text(this.userInfo.name);
    }
  }

  private async initBackground(){
    if(this.userInfo){
      const pic = await this.firebaseService.firebase.storage().refFromURL(this.userInfo.backgroundImage).getDownloadURL();
      $("#bg").css("background-image", `url(${pic})`);
    }
  }

  uploadImage(){
    this.loadImageInView();
    this.uploadFile();
  }

  openDialog(){
    $('#fileUpload').click();
  }

  private loadImageInView(){
    const input = $("#fileUpload")[0];
    
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#imgPreview').css('background-image', `url(${e.target.result})`);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  private uploadFile(){
    const input = $("#fileUpload")[0];
    
    if (input.files && input.files[0]) {
      const name = this.sessionId;
      const ext = input.files[0].name.split('.').pop();
      this.firebaseService.firebase.storage().ref(`uploads/${name}.${ext}`).put(input.files[0]).then((res)=> {
        console.log("uploaded");
        this.waitForFilter(name, ext);
      });
    }
  }

  private async waitForFilter(name: string, ext : string){
    const input = $("#fileUpload")[0];
    const ref = this.firebaseService.firebase.storage();
    
    while(true){
      try{
        const url = await ref.ref(`gen/${name}.${ext}`).getDownloadURL();
        $("#imgResultPreview").css("background-image", `url(${url})`);
        console.log("file set");
        break;
      }catch(e){
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("waiting file");
      }
    }

    
  }

  deleteUser(){
    this.firebaseService.firebase.auth().currentUser.delete();
  }

  logOut(){
    this.firebaseService.firebase.auth().signOut();
  }
}
