import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    constructor(private datePipe: DatePipe) { }

    transform(value: string, format?: string): any {
        if (value) {
            const newVal = value + 'Z';
            const date = new Date(newVal)
            return this.datePipe.transform(date, format ? format : 'medium')
        }
        return value;
    }

}
