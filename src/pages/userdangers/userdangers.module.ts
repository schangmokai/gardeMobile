import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserdangersPage} from './userdangers';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    UserdangersPage
  ],
  imports: [
    IonicPageModule.forChild(UserdangersPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}