import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  protected getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data != null) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return null;
  }

  protected setItem(key: string, data: object | string) {
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
      return;
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  protected remove(key: string) {
    localStorage.removeItem(key);
  }

  protected clear() {
    localStorage.clear();
  }
}
