import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { NavController, NavParams} from 'ionic-angular';
import * as io from 'socket.io-client';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  socket:any;
  chat_input:string;
  chats = [];
  public content: string;
  public recpid: any; 
  public username: any; 
  public password: any; 
  public message: any;
  public myid: any;
  public status: any;
  public user: any;
  

  typing = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.myid = this.navParams.get('id');
    this.status = this.navParams.get('status');
    this.user = this.navParams.get('user');
    this.socket = io('http://localhost:3000');
    this.content = "";

    this.socket.on('chat-message', (msg) =>{
        this.chats.push(msg);
    });

    this.socket.on('update-typing', (msg) => {
         this.typing =  ' is typing...'
    });

    this.socket.on('typing-stopped', (msg) => {
         this.typing = '';
    });

  }


  onInputTime(data){
       if(data!=''){
         this.socket.emit('start-typing', {});   
       }else{
         this.socket.emit('stop-typing', { message: data});
       }
  }


  send(msg) {
        if(msg != ''){
            this.socket.emit('chat-message', { message: msg, id_emetteur: this.myid});
            this.socket.emit('stop-typing', { message: msg});
        }
        this.content = '';
        this.typing = '';
    }
}

