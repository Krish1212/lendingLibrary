import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShowbookPage } from '../showbook/showbook';

@Component({
  selector: 'page-mybooks',
  templateUrl: 'mybooks.html',
})
export class MybooksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybooksPage');
  }
  openbook(){
    this.navCtrl.push(ShowbookPage); 
   }
 
}
