import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { storage , initializeApp ,} from 'firebase'
import { FIREBASE_CONFIG } from '../../app/firebase.credentials';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatePipe } from '@angular/common'
import { Children } from '../../models/users/children.module';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-child',
  templateUrl: 'child.html',
})
export class ChildPage {
  
  children : Children = {
    name : '' , 
    age : undefined , 
    gender : '' , 
    allergy : 'true' , 
    allergyInformation : '' , 
    Illness : 'true' , 
    IllnessInformation : '' , 
    note : '' ,  
    image : ''
  }
 

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    private camera : Camera ,
    private toast : ToastController ,
    private afAuth : AngularFireAuth ,
    private db : AngularFireDatabase
  //  private dateNow : Date ,

   // private imagePicker: ImagePicker
  ) 
  {
      //initializeApp(FIREBASE_CONFIG)
  }
  async takePhoto(){
     var today = Date.toString() ;
     console.log(today);
  /* var dateNowMilliseconds = this.dateNow.getTime();
    console.log(dateNowMilliseconds); */
    const currentUserId = this.afAuth.auth.currentUser.uid;

    console.log(currentUserId);
    //const pictures = storage().ref('pictures');
    //console.log(pictures);
    
    try{
      const options : CameraOptions = {
        quality : 50 , 
        targetHeight : 600 , 
        targetWidth : 600 , 
        destinationType : this.camera.DestinationType.DATA_URL , 
        encodingType : this.camera.EncodingType.JPEG , 
        mediaType : this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg ;base64, ${result}`;
      const pictures = storage().ref(`pictures/ ${currentUserId} /` + "image1");
      console.log("folder maker")
      
      pictures.putString(image , 'data_url');
      console.log("End Function")

    }
    catch (e){
      this.toast.create({
        message : `could not find the authentication Details ` ,
        duration : 3000
      }).present();
      console.error(e) ; 
    }
     
  }

  /* takeImage(){
    const options : ImagePickerOptions = {} ;
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildPage');
  }

  hideME  ;
  allergyToggle  ;

  hide() {
    
    if(this.allergyToggle = true){
      this.hideME = false ; 

    }
    else {
      this.hideME = false ; 
    }
  }

  addChild(children){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        const result = this.db.database.ref('parents/' + data.uid + '/childrens').push(this.children) ;
        return result ;
      }
    })

  }

}
