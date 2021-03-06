// IMPORTANTS
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// CONFIGS
import { baseConfigs } from './../configs/baseConfigs';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Cordova plugins
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

// SERVICES
import { FireBaseService } from './../providers/firebase-service';

// INTERFACE
import { Boilerplate } from './models/boilerplate';
import { Book } from './models/book';
import { Genre } from './models/genre';
import { Earnings } from './models/earnings';
import { Users } from './models/users';
import { Rented } from './models/rented';
import { LikedBooks } from './models/likedBooks';
import { ComplaintType } from './models/compliantType';
import { Complaints } from './models/complaints';

// PAGES
import { ShowbookPage } from '../pages/showbook/showbook';
import { MybooksPage } from '../pages/mybooks/mybooks';
import { Books4mePage } from '../pages/books4me/books4me';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// PAGE components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UploadProvider } from '../providers/upload';

// Include all imports into ngModule
@NgModule({
  declarations: [
    MyApp,
    ShowbookPage,
    MybooksPage,
    Books4mePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(baseConfigs.firebaseConfig, 'angulafs'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShowbookPage,
    MybooksPage,
    Books4mePage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FireBaseService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    UploadProvider,
  ]
})
export class AppModule {}
