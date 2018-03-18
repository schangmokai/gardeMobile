import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LanguageService} from '../services/language';
import {TranslateService} from "ng2-translate/src/translate.service";

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
      component: 'HomePage'
    },
    {
      title: 'History',
      icon: 'ios-time-outline',
      count: 0,
      component: 'HistoryPage'
    },
    {
      title: 'Notification',
      icon: 'ios-notifications-outline',
      count: 2,
      component: 'NotificationPage'
    },
    {
      title: 'Support',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: 'SupportPage'
    },
    {
      title: 'Settings',
      icon: 'ios-settings-outline',
      count: 0,
      component: 'SettingsPage'
    },
    {
      title: 'Logout',
      icon: 'ios-log-out-outline',
      count: 0,
      component: 'LoginPage'
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, public translate:TranslateService, splashScreen: SplashScreen, public language:LanguageService) {

    platform.ready().then(() => {
      this.language.loadLanguage().then((lan:string)=>{
        this.translate.setDefaultLang(lan);
        this.rootPage = 'ContratlicencePage';
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


