import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PaymentMethodPage} from './payment-method';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    PaymentMethodPage
  ],
  imports: [
    IonicPageModule.forChild(PaymentMethodPage),
    TranslateModule
  ],
  providers: [
   // LocalNotifications
  ]
})
export class PaymentMethodPageModule {}