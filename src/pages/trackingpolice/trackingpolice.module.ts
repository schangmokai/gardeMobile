import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrackingpolicePage} from './trackingpolice';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    TrackingpolicePage
  ],
  imports: [
    IonicPageModule.forChild(TrackingpolicePage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}