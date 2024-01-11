import { Injectable } from '@angular/core';
import { differenceInMinutes } from 'date-fns';
import { LOCAL_STORAGE_KEY } from 'src/app/constants/local-storage-key.constant';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any { 
    const item = this.storage?.getItem(key);
    if (item) {
      const updatedAt = JSON.parse(item).updatedAt;
      if (key === LOCAL_STORAGE_KEY.websiteContent && updatedAt && 
          (differenceInMinutes(new Date(), new Date(updatedAt)) >= 10)) {
            console.log('resetou localstorage');
            return null;
      }
      return JSON.parse(item);
    } 
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }


}
