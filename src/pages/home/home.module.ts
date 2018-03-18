import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HomePageModule {}