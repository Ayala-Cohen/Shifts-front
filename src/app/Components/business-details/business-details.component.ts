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
    this.business_service.formData.append('Logo', this.fileToUpload, this.fileToUpload.name);
  }

  next() {
    this.employees_service.is_director = true
    this.business_service.Add().subscribe(data => {
      if (data) {
        this.business_service.list_business = data
        this.business_service.business = data.filter(x => x.number == this.business_service.business.number)[0]
        this.business_service.saveLogo().subscribe(logo => {
          if (logo) {
            this.business_service.business.logo = logo
            this.business_service.Update().subscribe(b => {
              if (b) {
                this.business_service.list_business = b
                this.business_service.business = b.filter(x => x.number == this.business_service.business.number)[0]
              }
            })
          }
        })
      }

    }, err => alert("כשל בגישה לשרת"))
    this.router.navigate(['roles'])
  }

}
