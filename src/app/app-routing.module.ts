import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDetailsComponent } from './Components/business-details/business-details.component';
import { DirectorDetailsComponent } from './Components/director-details/director-details.component';
import { WardsAndShiftsComponent } from './Components/wards-and-shifts/wards-and-shifts.component';


const routes: Routes = [
  {path:'director-details', component: DirectorDetailsComponent},
  {path:'business-details',component: BusinessDetailsComponent},
  {path:'wards-shifts', component:WardsAndShiftsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
