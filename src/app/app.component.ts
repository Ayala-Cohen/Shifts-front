import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Business } from './Classes/Business';
import { BusinessService } from './Services/business.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ShiftsClientSide';
  constructor(private router: Router, private business_service: BusinessService, private sanitizer: DomSanitizer) {
    business_service.GetAll().subscribe(data => this.business_service.list_business = data)
    this.router.navigate(['home'])
  }

  sanitize(business: Business) { 
    return this.sanitizer.bypassSecurityTrustUrl(business.logo.toString())
  }
}
