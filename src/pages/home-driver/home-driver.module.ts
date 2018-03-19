import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import { HomeDriverPage } from './home-driver';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    HomeDriverPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDriverPage),
    TranslateModule
  ],
})
export class HomeDriverPageModule {}
