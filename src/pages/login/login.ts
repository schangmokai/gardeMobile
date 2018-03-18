import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import { maconfig } from '../../configs/configs';
import { UserConnecteService } from '../../services/userConnecte-service';
import {TranslateService} from "ng2-translate/src/translate.service";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    utilisateur = {};

    constructor(public nav: NavController, public translate:TranslateService,public http: Http, public toastCtrl:ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController, private userconnecteService: UserConnecteService) {
      this.http = http;
      /*this.http.get('http://localhost:8085/api/chauffeurs/listes').subscribe(data => {
          console.log(data['_body']);
       }, error => {
            console.log(error);
       });*/
    }

    signup() {
      this.nav.setRoot('RegisterPage');
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

                   //this.nav.setRoot('OuestilPage');
                   // si après le login il s'agis d'un utilisateur simple alors il est redirigé vers home page ou il pourras pouras 
                   // librement scanner le code d'un taxis pour assurer sa sécurité
                   
                   this.userconnecteService.setParameterUser(result.id,result.status,5);
                   
                   if(result.status==1){

                     this.nav.setRoot('HomePage',{
                        id: result.id,
                        status: result.status
                     });
                     
                 // dans le cas contraire in s'agit d'un policier qui lui iras voir la liste des personne en dangé
                    }else{

                       this.nav.setRoot('UserdangersPage',{
                        id: result.id,
                        status: result.status
                       });
                       
                    }
                   loading.dismissAll();

             }else{
                 // dans le cas ou le login ou le password est incorrect
                 this.translate.get(['error','login ou mot passord incorrect', 'OK']).subscribe((langs:Array<string>) => {
                  let alert = this.alertCtrl.create({
                    title:langs['error'],
                    subTitle: langs['login ou mot passord incorrect'],
                    buttons: [langs['OK']]
                  });

                  alert.present();

                  this.nav.setRoot(LoginPage);
                  loading.dismissAll();
                });
             }
          }, error => {
            loading.dismissAll();
            this.translate.get(['No connection']).subscribe((langs:Array<string>) => {
                let toast = this.toastCtrl.create({
                  message: langs['No connection'],
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
            });   
          });
    }



}
