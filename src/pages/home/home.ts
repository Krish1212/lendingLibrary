import { Book } from './../../app/models/book';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FireBaseService } from './../../providers/firebase-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public transfer: FileTransfer, 
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
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let filename = this.imageURI.split('/').pop();
    let options: FileUploadOptions = {
      fileKey: 'profile',
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'gs://lendinglibrary-78813.appspot.com/files/user_pic/', options).then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "gs://lendinglibrary-78813.appspot.com/files/user_pic/" + options.fileName + ".jpg";
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
