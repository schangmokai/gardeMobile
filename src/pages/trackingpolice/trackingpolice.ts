import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import { TrackingpoliceService } from '../../services/trackingpolice-service';
import { maconfig } from '../../configs/configs';
declare var google: any;
import * as io from 'socket.io-client';


/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trackingpolice',
  templateUrl: 'trackingpolice.html'
})
export class TrackingpolicePage {
  // map id
  public mapId = Math.random() + 'map';

  // map height
  public mapHeight: number = 480;

  // show - hide booking form
  public showForm: boolean = false;

  // show - hide modal bg
  public showModalBg: boolean = false;

  public listesutilisateurs : any;

  public myid: any;

  public status: any;

  public myPosition = null;

  public lat : any;
  public lon : any;

  // list vehicles

  public hometest:any;

  public vehicles: any = [
    {
      name: 'Taxi',
      icon: 'icon-taxi',
      active: true
    },
    {
      name: 'SUV',
      icon: 'icon-car',
      active: false
    },
    {
      name: 'Car',
      icon: 'icon-sedan',
      active: false
    }
  ]

  public records: any = [
    {
      id: 1,
      from: 'Royal City',
      to: 'Vietnam - France hospital',
      time: '2016-01-02'
    },
    {
      id: 2,
      from: 'BigC',
      to: 'Phao Dai Lang',
      time: '2015-12-11'
    },
    {
      id: 3,
      from: 'Royal City',
      to: '784 Lang',
      time: '2015-11-10'
    },
    {
      id: 4,
      from: 'Royal City',
      to: 'Vietnam - France hospital',
      time: '2015-11-10'
    }
  ];

  // Note to driver
  public note: any;

  // Promo code
  public promo: any;

  // Map
  public map: any;
  public task: any;
  public vcontrol: any;
  socket:any;
  public listesutilisateursEnDangers: any;
  public userdangers: any;

  constructor(public nav: NavController,  public navParams: NavParams, public trackingpoliceService: TrackingpoliceService) {
     this.myid = this.navParams.get('id');
     this.status = this.navParams.get('status');
     this.userdangers = this.navParams.get('userdangers');
     console.log(this.userdangers);
     this.hometest = 1;     
     this.chargementDeDonne();
     this.socket = io(maconfig.socketadresse);

     this.socket.on('alert', (msg) => {
        if(msg.id_emetteur == this.userdangers.id){
            this.lat = this.lat + 0.1;
            this.lon = this.lon + 0.2;
        }
     });

     /*this.task = setInterval((function () {
           this.lat = this.lat + 0.1;
           this.lon = this.lon + 0.2;
     }).bind(this), 300);*/
     
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  // toggle form
 
  chargementDeDonne(){
    this.trackingpoliceService.fingUserEnDanger().then( (resp) =>{
        this.listesutilisateursEnDangers = resp;
      }).catch( (error) =>{    
         console.log()
     });
  }


  selection(){
     this.hometest = 1;
     this.vcontrol = 1;
     this.initializeMap();
  }


  
  allezchater(){
    this.nav.setRoot('ChatPage');
  }


  // toggle active vehicle
  toggleVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = (i == index);
    }
  }

  initializeMap() {

    this.lat = 3.8480325;
    this.lon = 11.502075200000002;

    let latLng = new google.maps.LatLng(3.8480325 , 11.502075200000002);
    let mapOptions = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);

    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('booking-info')[0].scrollHeight;
    // get booking form height
    var bookingHeight = document.getElementsByClassName('booking-form')[0].scrollHeight;

    // set map height = view height - info block height + booking form height
    this.mapHeight = viewHeight - infoHeight + bookingHeight;


    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);

    
    // use GPS to get center position

    this.task = setInterval((function () {
      
        /*console.log("le mokai");
        lat = lat + 0.1;
        lon = lon + 0.2;*/
        /*navigator.geolocation.getCurrentPosition(
        (position) => {*/

          let newLatLng = new google.maps.LatLng(this.lat, this.lon);
          this.map.setCenter(newLatLng);
          if(this.myPosition == null){
            this.myPosition = 
            new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: this.map.getCenter()
            });
          }else{
            this.myPosition.setPosition(newLatLng);
          }
       /* },
        (error) => {
          console.log(error);
        },
        options
       );*/

    }).bind(this), 300);
    
  }

  
  
}
