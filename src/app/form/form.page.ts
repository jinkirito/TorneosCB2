import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { Torneo } from '../model/Torneo.interface';
import { TorneoService } from '../services/torneo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, NavParams, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiService } from '../services/ui.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  torneo: Torneo = {
    name: '',
    lat:0,
    long: 0,
    description: '',
    photo:''
  }



  torneoID = null;
  lat=0;
  long=0;

  Base64:String;
  URL:String;
  FormPage: any;
  imagen: String;
  ruta:String;
  constructor(public photoService: PhotoService,
     private geo:Geolocation,
     private route: ActivatedRoute,
     public nav: NavController,
     private TorneoS:TorneoService,
     private load: LoadingController,
     private navpara:NavParams,
     private ui:UiService,
     private router: Router,
     private audio:NativeAudio,
     private toast:ToastController
     ) { 

      //this.audio.preloadSimple('a', 'TorneosCB\src\app\form\ring.mp3');
      // 'trackID' can be anything
      this.ruta="resources/ring.mp3";
      this.audio.preloadComplex('a', 'assets/audio/ring.mp3', 1, 1, 0).then(function() {
        console.log("audio loaded!");
    }, function(err) {
        console.log("audio failed: " + err);
    });
  

 
  }

   

  
  

  ngOnInit() {
    this.torneo = this.navpara.get('item');
    this.torneoID = this.torneo.id;
    console.log('id llegado', this.torneoID)
    if(this.torneoID){
      this.loadTorneo();
      this.Base64=this.torneo.photo;
      this.URL="data:image/jpeg;base64,"+this.Base64;
      
    }
  }

  async loadTorneo(){
    const loading = await this.load.create({
      message:'Cargando...'
    });
    await loading.present();
    this.TorneoS.getTorneo(this.torneoID).subscribe(res=>{
      loading.dismiss();
      this.torneo=res;
    })
  }

  async saveTorneo(){
    
    const loading = await this.load.create({
      message:'Guardando...'
    });
    await loading.present();

    if(this.torneoID){
      //actualizar
      
      this.TorneoS.updateTorneo(this.torneo, this.torneoID).then(()=>{
        console.log('actualiza foto',this.torneo.photo);
        loading.dismiss();
        this.ui.modal.dismiss();
      });
    }else{
      //crear nuevo
      try{
      const myLatLng = await this.getLocation();
      if(this.photoService.gets()){
        this.imagen= this.photoService.gets();
      }else{
        this.imagen="";
      }
      this.torneo={
        name: this.torneo.name,
        lat:myLatLng.lat,
        long: myLatLng.lng,
        description: this.torneo.description,
        
        photo:this.imagen
      }
      console.log('añadir', this.torneo)
      console.log('añadir photo', this.torneo.photo)
      this.TorneoS.addTorneo(this.torneo).then(()=>{
      
       
       this.audio.play('a');
        
        loading.dismiss();
        this.ui.modal.dismiss();
      });
    }catch(err){
      loading.dismiss();
      this.presentToast();
    }
    }
  }

  async delTorneo(){
    const loading = await this.load.create({
      message:'borrando...'
    });
    await loading.present();
    if(this.torneoID){
      //actualizar
      this.TorneoS.removeTorneo(this.torneoID);
        loading.dismiss();
       
        this.ui.modal.dismiss();
      
    }else{
      //crear nuevo
     this.ui.showToast("no se puede eliminar si esta vacio");
    }
  }

  private async getLocation() {
    const rta = await this.geo.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  irMap(){
    this.ui.setlatp(this.torneo.lat);
    this.ui.setlongp(this.torneo.long);
    this.nav.navigateForward('/tabs/tab2');
    this.ui.modal.dismiss();
    
  }
  
  async presentToast() {
    const toast = await this.toast.create({
      message: 'Asegurese de rellenar todos los campos',
      duration: 2000
    });
    toast.present();
  }

  foto(){
    this.photoService.cogerFoto();
  }
  cord ={
    lat:this.torneo.lat,
    long:this.torneo.long
  }
}
