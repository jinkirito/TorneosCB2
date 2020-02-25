import { Injectable } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isLoading: any;
  latp: number;
  longp: number;

  constructor(
    public modal: ModalController,
    private loading: LoadingController,
    private toast: ToastController
  ) {}

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props  //{item:{}}
    });
    await modal.present();
    return await modal.onWillDismiss();
  }


  public async closeModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props  //{item:{}}
    });
    await modal.dismiss();
    return await modal.onWillDismiss();
  }

  public async showLoading() {
    if (this.isLoading) {
      this.loading.dismiss();
    }
    this.isLoading = await this.loading.create({
    });
    await this.isLoading.present();
  }

  public async hideLoading() {
    await this.loading.dismiss();
    this.isLoading = null;
  }
  public async showToast(msg: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:'danger'
    });
    await _toast.present();
  }

  public setlatp(lat:number){
    this.latp=lat;
  }

  public setlongp(long:number){
    this.longp=long;
  }

  public getLatp(){
    return this.latp;
  }

  public getLongp(){
    return this.longp;
  }
}