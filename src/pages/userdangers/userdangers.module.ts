import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserdangersPage} from './userdangers';
//import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    UserdangersPage
  ],
  imports: [
    IonicPageModule.forChild(UserdangersPage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}