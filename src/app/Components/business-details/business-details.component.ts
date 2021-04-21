import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private router: Router, private business_service: BusinessService, private employees_service: EmployeesService) { }
  ngOnInit() {
  }

  async saveFile(files: FileList) {
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    reader.readAsArrayBuffer(this.fileToUpload)
    await this.business_service.delay(300);
    let res = reader.result as ArrayBuffer
    let bytes = new Uint8Array(res);
    let arrayBytes = Array.from(bytes)
    this.business_service.business.logo = arrayBytes
  }

  next() {
    this.employees_service.is_director = true
    this.business_service.Add().subscribe(data => {
      if (data)
        this.business_service.business = data.filter(x => x.number == this.business_service.business.number)[0]
    }, err => alert("כשל בגישה לשרת"))
    this.router.navigate(['roles'])
  }

}
