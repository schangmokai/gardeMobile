import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeService } from '../../services/home-service';
import { Session } from '../../configs/configs';

/**
 * Generated class for the HomeDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-driver',
  templateUrl: 'home-driver.html',
})
export class HomeDriverPage {

	public listesutilisateurs:Array<any> = [];
  	public listesclients:Array<any> = [];
	public vehiculeId:any;
  	public imagechauffeur:any;
  	public imagesUsers:any;
  	public chauffeurId:any;
  	public myid: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public homeService:HomeService) {
	  	this.listesutilisateurs = this.navParams.get("listesutilisateurs");
	  	this.vehiculeId = this.navParams.get("vehiculeId");
	  	this.imagesUsers = this.navParams.get("imagesUsers");
	  	this.imagechauffeur = this.navParams.get("imagechauffeur");
	  	if(Session.user != null){
	  		this.myid = Session.user['id'];
	  	}
	  	console.log(this.listesutilisateurs);
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad HomeDriverPage');
  	}
  	ionViewDidEnter(){
      	let body = {
          	"vehiculeId": this.vehiculeId
      	};
      	this.homeService.findAllClientByVehiculeId(body).then( (resp:Array<any>) =>{
            this.listesclients = resp; 
     	 }).catch( (error) =>{    
          	console.log()
      	});
  	}
  	chooseDriver(chauffeurId){
  		this.chauffeurId = chauffeurId;
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
  }
}