import { Injectable } from '@angular/core';

declare var require:any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypto(value:string):string{
    var CryptoTS = require("crypto-ts");
    return CryptoTS.AES.encrypt(value,'secret key 123');
  }

  decrypto(value:string):string{
    try {
      var CryptoTS = require("crypto-ts");
      var bytes = CryptoTS.AES.decrypt(value, 'secret key 123');
      return bytes.toString(CryptoTS.enc.Utf8);
  } catch (error) {
      console.error("Şifre çözme işlemi sırasında bir hata oluştu:", error);
      return null; // veya isteğinize göre bir değer döndürebilirsiniz
  }
   
  }
}
