import {Component} from '@angular/core';
import {NavController, Platform, AlertController, LoadingController} from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Geolocation} from '@ionic-native/geolocation';
import {PlacesPage} from '../places/places';  
import {PaymentMethodPage} from '../payment-method/payment-method';
import {FindingPage} from "../finding/finding";
//import {Http} from '@angular/http';
import {Http, Headers, RequestOptions } from '@angular/http';
declare var google: any;
import { HomeService } from '../../services/home-service';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

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

  public task: any;

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private geolocation: Geolocation, public http: Http, public loadingCtrl: LoadingController, public homeService: HomeService, private media: Media, private file: File) {
     this.hometest = 1;
     this.http = http;
     this.task = setInterval((function () {
          // this.recuperationCoordone();
     }).bind(this), 5000);
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  // toggle form


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

              this.homeService.insertPosition(body);

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

              this.http.post('http://localhost:8085/api/findChauffeurByCodeVehicule', body, options)
                .subscribe(data => {
                  
                   this.listesutilisateurs = data.json();
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



  confirmerForme() {



         this.file.createFile(this.file.tempDirectory, '../../assets/img/song.mp3', true).then(() => {
            let file = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + '../../assets/img/song.mp3');
            file.startRecord();
            window.setTimeout(() => file.stopRecord(), 10000);
          });


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
              }
            },
            {
              text: 'OK',
              handler: data => {
                //data.username, data.password
                console.log(data.code);
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

  







  // toggle active vehicle
  toggleVehicle(index) {
    for (var i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].active = (i == index);
    }
  }

  initializeMap() {
    let latLng = new google.maps.LatLng(21.0318202, 105.8495298);

    let mapOptions = {
      center: latLng,
      zoom: 16,
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
        let newLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(newLatLng);
        new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });
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