import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { DriverService } from '../../services/driver-service';

/*
  Generated class for the FindingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-finding',
  templateUrl: 'finding.html'
})
export class FindingPage {
  public drivers:any;

  constructor(public nav: NavController, public driverService:DriverService) {
    // get list drivers
    this.drivers = driverService.getAll();

    setTimeout(() => {
      this.nav.push('DriverPage')
    }, 5000)
  }
}
