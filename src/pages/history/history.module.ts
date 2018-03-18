import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HistoryPage} from './history';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    HistoryPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class HistoryPageModule {}