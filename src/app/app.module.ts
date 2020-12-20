import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegrationsComponent } from './Components/integrations/integrations.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { WardComponent } from './Components/ward/ward.component';

@NgModule({
  declarations: [
    AppComponent,
    IntegrationsComponent,
    EmployeeComponent,
    WardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
