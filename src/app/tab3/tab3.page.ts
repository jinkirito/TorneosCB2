import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
//import { userInfo } from 'os';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../model/User';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 private img:any;
 private nombre:any;
private email:any;
user:User;
Base64:String;
URL:String;
  constructor(private Au:AuthService, private local: NativeStorage, private ui:UiService) {}

  ngOnInit(): void {
    this.loaddatauser();
    
  }

  async loaddatauser(){
    await this.ui.showLoading();
    try{
    this.user= await this.local.getItem('user');
    this.nombre=this.user.displayName;
    this.email=this.user.email;
    this.img=this.user.imageUrl;
    }catch(err){
    console.log(err);
    }
    await this.ui.hideLoading();
  }

  geturl(){
    return this.img;
  }
  
  
}
