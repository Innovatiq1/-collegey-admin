import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  removeNullFields(obj): any {
    for (var key in obj) {
        // Delete null, undefined, "", " "
        // If object call function again
        if (typeof obj[key] === 'object') {
          this.removeNullFields(obj[key]);
      }
        if (obj[key] === null || obj[key] === undefined || obj[key] === "" || obj[key] === " ") {
            delete obj[key];
        }
        // Delete empty object
        // Note : typeof Array is also object
        if (typeof obj[key] === 'object' && Object.keys(obj[key]).length <= 0) {
            delete obj[key];
        }
    }
    return obj;
}
}
