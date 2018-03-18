import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PlacesPage} from './places';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    PlacesPage
  ],
  imports: [
    IonicPageModule.forChild(PlacesPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class PlacesPageModule {}