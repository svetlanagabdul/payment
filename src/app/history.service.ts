import { Injectable } from '@angular/core';
import { TransferInterface } from './history/model';

const KEY_NAME = 'HISTORY_DATA';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private storage;
  private storedData!: TransferInterface[];
  
  constructor() { 
    if (localStorage) {
      this.storage = localStorage;
    }
  }
  getData(): TransferInterface[] {
    if (!this.storedData) {
      this.storedData = this.loadData();
    }
    return this.storedData;
  }
  setData(data: TransferInterface) {
    this.saveData(data);
  }
  private saveData(data: TransferInterface) {
    if (this.storage != null) {
      this.storedData = this.storedData ? [data, ...this.storedData] : [data];
      localStorage.setItem(KEY_NAME, JSON.stringify(this.storedData));
    }
  }
  private loadData(): any {
    if (this.storage == null) {
      return null;
    }
    const data = this.storage.getItem(KEY_NAME);
    if (data == null) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
