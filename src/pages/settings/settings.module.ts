import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SettingsPage} from './settings';
//import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class SettingsPageModule {}