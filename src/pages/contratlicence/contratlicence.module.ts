import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContratlicencePage} from './contratlicence';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    ContratlicencePage
  ],
  imports: [
    IonicPageModule.forChild(ContratlicencePage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class ContratlicencePageModule {}