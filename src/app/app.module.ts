import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IntegrationsComponent } from './Components/integrations/integrations.component';
import { EmployeesDetailsComponent } from './Components/employees-details/employees-details.component';
import { WardComponent } from './Components/ward/ward.component';
import { DirectorDetailsComponent } from './Components/director-details/director-details.component';
import { BusinessDetailsComponent } from './Components/business-details/business-details.component';
import { WardsAndShiftsComponent } from './Components/wards-and-shifts/wards-and-shifts.component';
import { NavComponent } from './Components/nav/nav.component';
import { LogINComponent } from './Components/log-in/log-in.component';
import { FinalIntegrationComponent } from './Components/final-integration/final-integration.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
import { ConstraintsComponent } from './Components/constraints/constraints.component';
import { HomeComponent } from './Components/home/home.component';

import { WardService } from './Services/ward.service';
import { IntegrationService } from './Services/integration.service';
import { BusinessService } from './Services/business.service';
import { ShiftsEmployeesService } from './Services/shifts-employees.service';
import { ShiftsService } from './Services/shifts.service';
import { ConstraintsService } from './Services/constraints.service';
import { EmployeesRoleService } from './Services/employees-role.service';
import { EmployeesService } from './Services/employees.service';

import { ChangeColorDirective } from './Directives/change-color.directive';
import {ShowPasswordDirective} from './Directives/show-password.directive'
import { HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './Components/roles/roles.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    AppComponent,
    IntegrationsComponent,
    EmployeesDetailsComponent,
    WardComponent,
    ChangeColorDirective,
    DirectorDetailsComponent,
    BusinessDetailsComponent,
    WardsAndShiftsComponent,
    NavComponent,
    LogINComponent,
    FinalIntegrationComponent,
    EmployeeComponent,
    EmployeesListComponent,
    ConstraintsComponent,
    HomeComponent,
    ShowPasswordDirective,
    RolesComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    IntegrationService,
    WardService,
    BusinessService,
    ShiftsEmployeesService,
    ShiftsService,
    ConstraintsService,
    EmployeesRoleService,
    EmployeesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
