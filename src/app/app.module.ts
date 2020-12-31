import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegrationsComponent } from './Components/integrations/integrations.component';
import { EmployeesDetailsComponent } from './Components/employees-details/employees-details.component';
import { WardComponent } from './Components/ward/ward.component';
import { ChangeColorDirective } from './Directives/change-color.directive';
import { DirectorDetailsComponent } from './Components/director-details/director-details.component';
import { BusinessDetailsComponent } from './Components/business-details/business-details.component';
import { WardsAndShiftsComponent } from './Components/wards-and-shifts/wards-and-shifts.component';
import { NavComponent } from './Components/nav/nav.component';
import { LogINComponent } from './Components/log-in/log-in.component';
import { FinalIntegrationComponent } from './Components/final-integration/final-integration.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
import { ConstraintsComponent } from './Components/constraints/constraints.component';
import { IntegrationService } from './Services/integration.service';
import { WardService } from './Services/ward.service';

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
    ConstraintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [IntegrationService,
    WardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
