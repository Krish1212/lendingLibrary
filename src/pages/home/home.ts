import { Book } from './../../app/models/book';
import { Component } from '@angular/core';
import { NavController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { FireBaseService } from './../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadProvider } from '../../providers/upload';
import { Upload } from '../../app/models/upload';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: Book[];
  book: Book = {
    title:'',
    author:'',
    pages:''
  };
  selectedFiles: FileList;
  currentUpload = {} as Upload;
  loading:Loading;
  lat:any;
  lng:any;
  
  constructor(public navCtrl: NavController, 
    public fireService:FireBaseService, 
    public geolocation: Geolocation,
    public camera: Camera,
    public loadingCtrl:LoadingController, 
    public toastCtrl: ToastController, 
    public upSvc: UploadProvider) {
    // load book collection from firestore
    this.fireService.getBooks().subscribe(books => {
      this.books = books;
    });

  }

  ionViewDidLoad(){
    this.geolocation.getCurrentPosition().then((pos) => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
   }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  saveBook(){
    if(this.book.title){
      this.fireService.addBook(this.book);
      this.book.title = '';
      this.book.author = '';
      this.book.pages = '';
    }
  }

  deleteBook(ev, book){
    if(book){
      this.fireService.deleteBook(book);
      this.book.title = '';
      this.book.author = '';
      this.book.pages = '';
    }
  }

  editBook(book){
    this.book = book;
  }

  updateBook(){
    if(this.book){
      this.fireService.updateBook(this.book);
    }
  }
  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }
  uploadFile() {
    this.loading = this.loadingCtrl.create({
      spinner:'bubbles',
      content:`Uploading...Please wait`,
    });
    this.currentUpload.file = this.selectedFiles[0];
    console.log(this.currentUpload.file);
    let filePath = 'user_pic';
    this.upSvc.uploadFile(filePath,this.currentUpload).subscribe((success) => {
      this.loading.dismiss().then(() => {
        console.log(this.currentUpload.progress);
      });
    }, (failure) => {
      console.log(failure);
    });
    this.loading.present();
  }
  /* async takePhoto(){
    try{
      //Define the camera options
      const options: CameraOptions = {
        quality: 50,
        targetHeight:600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true
      }
  
      //capture the picture
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('user_pic/profile');
      pictures.putString(image,'data_url');
    }
    catch(e){
      console.error(e);
    }
  } */

}
