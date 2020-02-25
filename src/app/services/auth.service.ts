import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
}) 
export class AuthService {

  private user: User;

  constructor(private local: NativeStorage, private google: GooglePlus, private router:Router) { }

  public async  checkSession(): Promise<void> {
    if (!this.user) {
      try {
        this.user = await this.local.getItem('user');
      } catch (err) {
        this.user = null;
      }
    }
  }

  public isAuthenticated(): boolean {
    return this.user ? true : false;
  }
  /**
   * Almacena el usuario en local con el nombre 'user'
   * @param user el usuario a almacenar y en caso de omision eliminara el usuario
  */

  public async saveSession(user?:User){
      if(user){
       await this.local.setItem('user',user);
      }else{
       await this.local.remove('user');
      }
  }

  public loginGoogle():Promise<boolean> {
    return new Promise((resolve, reject)=>{
      this.google.login({}).then(d => {
        if (d && d.email) {
          let user: User = {
            email: d.email,
            displayName: d.displayName,
            imageUrl: d.imageUrl,
            userId: d.userId
          }
          this.user=user;
          this.saveSession(user);
          resolve(true);
        }else{
          resolve(false);
        }
      }).catch(
        err => {resolve(false);}
      )
    });
    
  }

  public async logout(){
    await this.google.logout();
    this.user=null;
    await this.saveSession();
    this.router.navigate(['login']);
  }
}
