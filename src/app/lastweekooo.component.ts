
import { Component,OnInit } from '@angular/core';

import { Employee }    from './employee';
import { LastWeekOOODTO }    from './lastWeekOOODTO';
import { EmployeeService } from './employee.service'
import { LastWeekOOOService } from './lastweekooo.service'
import { TeamService } from './team.service'


@Component ({  
   selector: 'PV-app',  
   templateUrl: 'app/views/lastweekooo.component.html',
   providers: [LastWeekOOOService,TeamService],
})  
export   class   LastWeekOOO  { 
  isSuccess:Boolean = true;
  teams: string[] = [];
  errorMessage: string;
  lastWeekOOODTOs:LastWeekOOODTO[] = [];

  constructor (private teamService: TeamService,private lastWeekOOOService: LastWeekOOOService) {}
 
  ngOnInit() { console.log("within ngonit"); this.getTeams(); this.getLastWeekOOOData();  }
 
  getLastWeekOOOData() {
    
    this.lastWeekOOOService.getLastWeekOOOData()
                     .subscribe(
                       lastWeekOOODTOs => this.lastWeekOOODTOs = lastWeekOOODTOs,
                       error =>  this.errorMessage = <any>error);
  }

  save() {
    console.log("Teams lenght : "+this.lastWeekOOODTOs.length);
    this.lastWeekOOOService.create(this.lastWeekOOODTOs)
                     .subscribe(
                       isSuccess  => this.isSuccess = isSuccess,
                       error =>  this.errorMessage = <any>error);
  }
  
  getTeams() {
    this.teamService.getTeams()
                     .subscribe(
                       teams => this.teams = teams,
                       error =>  this.errorMessage = <any>error);
    
    console.log("Teams lenght : "+this.teams.length);
  }
}