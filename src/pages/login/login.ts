import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { User } from '../../models/users/user.module';
import { AngularFireAuth } from 'angularfire2/auth'
import { auth } from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User ;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams , 
    private afAuth : AngularFireAuth,
    private toast : ToastController   ) 
    {  }
  async login(){
    
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email , this.user.password).then(result =>{
        console.log(result);

        this.navCtrl.setRoot('MainPage');
      })
      /* if(result){
        
        console.log(result);
      }
      else {
      this.navCtrl.setRoot('LoginPage');
        
      } */
    
    .catch(err => {
      
      console.log(err);
      this.toast.create({
        message : `Username or Password Invalid ` ,
        duration : 3000
      }).present();
      //this.navCtrl.push('LoginPage');
    
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.user.email = "" ;
    this.user.password = "" 
  }

}
