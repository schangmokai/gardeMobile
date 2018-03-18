import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ModalRatingPage} from './modal-rating';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    ModalRatingPage
  ],
  imports: [
    IonicPageModule.forChild(ModalRatingPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class ModalRatingPageModule {}