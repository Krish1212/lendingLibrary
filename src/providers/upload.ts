import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

import { Upload } from '../app/models/upload';

@Injectable()
export class UploadProvider {

  basePath:string = 'user_pic';
  constructor(public storage: AngularFireStorage) {
  }

  uploadFile(folder:string,upload:Upload){
    return Observable.create(observer => {
      console.log(folder);
      const task = this.storage.ref(`${folder}/${upload.file.name}_${upload.createdAt}`);
      task.put(upload.file).then(success => {
        upload.progress = (success.bytesTransferred / success.totalBytes) * 100;
        upload.url = success.downloadURL;
        upload.name = upload.file.name;
        observer.next(success);
      }).catch(failure => {
        observer.error(failure);
      });
    });
  }

}
