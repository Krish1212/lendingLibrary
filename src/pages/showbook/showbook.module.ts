import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowbookPage } from './showbook';

@NgModule({
  declarations: [
    ShowbookPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowbookPage),
  ],
})
export class ShowbookPageModule {}
