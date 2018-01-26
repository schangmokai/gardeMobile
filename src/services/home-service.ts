import {Injectable} from "@angular/core";

import {Http, Headers, RequestOptions } from '@angular/http';

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

         this.http.post('http://localhost:8085/api/insertposition', body, options)
          .subscribe(data => {
          }, error => {
            console.log(error);
            
        });
  }

  
}