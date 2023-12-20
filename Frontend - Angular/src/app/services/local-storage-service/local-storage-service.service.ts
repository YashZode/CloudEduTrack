import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor() { }
  getUserId(): any {
    const item = localStorage.getItem("userId");
    return item ? JSON.parse(item) : null;
  }

  setUserId(value: any): void {
    localStorage.setItem("userId", value);
  }
}
