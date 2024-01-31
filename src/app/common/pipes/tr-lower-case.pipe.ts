import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trLowerCase',
  standalone: true
})
export class TrLowerCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]) {
    let newValue:string="";
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      if(element=="İ"){
        newValue+="i"
      }else if(element=="I"){
        newValue+="ı"
      }else{
        newValue+=element
      }
    }

  }

}
