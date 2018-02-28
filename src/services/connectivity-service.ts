import { Injectable } from '@angular/core';
import { Network } from  '@ionic-native/network';
import { Platform } from 'ionic-angular';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform, public network: Network){
    this.onDevice = this.platform.is('cordova');
  }
 
  isOnline(): boolean {
    var test =  this.network.onConnect().subscribe(() => {
    });
    if(this.onDevice && test){
      return test !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }
 
  isOffline(): boolean {
    var test =  this.network.onConnect().subscribe(() => {
    });
    if(this.onDevice && test){
      return test === Connection.NONE;
    } else {
      return !navigator.onLine;  
    }
  }
}