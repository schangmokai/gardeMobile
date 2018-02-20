import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {Http, Headers, RequestOptions } from '@angular/http';
import { maconfig } from '../../configs/configs';
//import {HomePage} from '../home/home'

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    utilisateur = {};

    constructor(public nav: NavController, public http: Http, public loadingCtrl: LoadingController) {
      

      this.http = http;

      /*this.http.get('http://localhost:8085/api/chauffeurs/listes').subscribe(data => {
          console.log(data['_body']);
       }, error => {
            console.log(error);
       });*/
    }

    signup() {
      this.nav.setRoot(RegisterPage);
    }

    login(utilisateur) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        
        let body = {
           login: utilisateur.username, 
           password: utilisateur.password
        };

        let loading = this.loadingCtrl.create({content: "Loggin in, please wait ..."});
        loading.present();

        this.http.post(maconfig.logins, body, options)
          .subscribe(data => {
            var result = data.json();
             if(result.code == "400"){

                   //this.nav.setRoot('HomePage');
                   if(result.status==1){
                      this.nav.setRoot('HomePage',{
                      id: result.id,
                      status: result.status
                     });
                    }else{
                       this.nav.setRoot('UserdangersPage',{
                        id: result.id,
                        status: result.status
                       });
                    }


                   loading.dismissAll();

             }else{

                  this.nav.setRoot(LoginPage);
                  loading.dismissAll();
             }
          }, error => {
            console.log(error);
            loading.dismissAll();
          });
       
        //this.nav.setRoot('HomePage');

    }



}
