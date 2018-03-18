import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrackingPage} from './tracking';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    TrackingPage
  ],
  imports: [
    IonicPageModule.forChild(TrackingPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class TrackingPageModule {}