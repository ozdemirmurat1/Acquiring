import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenFormatService {

  constructor() { }

  isTokenFormat(data: any): boolean {
    // Token formatının örnek bir regex ile kontrol edilmesi
    const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    return tokenRegex.test(data);
  }
  
}
