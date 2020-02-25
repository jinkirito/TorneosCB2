import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Torneo } from '../model/Torneo.interface';
import { TorneoService } from '../services/torneo.service';
import { UiService } from '../services/ui.service';
import { FormPage } from '../form/form.page';
import { Observable } from 'rxjs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  descendants: boolean;
  first: boolean;
  read: any;
  isViewQuery: boolean;
  selector: any;
  static: boolean;
  infiniteScroll: IonInfiniteScroll;
  
  public misaludo
  torneo:Torneo[];
  nombre:any;
  description:any;
  imgURL:String;
  nose:Array<Torneo>;
 
  torneop: Observable<Torneo[]>;
  
  constructor(private translate:TranslateService
     ,private auth:AuthService,
      private TorneoS:TorneoService,
      private ui:UiService
      ) {}

  
  public logout(){
    this.auth.logout();
  }


  ngOnInit(): void {
    this.TorneoS.getTorneos().subscribe(res=>{
      this.torneo = res;
      console.log('torneos', this.torneo)
      

    });
  }

  ionViuwDidEnter(){
    this.translate.get('hello').subscribe(value=>{console.log(value);})
  }


  public async addTorneo() {
    const itemToBeUpdated = await this.ui.showModal(FormPage, { item: {} });
    console.log(itemToBeUpdated);
    try {
      if (itemToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.TorneoS.addTorneo(itemToBeUpdated.data);
      //  await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async detalles(torneo_:Torneo){
    console.log('hellow there',torneo_)
    const itemToBeUpdated = await this.ui.showModal(FormPage, { item: torneo_ });
    console.log('le paso el seleccionado',itemToBeUpdated);
    console.log('le paso el id',torneo_.id);
    try {
      if (itemToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.TorneoS.updateTorneo(itemToBeUpdated.data, torneo_.id);

      //  await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.torneop = await this.TorneoS.getTorneos();
      await this.ui.hideLoading();
    } catch (err) {
      this.torneo = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }


  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.torneo.length == 10) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}
