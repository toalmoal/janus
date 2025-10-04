import { Injectable }       from '@angular/core';

import * as _               from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor() {
  }

  public set(key: string, data: any): void {
    console.log('set', key);
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get(key: string): any {
    const value = localStorage.getItem(key);
    if (!_.isNil(value)) {
      return JSON.parse(value!);
    } else {
      return value;
    }
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

};
