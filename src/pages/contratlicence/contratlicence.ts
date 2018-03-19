import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {IonicPage} from 'ionic-angular';
import { UserConnecteService } from './../../services/userConnecte-service';

@IonicPage()
@Component({
  templateUrl: 'contratlicence.html'
})
export class ContratlicencePage {

  constructor(public nav: NavController, private userconnecteService: UserConnecteService) {
    
  }

  slides = [
    {
      title: "Bienvenue sur garde !",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "C'est quoi garde ?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "Utilisation de garde ?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  //lorsque l'utilisateur décide de continuer
  finish(){
    this.userconnecteService.license(false).then(()=>{
      this.userconnecteService.getSession().then(session=>{
        this.nav.setRoot('HomePage');
      }, ()=>{
        this.nav.setRoot('LoginPage');
      });
    });
  }
}