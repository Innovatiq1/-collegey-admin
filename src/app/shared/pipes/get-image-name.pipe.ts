import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'imageName'
})
export class GetImageName implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if(value) {
            return value.split('-').splice(1).join('');
        }
    }

}