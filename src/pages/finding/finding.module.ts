import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FindingPage} from './finding';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    FindingPage
  ],
  imports: [
    IonicPageModule.forChild(FindingPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class FindingPageModule {}