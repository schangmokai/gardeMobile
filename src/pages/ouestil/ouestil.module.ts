import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OuestilPage} from './ouestil';
//import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    OuestilPage
  ],
  imports: [
    IonicPageModule.forChild(OuestilPage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}