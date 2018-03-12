import { Injectable } from '@angular/core';
 
declare var Connection;
 
@Injectable()

export class UserConnecteService{

    public id:any;
    public status: any;
    public timing: any;

    constructor(){
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
}