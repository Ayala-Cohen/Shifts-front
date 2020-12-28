import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDetailsComponent } from './Components/business-details/business-details.component';
import { DirectorDetailsComponent } from './Components/director-details/director-details.component';
import { WardsAndShiftsComponent } from './Components/wards-and-shifts/wards-and-shifts.component';
import { WardComponent } from './Components/ward/ward.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { LogINComponent } from './Components/log-in/log-in.component';
import { IntegrationsComponent } from './Components/integrations/integrations.component';


const routes: Routes = [
  { path: 'director-details', component: DirectorDetailsComponent },
  { path: 'business-details', component: BusinessDetailsComponent },
  { path: 'wards-shifts', component: WardsAndShiftsComponent },
  { path: 'ward', component: WardComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'log-in', component: LogINComponent },
  { path: 'integration', component: IntegrationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
