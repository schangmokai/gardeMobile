import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrackingpolicePage} from './trackingpolice';
//import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    TrackingpolicePage
  ],
  imports: [
    IonicPageModule.forChild(TrackingpolicePage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}