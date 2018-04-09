
import { Component,OnInit } from '@angular/core';

import { Employee }    from './employee';
import { EmployeeService } from './employee.service'
import { TeamService } from './team.service'


@Component ({  
   selector: 'PV-app',  
   templateUrl: 'app/views/employees.component.html',
   providers: [EmployeeService,TeamService],
})  
export   class   Employees  { 
  errorMessage: string;
  employees: Employee[] = [] ; 
  employee:Employee;
  data : string;
  submitted : boolean;
  successMessage : string;
  teams: string[] = [];
  selectedTeam: string;
 
  constructor (private employeeService: EmployeeService,private teamService: TeamService) {}
 
  ngOnInit() { console.log("within ngonit");  this.getEmployees(); this.getTeams();  }
 
  getEmployees() {
    this.employee = new Employee('','','','');
    console.log("Before showing employees lenght : "+this.employees.length);
    this.employeeService.getEmployees()
                     .subscribe(
                       employees => this.employees = employees,
                       error =>  this.errorMessage = <any>error);
    console.log("After showing employees lenght : "+this.employees.length);
    
  }

  getTeams() {
    this.teamService.getTeams()
                     .subscribe(
                       teams => this.teams = teams,
                       error =>  this.errorMessage = <any>error);
    this.selectedTeam = null;
    console.log("Teams lenght : "+this.teams.length);
  }

  onSubmit(soeid:string,firstName:string,lastName:string,team:string) {
      if(soeid == "") {
          this.successMessage = 'Please Enter SOEID';
          return;
      }
      if(firstName == ""){
          this.successMessage = 'Please Enter First Name';
          return;
      }
        if(lastName == ""){
          this.successMessage = 'Please Enter Last Name';
          return;
      }
      if(team == "null"){
          this.successMessage = 'Please Enter Team Name';
          return;
      }

      this.employee=new Employee(soeid,firstName,lastName,team);
      this.submitted = true;
      //this.data = JSON.stringify(data, null, 2);
      console.log('submitted the form to add : '+this.employee);
      this.employeeService.create(this.employee)
                     .subscribe(
                       employee  => this.employee = employee,
                       error =>  this.errorMessage = <any>error);

      console.log("Add Successful employee : "+this.employee.firstName);
      if(this.employee.firstName != null || this.employee.firstName != undefined 
            || this.employee.firstName != ""){
        this.successMessage = 'Employee Added Successfully';
        this.employees.unshift(this.employee);
      }
  }
}