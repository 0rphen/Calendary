import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PValidatorsService {

  constructor() { }

  overTime(timeFrom: string, timeTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const timeFormControl = control.get(timeFrom);
      const timeToControl = control.get(timeTo);
      return (timeToControl?.value > timeFormControl?.value) ?
        null : { rightTime: true };
    };
  }
}
