import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDetailsComponent } from './Components/business-details/business-details.component';
import { DirectorDetailsComponent } from './Components/director-details/director-details.component';
import { WardsAndShiftsComponent } from './Components/wards-and-shifts/wards-and-shifts.component';
import { WardComponent } from './Components/ward/ward.component';
import { EmployeesDetailsComponent } from './Components/employees-details/employees-details.component';
import { LogINComponent } from './Components/log-in/log-in.component';
import { IntegrationsComponent } from './Components/integrations/integrations.component';
import { FinalIntegrationComponent } from './Components/final-integration/final-integration.component';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
import { ConstraintsComponent } from './Components/constraints/constraints.component';
import { HomeComponent } from './Components/home/home.component';
import { RolesComponent } from './Components/roles/roles.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { EmployeesRole } from './Classes/EmployeesRole';


const routes: Routes = [
  { path: 'director-details', component: DirectorDetailsComponent },
  { path: 'business-details', component: BusinessDetailsComponent },
  { path: 'wards-shifts', component: WardsAndShiftsComponent },
  { path: 'ward', component: WardComponent },
  { path: 'log-in', component: LogINComponent },
  { path: 'integration', component: IntegrationsComponent },
  {path:'final-integration', component:FinalIntegrationComponent},
  {path:'employees-list', component:EmployeesListComponent},
  {path:'constraints', component:ConstraintsComponent},
  {path:'home',component:HomeComponent},
  {path:'roles', component:RolesComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'add-edit-employee/:flag', component:EmployeesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
