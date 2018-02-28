import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google: any;
import {Geolocation} from '@ionic-native/geolocation';

/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ouestil',
  templateUrl: 'ouestil.html'
})
export class OuestilPage {
    
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('directionsPanel') directionsPanel: ElementRef;
    map: any;
    public malat:any;
    public malon:any;
 
    constructor(public navCtrl: NavController, private geolocation: Geolocation) {

    }
 
    ionViewDidLoad(){

       this.geolocation.getCurrentPosition().then( (resp) =>{
                this.malat = resp.coords.latitude;
                this.malon = resp.coords.longitude;
                this.loadMap();
                this.startNavigating();
        }).catch( (error) =>{     
             console.log()
        });
 
    }
 
    loadMap(){
 
        let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }
 
    startNavigating(){
 
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
 
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        console.log("lat:" + this.malat +" , " + " lng: " + this.malon)
        directionsService.route({
            origin: 'douala',
            destination: 'yaounde',
            //origin: {lat: 37.77, lng: -122.447},
            //destination: {lat: 37.768, lng: -122.511},
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
 
        });
 
    }
  
  
}
