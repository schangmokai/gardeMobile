import {Injectable} from "@angular/core";

import {Http, Headers, RequestOptions } from '@angular/http';
import { maconfig } from '../configs/configs';


@Injectable()
export class HomeService {
 

  constructor(public http: Http) {
    this.http = http;
  }

  insertPosition(donnees) {
    
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        let body = donnees

         this.http.post(maconfig.insertposition, body, options)
          .subscribe(data => {
          }, error => {
            console.log(error);
            
        });
  }

  saveClientVehicule(donnees) {
    
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        let body = donnees

         this.http.post(maconfig.saveClientVehicule, body, options)
          .subscribe(data => {
          }, error => {
            console.log(error);
            
        });
  }

  signalerdanger(donnees) {
    
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        let body = donnees

         this.http.post(maconfig.signalerdanger, body, options)
          .subscribe(data => {
          }, error => {
            console.log(error);
            
        });
  }


  findClientByVehicule(donnees) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    let body = donnees

    return new Promise((succes, failed)=>{
        this.http.post(maconfig.findClientByVehicule, body, options).subscribe(data => {
          succes(data.json());
        }, error => {
              console.log(error);
              failed(error);
        });
    });
  }
  

  
}