import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';

//import {HomePage} from "../home/home";

/*
 Generated class for the RegisterPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

      utilisateur = {};
      public logintest:any;

      constructor(public nav:NavController) {
         //this.navParams.get('userParams');
         this.logintest = 0;
      }

      signup(utilisateur) {
         //console.log(utilisateur);
         
         this.nav.push('ProfilePage', {
              name: utilisateur.name,
              password: utilisateur.password
         });

        //this.nav.setRoot(HomePage);
      }

      login() {
        this.nav.setRoot('LoginPage');
      }


      suivant(){
         this.logintest = 1
      }


      confirmer(utilisateur){
           this.nav.setRoot('HomePage');
          /*
          this.nav.push(HomePage, {
              name: utilisateur.name,
              password: utilisateur.password
         });*/
      }
}
