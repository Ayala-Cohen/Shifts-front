import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  list_tasks: Array<string> = new Array<string>();

  constructor(private router: Router, private ward_service: WardService) { }

  ngOnInit(): void {
  }
  next() {
    this.router.navigate(['employees-details'])
  }
  init_list(index: number) {
    let ward = this.ward_service.list_wards[index]
    let difference = ward.num_tasks - ward.list_tasks.length
    debugger
    for (let i = 0; i < difference; i++)
      ward.list_tasks.push("")
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
