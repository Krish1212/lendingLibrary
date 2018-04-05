import { Component } from '@angular/core';

import { MybooksPage } from '../mybooks/mybooks';
import { Books4mePage } from '../books4me/books4me';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MybooksPage;
  tab3Root = Books4mePage;

  constructor() {

  }
}
