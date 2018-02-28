import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NavController, Platform, AlertController, NavParams, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Geolocation} from '@ionic-native/geolocation';
import {PlacesPage} from '../places/places';  
import {PaymentMethodPage} from '../payment-method/payment-method';
import {FindingPage} from "../finding/finding";
//import {Http} from '@angular/http';
import {Http, Headers, RequestOptions } from '@angular/http';
declare var google: any;
import { HomeService } from '../../services/home-service';
import { maconfig } from '../../configs/configs';
//import { Media} from '@ionic-native/media';
//import { File } from '@ionic-native/file';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import * as io from 'socket.io-client';


/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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

  public myPosition = null;

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

  // Note to driver
  public note: any;

  // Promo code
  public promo: any;

  // Map
  public map: any;

  public status: any;

  public task: any;
  public that: any;
  public valideur: any;
  public vehiculeId: any;
  public chauffeurId:any;
  public utilisateurId:any;
  public listesclients: any;
  public nombredeclients: any;
  socket:any

  public imagechauffeur: any;
  public imagesUsers:any;

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private geolocation: Geolocation, public http: Http, public loadingCtrl: LoadingController, public homeService: HomeService, public navParams: NavParams) {
     this.myid = this.navParams.get('id');
     this.status = this.navParams.get('status');
     this.imagechauffeur = maconfig.Imagechauffeur;
     this.imagesUsers = maconfig.imagesUsers;
     this.hometest = 1;
     this.http = http;
     this.that = 0;
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

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  // toggle form


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
                /*this.nav.push('ChatPage', {
                   id = this.myid,
                   status = this.status
                });*/

                alert2.dismiss().then(() => {
                    /*this.nav.pop().then(data => {
                        this.nav.push('ChatPage', {
                           id = this.myid,
                           status = this.status
                        });
                    });*/

                    this.allezchater();
                });

              }
            }
          ]
        });

        alert2.present();
  }


  recuperationCoordone(){

     this.geolocation.getCurrentPosition().then( (resp) =>{
              let now = new Date();
              var heure = now.getHours();
              var minute = now.getMinutes();
              let body = {
                "lat": resp.coords.latitude,
                "log": resp.coords.longitude,
                "date": new Date(),
                "heure": heure,
                "minute": minute
              };

            this.homeService.insertPosition(body).then( (resp) =>{
                  
            }).catch( (error) =>{    
                 console.log()
            });

            //this.homeService.insertPosition(body);




      }).catch( (error) =>{
               
       console.log()});
  }

  toggleForm() {

    //this.showForm = !this.showForm;
    //this.showModalBg = (this.showForm == true);

    //this.barcodeScanner.scan().then((barcodeData) =>{
              //alert(barcodeData.text);
              //this.hometest = 0;
              let headers = new Headers();
              headers.append('Accept', 'application/json');
              headers.append('Content-Type', 'application/json');
              let options = new RequestOptions({headers: headers});
              
              let body = {
                 code: "carte_grice_num80909"
              };

              let loading = this.loadingCtrl.create({content: "please wait ..."});
              loading.present();

              this.http.post(maconfig.findChauffeurByCodeVehicule, body, options)
                .subscribe(data => {
                   this.listesutilisateurs = data.json();
                   this.vehiculeId = this.listesutilisateurs[0].vehicule.id;
                   this.hometest = 0;
                   loading.dismissAll();
                }, error => {
                  console.log(error);
                  loading.dismissAll();
                });

         
                this.task = setInterval((function () {
                   // this.recuperationCoordone();
                }).bind(this), 5000);



            /*  }, (err) => {
                    alert(err);
          });*/

  }


