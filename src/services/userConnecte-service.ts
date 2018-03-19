import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {TimerCounter, Session} from './../configs/configs';
 
//declare var Connection;
 
@Injectable()

export class UserConnecteService{

    public id:any;
    public status: any;
    public timing: any;
    private key = 'session';

    constructor(public storage: Storage){
        this.id = '1';
        this.status = '1';
        this.timing = '1';
    }

    setParameterUser(id, status, timing){
        this.id = id;
        this.status = status;
        this.timing = timing;
    }

    getId(){
        return this.id;
    }

    getStatus(){
        return this.status;
    }

    getTiming(){
        return this.timing;
    }
    logut(){
        this.storage.remove(this.key);
    }
    storeSession(data){
        Session.user = data['profile'];
        Session.token = data['token'];
        return new Promise((resolve)=>{
            this.storage.set(this.key, data).then((val) => {
              resolve();
            }, error=>{
                resolve();
            });
        });
    }
    getSession(){
        return new Promise((resolve,  failed)=>{
            this.storage.get(this.key).then((data) => {
                if(data == null){
                    failed();
                }else{
                    Session.user = data['profile'];
                    Session.token = data['token'];
                    resolve(data);
                }
             }).catch((error)=>{
                failed();
             });
        });
    }
    license(show:boolean){
        return new Promise((resolve, failed)=>{
            if(show){
                this.storage.get('show_license').then((data) => {
                    if(data == '1'){
                        failed();
                    }else{
                        resolve();
                    }
                 }).catch((error)=>{
                    failed();
                 });
            }else{
                this.storage.set('show_license', 1).then((val) => {
                    resolve();
                }, error=>{
                    resolve();
                });
            }
        });
    }
    notificationDelai(value:any){
        return new Promise((resolve, failed)=>{
            if(undefined == value || value == null){
                this.storage.get('notification_delai').then((data) => {
                    resolve(data);
                 }).catch((error)=>{
                    failed();
                 });
            }else{
                this.storage.set('notification_delai', value).then((val) => {
                    TimerCounter.value = val;
                    if(TimerCounter.timer != null){

                    }
                    resolve();
                }, error=>{
                    resolve();
                });
            }
        });
    }
}