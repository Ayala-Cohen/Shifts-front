import { Injectable } from '@angular/core';
import { Shift } from '../Classes/Shift';
import { Ward } from '../Classes/Ward';

@Injectable({
  providedIn: 'root'
})
export class WardService {
  num_wards: number
  num_shifts: number 
  list_wards: Array<Ward> = new Array<Ward>()
  list_shifts: Array<Shift> = new Array<Shift>()

  constructor() { }
  init_list(str: string) {
    let difference;
    debugger
    if (str == "ward") {
      difference = this.num_wards - this.list_wards.length
      for (let i = 0; i < difference; i++)
        this.list_wards.push(new Ward("",0,new Array<string>()))
    }
    else {
      if (str == "shift") {
        difference = this.num_shifts - this.list_shifts.length
        for (let i = 0; i < difference; i++)
          this.list_shifts.push("")
      }
    }
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
