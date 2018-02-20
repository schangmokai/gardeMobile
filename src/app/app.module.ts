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

// import services
import {DriverService} from '../services/driver-service';
import {NotificationService} from '../services/notification-service';
import {PlaceService} from '../services/place-service';
import {HomeService} from '../services/home-service';
import {TripService} from '../services/trip-service';
import {TrackingpoliceService} from '../services/trackingpolice-service';


// end import services

// import pages
import {DriverPage} from '../pages/driver/driver';
import {FindingPage} from '../pages/finding/finding';
import {HistoryPage} from '../pages/history/history';
import {LoginPage} from '../pages/login/login';
import {ModalRatingPage} from '../pages/modal-rating/modal-rating';
import {NotificationPage} from '../pages/notification/notification';
import {PaymentMethodPage} from '../pages/payment-method/payment-method';
import {PlacesPage} from '../pages/places/places';
import {ProfilePage} from '../pages/profile/profile';
import {RegisterPage} from '../pages/register/register';
import {SupportPage} from '../pages/support/support';
import {TrackingPage} from '../pages/tracking/tracking';
import { HttpModule } from '@angular/http';
// end import pages

@NgModule({
  declarations: [
    MyApp,
    DriverPage,
    FindingPage,
    HistoryPage,
    LoginPage,
    ModalRatingPage,
    NotificationPage,
    PaymentMethodPage,
    PlacesPage,
    ProfilePage,
    RegisterPage,
    SupportPage,
    TrackingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DriverPage,
    FindingPage,
    HistoryPage,
    LoginPage,
    ModalRatingPage,
    NotificationPage,
    PaymentMethodPage,
    PlacesPage,
    ProfilePage,
    RegisterPage,
    SupportPage,
    TrackingPage
  ],
  providers: [
    StatusBar,
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
    File

    /* import services */
  ]
})
export class AppModule {
}