allezchater(){


    this.nav.setRoot('UserdangersPage',{
      id: this.myid,
      status: this.status
    });
    

    /*this.nav.setRoot('ChatPage',{
       id: this.myid,
       status: this.status
    });*/
}



 validerSecurite(){

         /*this.file.createFile(this.file.tempDirectory, '../../assets/img/song.mp3', true).then(() => {
            let file = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + '../../assets/img/song.mp3');
            file.startRecord();
            window.setTimeout(() => file.stopRecord(), 10000);
          });*/


        this.that = 10;
        // apres 20 secondes si le monsieur n'a pas valide
        
        console.log("this.that dans la GF = " + this.that)
        setTimeout(() => {
          if(this.that == 10){
            // alerte au serveur
              
              // pour la premiere fois nous allons modifier un attribut de l'utilisateur en danger et envoyer sa position a la police toutes les 5 secondes
              // l'attribut danger de l'utilisateur passe a un pour dire qui l'utilisateur est en danger
               let body = {
                  "id": this.myid
                };


            this.homeService.signalerdanger(body).then( (resp) =>{
                  
             }).catch( (error) =>{    
                console.log()
             });

            //this.homeService.signalerdanger(body);



              this.task = setInterval((function () {

                this.geolocation.getCurrentPosition().then( (resp) =>{ 
               
                  console.log("alert au serveur");


                  this.socket.emit('alert', {lat : resp.coords.latitude, lon : resp.coords.longitude, id_emetteur: this.myid, status: this.status})
                  this.that = 50;
                 }).catch( (error) =>{   
                  console.log()
                 });
              }).bind(this), 1000);
           }
           
        }, 20000);


        let alert = this.alertCtrl.create({

          title: 'Confirmer Security',


          inputs: [
           
            {
              name: 'code',
              placeholder: 'Code Security',
              type: 'text'
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
                this.that = 20;
              }
            },
            {
              text: 'OK',
              handler: data => {
                //data.username, data.password
                console.log(data.code);
                this.that = 0;
                console.log("c bon il a confirmé")
                /*if () {
                  // logged in!
                } else {
                  // invalid login
                  return false;
                }*/
              }
            }
          ]
        });

        alert.present();

 }

  entreeDansLaVoiture(){

       /* this.task = setInterval((function () {
            this.recuperationCoordone();
        }).bind(this), 5000);*/

        this.task = setInterval((function () {
            if(this.that==0){
               console.log("this.that = " + this.that)
               this.validerSecurite();
            } 
        }).bind(this), 10000);
        

        let body = {
          "vehiculeId": this.vehiculeId,
          "chauffeurId": this.chauffeurId,
          "utilisateurId": this.myid
        };

         this.homeService.saveClientVehicule(body).then( (resp) =>{
                  
         }).catch( (error) =>{    
            console.log()
         });

        //this.homeService.saveClientVehicule(body);

        /*setTimeout(() => {
          this.that = 50;
          console.log("le moaki");
        }, 1000);

        setTimeout(() => {
          this.that = 9000;
          console.log("le pros lexus");
        }, 3000);

        this.task = setInterval((function () {
           if(this.that<10000){
             console.log(this.that);
           }
        }).bind(this), 1000);*/
  }

  confirmerForme(element){

      this.imagesUsers = this.imagesUsers;
      this.hometest = 2;
      this.chauffeurId = element.vehicule.id;
      this.utilisateurId = element.chauffeur.id;
      // nous lons rechercher tous les client de cette voiture
      
      let body = {
          "vehiculeId": this.vehiculeId,
          "chauffeurId": this.chauffeurId
      };

      this.homeService.findAllClientByVehiculeId(body).then( (resp) =>{
            this.listesclients = resp; 
            console.log(this.listesclients.length);
            this.nombredeclients = this.listesclients.length;
      }).catch( (error) =>{    
          console.log()
      });

  }

  // toggle active vehicle
  toggleVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = (i == index);
    }
  }

  initializeMap() {

    var lat = 3.8480325;
    var lon = 11.502075200000002;

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

    let options = {timeout: 120000, enableHighAccuracy: true};

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);

    
    // use GPS to get center position

 
      navigator.geolocation.getCurrentPosition(
      (position) => {

        let newLatLng = new google.maps.LatLng(lat, lon);
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
      },
      (error) => {
        console.log(error);
      },
      options
     );
    
  }

  // Show note popup when click to 'Notes to driver'
  showNotePopup() {
    let prompt = this.alertCtrl.create({
      title: 'Notes to driver',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Note'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  };

  // Show promote code popup when click to 'Promote Code'
  showPromoPopup() {
    let prompt = this.alertCtrl.create({
      title: 'Promo code',
      message: "",
      inputs: [
        {
          name: 'note',
          placeholder: 'Promo code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  };

  // go to next view when the 'Book' button is clicked
  book() {
    // hide booking form
    this.toggleForm();

    // go to finding page
    this.nav.push(FindingPage);
  }

  // choose pickup place
  choosePlace() {
    // go to places page
    this.nav.push(PlacesPage);
  }

  // choose payment method
  choosePaymentMethod() {
    // go to payment method page
    this.nav.push(PaymentMethodPage);
  }
}
