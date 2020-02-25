import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globalization } from '@ionic-native/globalization/ngx';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {HttpClientModule} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { FormPage } from './form/form.page';
import { PhotoService } from './services/photo.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { TorneoService } from './services/torneo.service';
import { UiService } from './services/ui.service';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,"./assets/i18n/",".json");
}

@NgModule({
  declarations: [AppComponent, FormPage],
  entryComponents: [FormPage],
  imports: [
    HttpClientModule,
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     TranslateModule.forRoot({
       loader:{provide:TranslateLoader,
       useFactory:(HttpLoaderFactory),
       deps:[HttpClient]
       }
     }),
     AngularFireModule.initializeApp(environment.FirebaseConfig),
     AngularFirestoreModule,
     FormsModule
    ],
  providers: [
    GooglePlus,
    NativeStorage,
    AuthGuardService,
    AuthService,
    TranslateService,
    HttpClient,
    Globalization,
    StatusBar,
    SplashScreen,
    Geolocation,
   // GoogleMaps,
    PhotoService,
    TorneoService,
    UiService,
    Camera,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
