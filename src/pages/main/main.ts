import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';

/*
*
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  resultAuth ;
  childrenRes;
  constructor(public navCtrl: NavController, public db : AngularFireDatabase, public navParams: NavParams ,  private afAuth : AngularFireAuth , private toast : ToastController) {
  }

  ionViewDidLoad() {
    var result='';
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.toast.create({
          message : `Welcome to Dnaaya , ${data.email} ` ,
          duration : 3000
        }).present();
       // this.resultRec(4)
  
  
        this.resultAuth = this.db.database.ref(`/parents/`+ data.uid + '/childrens/')
        this.resultAuth.on('value' , res =>{
         var arr = res.val()
         this.childrenRes = Object.keys(arr).map((k) => arr[k]);
        //  this.childPic = storage().ref(`pictures/ ${} /` + "image1");
        console.log(this.childrenRes)
       //  console.log(Object.keys(arr))
         var keyID =Object.keys(res.val())
         keyID.forEach(value =>{
           //console.log(value)
           
         })
  
       })
  
      //console.log(resultValue)
  
        //console.log(data.uid)
       /*//(MaboTaleb) 
       this.resultAuth = this.db.database.ref(`/parents/`+ data.uid + '/childrens/'+'/-L903u7eCrelsT1tiDUr/')
        this.resultAuth.on('value',function(snapshot){
          var newpost = snapshot.val()
          console.log(newpost['age'])
        })*/
  
  
  
      }
      else {
        this.toast.create({
          message : `could not find the authentication Details ` ,
          duration : 3000
        }).present();
        this.navCtrl.push("LoginPage");
      }
    });
  }
}
