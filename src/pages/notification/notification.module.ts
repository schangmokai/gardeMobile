import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NotificationPage} from './notification';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    NotificationPage
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class NotificationPageModule {}