import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SettingsPage} from './settings';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class SettingsPageModule {}