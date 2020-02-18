import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { UserInfo } from 'src/app/models/user-info';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  userInfo : UserInfo;
  private sessionId : string = Date.now().toString();

  constructor(private router : Router, 
    private funs : AngularFireFunctions, 
    private auth : AngularFireAuth,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.initAll();

    $("#fileUpload").off("change").change((e : Event) => {
      this.sessionId = Date.now().toString();
      this.uploadImage();
    });
  }

  private async initAll(){
    await this.getUserInfo();
    this.initProfilePicture();
    this.initName();
  }

  private async getUserInfo(){
    if(this.auth.currentUser){
      while(true){
        try{
          const values = (await this.firestore.collection('users').doc(
            (await this.auth.currentUser).uid
          ).get().toPromise()).data()
    
          this.userInfo = {
            name: values.name,
            imageUrl : await this.storage.ref(values.imageUrl).getDownloadURL().toPromise(),
            backgroundImage: await this.storage.ref(values.backgroundImage).getDownloadURL().toPromise(),
          }
          break;
        }catch(e){
          console.log(e);
          
        }
      }
    }
  }

  private async initProfilePicture(){
    const url = (await this.auth.currentUser).photoURL
    if(url){
      this.userInfo.imageUrl = url;
    }
  }

  async initName(){
    const name = (await this.auth.currentUser).displayName;
    if(name){
      this.userInfo.name = name;
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
      this.storage.ref(`uploads/${name}.${ext}`).put(input.files[0]).then((res)=> {
        console.log("uploaded", res);
        this.waitForFilter(name, ext);
      });
    }
  }

  private async waitForFilter(name: string, ext : string){
    const input = $("#fileUpload")[0];

    while(true){
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try{
        const url = await this.storage.ref(`gen/${name}.${ext}`).getDownloadURL().toPromise();
        $("#imgResultPreview").css("background-image", `url(${url})`);
        console.log("file set");
        break;
      }catch(e){
        console.log("waiting file");
      }
    }

    
  }

  async deleteUser(){
    // TODO: Error con CORS
    // const deleteUser = this.funs.httpsCallable("deleteUser"); 
    // const res = await deleteUser({
    //   uid: (await this.auth.currentUser).uid
    // }).toPromise()

    // if(res.success){
    //   this.logOut();
    // }

    $.post("https://us-central1-pruebas-354cc.cloudfunctions.net/deleteUser", {
      uid: (await this.auth.currentUser).uid
    }).done((res) => {
      console.log(res);
      
      if(res.success == true){
        this.logOut();
      }
    });
  }

  async logOut(){
    await this.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
