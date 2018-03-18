import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';  
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Geolocation} from '@ionic-native/geolocation';
import { Media} from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Network } from  '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';

// import services
import {DriverService} from '../services/driver-service';
import {NotificationService} from '../services/notification-service';
import {PlaceService} from '../services/place-service';
import {HomeService} from '../services/home-service';
import {TripService} from '../services/trip-service';
import {ConnectivityService} from '../services/connectivity-service';
import {TrackingpoliceService} from '../services/trackingpolice-service';
import {UserConnecteService} from '../services/userConnecte-service';
import {LanguageService} from '../services/language';

// end import services
import { HttpModule } from '@angular/http';
import { Http  } from "@angular/http";
// end import pages

//translate
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
export function translateLoader(http: Http) { return new TranslateStaticLoader(http, './assets/i18n', '.json');}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: translateLoader,
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    Storage,
    SplashScreen,
    DriverService,
    NotificationService,
    PlaceService,
    BarcodeScanner,
    Geolocation,
    HomeService,
    TripService,
    TrackingpoliceService,
    Media,
    File,
    Network,
    ConnectivityService,
    UserConnecteService,
    LanguageService
    /* import services */
  ]
})
export class AppModule {
}


