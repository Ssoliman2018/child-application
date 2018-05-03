import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//my imports here
import {AngularFireModule} from 'angularfire2'
import { FIREBASE_CONFIG } from './firebase.credentials';
import * as firebase from "firebase"
import {AngularFireDatabaseModule} from 'angularfire2/database'
import { userProfileService } from '../services/serviceList/user.profile.service';
import { AngularFireAuthModule} from 'angularfire2/auth' ; 
import { Camera} from '@ionic-native/camera'
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) ,
    //my declaration here  
     AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule , 
    AngularFireAuthModule
     

    //edn my declaration   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera ,
    userProfileService , 
    
  ]
})
export class AppModule {}
