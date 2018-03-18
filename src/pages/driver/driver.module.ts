import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DriverPage} from './driver';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    DriverPage
  ],
  imports: [
    IonicPageModule.forChild(DriverPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class DriverPageModule {}