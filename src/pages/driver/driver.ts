import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DriverService } from '../../services/driver-service';

/*
  Generated class for the DriverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {
  public driver:any;

  constructor(public nav: NavController, public driverService:DriverService) {
    // get driver info
    this.driver = driverService.getItem(1);
  }

  track() {
    this.nav.setRoot('TrackingPage');
  }
}
