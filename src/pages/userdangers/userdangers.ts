import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { TrackingpoliceService } from '../../services/trackingpolice-service';
import * as io from 'socket.io-client';
import { HomeService } from '../../services/home-service';
import { maconfig } from '../../configs/configs';
declare var google: any;



/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userdangers',
  templateUrl: 'userdangers.html'
})
export class UserdangersPage {
  // map id
  public mapId = Math.random() + 'map';


  // map height
  public mapHeight: number = 480;

  public listesutilisateurs : any;

  public myid: any;

  public valideur: any;

  public status: any;

  public imagesUsers: any;

  public Imagechauffeur: any;

  public myPosition:any;

  // Map
  public map: any;

  // list vehicles

  public hometest:any;

  public nom: any;

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

  socket:any;
  public listesutilisateursEnDangers: any;
  public descriptionvehicules: any;
  public imagesVehicule: any;

  constructor(public nav: NavController, public navParams: NavParams, public trackingpoliceService: TrackingpoliceService, public alertCtrl: AlertController, public homeService: HomeService) {
     this.myid = this.navParams.get('id');
     this.status = this.navParams.get('status');     
     this.chargementDeDonne();
     this.hometest = 0;
     this.imagesUsers = maconfig.imagesUsers;
     this.imagesVehicule = maconfig.imagesVehicule;
     this.Imagechauffeur = maconfig.Imagechauffeur;
     this.socket = io(maconfig.socketadresse);
     // en cas d'alerte alors la possibilité de chat s'impose a tous les utilisteur connecté
     this.valideur = 0;
     this.socket.on('alert', (msg) => {
        if((msg.id_emetteur!= this.myid)&&(this.valideur == 0)){
          this.participezAlaDiscussion();
          this.valideur = 1;
        }
        
     });  
     
  }

  // toggle form
 
  chargementDeDonne(){
    this.trackingpoliceService.fingUserEnDanger().then( (resp) =>{
        this.listesutilisateursEnDangers = resp;
      }).catch( (error) =>{    
         console.log()
     });
  }


  allezchater(user){
    /*this.nav.setRoot('ChatPage',{
       id: this.myid,
       status: this.status
    });*/
    
    this.nav.setRoot('ChatPage',{
      id: this.myid,
      status: this.status,
      user: user
    });
    
  }

  retour(){
    this.hometest = 0;
  }

  details(user){

     let body = {
          "utilisateurId": user.id,
      };

     this.hometest = 1;

     this.homeService.findClientByVehicule(body).then( (resp) =>{
          this.descriptionvehicules = resp;
      }).catch( (error) =>{    
         console.log()
     });

  }

  

  mapdnager(){


    this.hometest = 2;

      let latLng = new google.maps.LatLng(48.8513735, 2.3861292);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(document.getElementById(this.mapId), mapOptions);    

        var locations = [
          ['Bondi Beach', -33.890542, 151.274856, 4],
          ['Coogee Beach', -33.923036, 151.259052, 5],
          ['Cronulla Beach', -34.028249, 151.157507, 3],
          ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
          ['Maroubra Beach', -33.950198, 151.259302, 1]
        ];

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: this.map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(this.map, marker);
            }
          })(marker, i));
        }
        

  }

   participezAlaDiscussion(){

    let alert2 = this.alertCtrl.create({
          title: 'Alerte Rouge',
          message: 'Vollez vous Paricipez à cette Recherche ?',
          buttons: [
            {
              text: 'NON',
              handler:() => {
                this.valideur =1;
                console.log('Cancel clicked');
              }
            },
            {
              text: 'OUI',
              handler: () => {
                alert2.dismiss().then(() => {
                    //this.allezchater();
                    this.chargementDeDonne();
                });
              }
            }
          ]
        });

      alert2.present();
  }

  selection(user){
     this.nav.setRoot('TrackingpolicePage',{
      id: this.myid,
      status: this.status,
      userdangers: user
     });
  }



  // toggle active vehicle
  toggleVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = (i == index);
    }
  }
  
}
