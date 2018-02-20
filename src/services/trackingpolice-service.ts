import {Injectable} from "@angular/core";

import {Http} from '@angular/http';
import { maconfig } from '../configs/configs';

@Injectable()
export class TrackingpoliceService {
 

  constructor(public http: Http) {
    this.http = http;
  }

  fingUserEnDanger() {
    return new Promise((succes, failed)=>{
        this.http.get(maconfig.listesUserEnDanger).subscribe(data => {
          succes(data.json());
        }, error => {
              console.log(error);
              failed(error);
        });
    });
  }

  
}