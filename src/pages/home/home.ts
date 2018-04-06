import { Book } from './../../app/models/book';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FireBaseService } from './../../providers/firebase-service';

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

  constructor(public navCtrl: NavController, public fireService:FireBaseService) {
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

}
