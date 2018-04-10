import { Book } from './../../app/models/book';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FireBaseService } from './../../providers/firebase-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase/storage';

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
  imageURI:any;
  imageFileName:any;
  
  constructor(public navCtrl: NavController, 
    public fireService:FireBaseService, 
    public camera: Camera,
    public loadingCtrl:LoadingController, 
    public toastCtrl: ToastController) {
    // load book collection from firestore
    this.fireService.getBooks().subscribe(books => {
      this.books = books;
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

  async takePhoto(){
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

      const pictures = storage.ref('user_pic/profile');
      pictures.putString(image,'data_url');
    }
    catch(e){
      console.error(e);
    }
  }

}
