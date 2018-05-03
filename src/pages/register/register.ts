import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/users/user.module';

import {AngularFireAuth} from 'angularfire2/auth'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User ; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams , 
  private afAuth : AngularFireAuth ,
  private toast : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
 async Register(user : User){
  
     this.afAuth.auth.createUserWithEmailAndPassword(user.email ,  user.password).then(result =>{
      console.log(result);

      this.navCtrl.setRoot('MainPage');
    })

   .catch (err => {
    console.error('Error Here!');
    this.toast.create({
      message : `Password has to be more than 6 Characters ` ,
      duration : 3000
    }).present();
   })
  }

}
