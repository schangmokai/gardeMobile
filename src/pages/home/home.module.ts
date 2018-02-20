import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
//import { LocalNotifications } from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}