import { Pipe, PipeTransform } from '@angular/core';
import { StringService } from 'src/app/common/directives/services/string.service';

@Pipe({
  name: 'chainPipe',
  standalone: true
})
export class ChainPipe implements PipeTransform {

  constructor(
    private _string:StringService
  ){}

  transform(value: any[], filterText:string): any[] {
    if(filterText==""){
      return value;
    }

    return value.filter(p=>{
      const taxAdministration=this._string.trLowerCase(p.taxAdministration).includes(this._string.trLowerCase(filterText));
      const chainCode=p.chainCode.includes(this._string.trLowerCase(filterText));
      return chainCode + taxAdministration;
    })
  }
  

 

}
