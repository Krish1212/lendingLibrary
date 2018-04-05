import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShowbookPage } from '../showbook/showbook';

@Component({
  selector: 'page-books4me',
  templateUrl: 'books4me.html',
})
export class Books4mePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Books4mePage');
  }

  openbook(){
   this.navCtrl.push(ShowbookPage); 
  }

}
