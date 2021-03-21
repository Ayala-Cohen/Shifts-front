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
  saveFile(files: FileList) {
    this.fileToUpload = files.item(0);
    let reader = new FileReader();
    reader.readAsArrayBuffer(this.fileToUpload)
    this.business_service.business.logo = reader.result as ArrayBuffer
    // this.business_service.formData.append('businessLogo', this.fileToUpload, this.fileToUpload.name);
  }

  next() {
    this.employees_service.is_director = true
    this.business_service.Add().subscribe(data => { this.business_service.business = data.filter(x => x.number == this.business_service.business.number)[0] }, err => alert("כשל בגישה לשרת"))
    this.router.navigate(['roles'])
  }

}
