import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Book } from './../app/models/book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FireBaseService {
    booksCollection: AngularFirestoreCollection<Book>;
    books: Observable<Book[]>;
    bookDoc: AngularFirestoreDocument<Book>;

    constructor(public afs: AngularFirestore) {
        // grab book collection, orderBy title
        this.booksCollection = this.afs.collection('books', ref => ref.orderBy('title', 'asc'));
        // grab books list
        this.books = this.booksCollection.snapshotChanges().map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Book;
                data.id = a.payload.doc.id;
                return data;
            });
        });
        console.log(this.afs.collection.length);
    }

    getBooks() {
        return this.books;
    }

    addBook(book: Book) {
        this.booksCollection.add(book);
    }

    updateBook(book: Book){
        this.bookDoc = this.afs.doc('books/${book.id}');
        this.bookDoc.update(book);
    }

    deleteBook(book: Book) {
        if(book.id){
            this.bookDoc = this.afs.doc(`books/${book.id}`);
            this.bookDoc.delete();
        }
    }

    deleteBookByID(id) {
        if(id){
            this.bookDoc = this.afs.doc('books/${id}');
            this.bookDoc.delete();
        }
    }

}