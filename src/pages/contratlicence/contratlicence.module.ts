import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContratlicencePage} from './contratlicence';


@NgModule({
  declarations: [
    ContratlicencePage
  ],
  imports: [
    IonicPageModule.forChild(ContratlicencePage)
  ],
  providers: [
   // LocalNotifications
  ]
})
export class ContratlicencePageModule {}