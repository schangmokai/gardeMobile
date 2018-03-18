import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {OuestilPage} from './ouestil';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    OuestilPage
  ],
  imports: [
    IonicPageModule.forChild(OuestilPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class OuestilPageModule {}