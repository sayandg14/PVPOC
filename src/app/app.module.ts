import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import { PlanViewWeekly } from './planViewWeekly.component'
import { ProjectAssignment } from './projectassignment.component' 
import { Projects } from './projects.component' 
import { Employees } from './employees.component'
import { Employee } from './employee'
import { LastWeekOOO } from './lastweekooo.component'
import { RouterModule, Routes } from '@angular/router'; 
import { HttpModule, JsonpModule } from '@angular/http';
import { ModalModule} from 'ng2-modal';

const appRoutes: Routes = [ 
   { path: 'planViewWeekly', component: PlanViewWeekly },  
   { path: 'projectAssignment', component: ProjectAssignment }, 
   { path: 'projects', component: Projects }, 
   { path: 'employees', component: Employees },
   { path: 'lastWeekOOO', component: LastWeekOOO },
];  

@NgModule({ 
   imports: [ BrowserModule, FormsModule, HttpModule,ModalModule,
   RouterModule.forRoot(appRoutes)], 
   declarations: [ AppComponent,PlanViewWeekly,ProjectAssignment,Projects,Employees,LastWeekOOO], 
   bootstrap: [ AppComponent ] 
}) 
export class AppModule { } 