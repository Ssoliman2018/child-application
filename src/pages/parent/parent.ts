import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/users/user.module';
//import { userProfileService } from '../../services/serviceList/user.profile.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Children } from '../../models/users/children.module';
import { userProfileService } from '../../services/serviceList/user.profile.service';
/**
 * Generated class for the ParentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent',
  templateUrl: 'parent.html',
})
export class ParentPage {
  user : User = {
    name : '' ,
    email : '' , 
    age : undefined ,
    phone : '' , 
    address : '' ,
    gender : '' ,
    medicalEX : '' , 
    medicalEXDesc : '' ,
    password : ''
  }

  childDB : Observable<Children[]>
  childrens = [] ;
  parentProfile; 
  parentRes;
    constructor(public navCtrl: NavController, 
    public navParams: NavParams , 
   /*  private userProfileService : userProfileService ,  */
    private toast : ToastController , 
    private afAuth : AngularFireAuth , 
    private db : AngularFireDatabase , 
    private profile  : userProfileService 
  ) 
  {
  }

  ionViewDidLoad() {
      
  this.afAuth.authState.subscribe(data => {
    if(data.email && data.uid){
      this.toast.create({
        message : `Welcome to Dnaaya , ${data.email} ` ,
        duration : 3000
      }).present(); 
      this.parentProfile = this.db.database.ref(`/parents/`+ data.uid + '/')
      this.parentProfile.on('value' , res =>{
        var arr = res.val()
        this.parentRes = arr;

        
        this.user.name = arr['name']
        this.user.email = arr['email']
        this.user.age = arr['age']
        this.user.phone = arr['phone']
        this.user.address = arr['address']
        this.user.gender = arr['gender']
        this.user.medicalEX = arr['medicalEx']
        this.user.medicalEXDesc = arr['medicalEXDesc']

       console.log(arr)


   })

    }
    else {
      this.toast.create({
        message : `could not find the authentication Details ` ,
        duration : 3000
      }).present();
      this.navCtrl.push("LoginPage");
    }
  });
    console.log('ionViewDidLoad ParentPage');
  }

  saveData(parent){
this.afAuth.authState.subscribe(data => {
console.log(this.profile.uid);
   if(data.email && data.uid){
    const result = this.db.database.ref('parents/' + data.uid).set(this.user) 
    result.then((parentData)=>{
      this.db.database.ref(`/parents/`+ data.uid).on('value' , res =>{
        var arr = res.val()
        console.log(arr)


   })
    });
    console.log(this.user.key)
    
    return result ;
  } 
})



    /* this.userProfileService.addItem(user).then(ref => {
  console.log(ref.key + "user added !!")
}) */
  }

}
