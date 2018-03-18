import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {TranslateService} from "ng2-translate/src/translate.service";
import {LANG} from '../configs/configs';
/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguageService {
	private key:string = "Language";
  constructor(public storage: Storage, private translate: TranslateService) {
    console.log('Hello LanguageProvider Provider');
  }
  storeLanguage(lan){
    return new Promise((resolve)=>{ 
      try{
        this.storage.set(this.key, lan).then((val) => {
          this.translate.setDefaultLang(lan);
          LANG.value = lan;
          resolve(val);
        }, error=>{
          this.translate.setDefaultLang('fr');
          LANG.value = 'fr';
          resolve('fr');
        });
      }catch(error){
        this.translate.setDefaultLang('fr');
        LANG.value = 'fr';
        resolve('fr');
      }
    });
  }

  loadLanguage(){
    return new Promise((resolve)=>{ 
      try{
        this.storage.get(this.key).then((lan) => {
          if(lan == null || typeof lan !== 'string'){
            lan = 'fr';
          }
          LANG.value = lan;
          resolve(lan);
         }).catch((error)=>{
              LANG.value = 'fr';
          resolve('fr');
         });
      }catch(error){
        LANG.value = 'fr';
        resolve('fr');
      }
    });
  }
}