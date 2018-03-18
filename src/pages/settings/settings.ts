import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import { UserConnecteService } from '../../services/userConnecte-service';
import {LanguageService} from '../../services/language';
import {LANG, Languages} from '../../configs/configs';

@IonicPage()
@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

    public conseils: any;
    public timing: any;
    public languages:any = LanguageService;
    public langue:string = LANG;

    constructor(public nav: NavController , public userconnecte: UserConnecteService, public language:LanguageService) {
        this.conseils = "vous allez recevoir des messages en fonctions de vos choix";
    }

    onSelectChange(selectedValue: any){
        console.log('Selected', selectedValue);
        if(selectedValue == 2){
            this.conseils = "conseil pour la selection des 2 minutes";
            this.timing = 2;
        }
        if(selectedValue == 5){
            this.conseils = "conseil pour la selection des 5 minutes";
            this.timing = 5;
        }
        if(selectedValue == 10){
            this.conseils = "conseil pour la selection des 10 minutes";
            this.timing= 10;
        }
        if(selectedValue == 15){
            this.conseils = "conseil pour la selection des 15 minutes";
            this.timing = 15;
        }
        if(selectedValue == 20){
            this.conseils = "conseil pour la selection des 20 minutes";
            this.timing = 20;
        }
        if(selectedValue == 25){
            this.conseils = "conseil pour la selection des 25 minutes";
            this.timing = 25;
        }
    }
    
    changeLanguage(e){
        //console.log();
        this.languageProvider.storeLanguage(this.langue).then((lan:string)=>{
         console.log(lan)});
    }

    home(){
        this.userconnecte.getId();
        console.log("==================== " + this.userconnecte.getId() + " ====================" )
        this.userconnecte.setParameterUser(this.userconnecte.getId(),this.userconnecte.getStatus(),this.timing);
        this.nav.setRoot('HomePage',{
            id: this.userconnecte.getId(),
            status: this.userconnecte.getStatus(),
            timing: this.timing
        }); 

    }
}