import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { LoadingController, NavParams } from '@ionic/angular';
import Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import { UiService } from '../services/ui.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



  // @ViewChild('map') mapContainer: ElementRef;
  map: any;
  latp: number;
  longp: number;
  myLatLng: any;
  markerGroup: any;

  async ngOnInit(): Promise<void> {
    await this.creaMapa();
    console.log("Mapa creado")
    this.refrescaMapa();
  }
  ionViewDidEnter(): void {
    if (this.map) {
      this.latp = this.ui.getLatp();
      this.longp = this.ui.getLongp();
      console.log("REFERES")
      this.refrescaMapa();
    }
  }

  constructor(private geo: Geolocation, private ui: UiService,  private loading: LoadingController) {

  }


  async creaMapa() {

    this.myLatLng = await this.getLocation();

    this.map = Leaflet.map("map").fitWorld();
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);
  }
  private async getLocation() {
    const rta = await this.geo.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  async refrescaMapa() {

     this.map.eachLayer((layer)=> {
      if(!layer.options.attributions)  //borro todas menos la principal
        this.map.removeLayer(layer)
  }); 


    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      this.markerGroup = Leaflet.featureGroup();
      let marker: any = Leaflet.marker([this.myLatLng.lat, this.myLatLng.lng]).on('click', () => {
        alert('Marker clicked');
      })
      if (this.latp == null) {
        this.markerGroup.addLayer(marker);
      } else {
        let marker3: any = Leaflet.marker([this.latp, this.longp]).on('click', () => {
          Leaflet.Routing.control({
            waypoints: [
              Leaflet.latLng(this.myLatLng.lat, this.myLatLng.lng),
              Leaflet.latLng(this.latp, this.longp)
            ], routeWhileDragging: true
          }).addTo(this.map);
        })
        this.markerGroup.addLayer(marker);
        //  markerGroup.addLayer(marker2);
        this.markerGroup.addLayer(marker3);


      }
      this.map.addLayer(this.markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
    })
    // this.addMaker(myLatLng.lat, myLatLng.lng);
    // this.addBattlegamers(37.881836, -4.7883977);
  };


}

