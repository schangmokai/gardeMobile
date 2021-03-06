import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { PlaceService } from '../../services/place-service';

/*
  Generated class for the PlacesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage {
  // recent places
  public recentPlaces:any;

  // all places
  public places:any;

  constructor(public nav: NavController, public placeService: PlaceService) {
    this.recentPlaces = this.placeService.getAll();
    this.places = this.placeService.getAll();
  }

  choosePlace() {
    this.nav.pop();
  }
}
