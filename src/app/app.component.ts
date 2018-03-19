import {Component} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LanguageService} from '../services/language';
import {TranslateService} from "ng2-translate/src/translate.service";
import { UserConnecteService } from '../services/userConnecte-service';

@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage: any;

  public nav: any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: 'HomePage',
      confirm:'',
      confirmAction:null
    },
    {
      title: 'History',
      icon: 'ios-time-outline',
      count: 0,
      component: 'HistoryPage',
      confirmAction:null
    },
    {
      title: 'Notifications',
      icon: 'ios-notifications-outline',
      count: 2,
      component: 'NotificationPage',
      confirmAction:null
    },
    {
      title: 'Support',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: 'SupportPage',
      confirmAction:null
    },
    {
      title: 'Settings',
      icon: 'ios-settings-outline',
      count: 0,
      component: 'SettingsPage',
      confirmAction:null
    },
    {
      title: 'Logout',
      icon: 'ios-log-out-outline',
      count: 0,
      component: 'LoginPage',
      confirmAction:()=>{
        this.translate.get(['Cancel','Confirm Logout', 'OK']).subscribe((langs:Array<string>) => {
          this.alertCtrl.create({
            message: langs['Confirm Logout'],
            buttons: [{
                text:langs['Cancel'],
                handler: data => {
                }
              },{
                text:langs['OK'],
                handler: data => {
                  this.userconnecteService.logut();
                  this.rootPage = 'LoginPage';
                }
              }
              ]
          }).present();
              });
      }
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, private alertCtrl: AlertController, public translate:TranslateService, splashScreen: SplashScreen, public language:LanguageService, private userconnecteService: UserConnecteService){
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.language.loadLanguage().then((lan:string)=>{
        this.translate.setDefaultLang(lan);
        //on vérifie si on doit afficher le contrat d'utilisation
        this.userconnecteService.license(true).then(()=>{
          //on vérifie si l'utilisateur s'est déja connecté dans le passé
          this.userconnecteService.getSession().then(session=>{
            this.rootPage = 'HomePage';
            splashScreen.hide();
          }, ()=>{
            this.rootPage = 'LoginPage';
            splashScreen.hide();
          });
        }, ()=>{
          //on affiche le contrat dans
          this.rootPage = 'ContratlicencePage';
          splashScreen.hide();
        });
      });
    });
  }

  openPage(page){
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.confirmAction == null){
      this.nav.setRoot(page.component);
    }else{
      page.confirmAction();
    }
  }
}