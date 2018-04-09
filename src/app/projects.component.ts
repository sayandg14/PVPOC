
import { Component,OnInit } from '@angular/core';

import { Project }    from './project';
import { Team }    from './team';
import { MonthRelease } from './monthrelease';
import { ProjectService } from './project.service'
import { TeamService } from './team.service'

@Component ({  
   selector: 'PV-app',  
   templateUrl: 'app/views/projects.component.html',
   providers: [ProjectService,TeamService],
})  
export   class   Projects  { 
  errorMessage: string;
  projects: Project[] = [] ; 
  project:Project;
  submitted : boolean;
  successMessage : string;

  selectedMonthRelease: MonthRelease;
  monthReleases = [
     new MonthRelease(0, 'JAN' ),
     new MonthRelease(1, 'FEB' ),
     new MonthRelease(2, 'MAR' ),
     new MonthRelease(3, 'APR' ),
     new MonthRelease(4, 'MAY' ),
     new MonthRelease(5, 'JUN' ),
     new MonthRelease(6, 'JUL' ),
     new MonthRelease(7, 'AUG' ),
     new MonthRelease(8, 'SEP' ),
     new MonthRelease(9, 'OCT' ),
     new MonthRelease(10, 'NOV' ),
     new MonthRelease(11, 'DEC' ),
  ];

  selectedYear: string;
  years: string[] = ['2016','2017','2018','2019','2020']; 
  teams: string[] = [];
  selectedTeam: Team;

  constructor (private projectService: ProjectService,private teamService: TeamService) {}
 
  ngOnInit() { console.log("within ngonit");  this.getProjects(); this.getTeams(); }
 
  getProjects() {
    let date = new Date();
    
    console.log("Year : "+date.getUTCFullYear()+" Month : "+date.getUTCMonth());
    this.selectedMonthRelease = this.monthReleases[date.getUTCMonth()];
    console.log("Month Release : "+this.selectedMonthRelease.monthName);
    
    this.selectedYear = this.years[this.years.indexOf(date.getUTCFullYear().toString())];
    console.log('selectedYear : '+this.selectedYear);

    this.project = new Project('','','','','','','','',false);
    console.log("Before showing projects lenght : "+this.projects.length);
    this.projectService.getProjects()
            .subscribe(
                    projects => this.projects = projects,
                    error =>  this.errorMessage = <any>error);
    console.log("After showing projects lenght : "+this.projects.length);
  }

  getTeams() {
    this.teamService.getTeams()
                     .subscribe(
                       teams => this.teams = teams,
                       error =>  this.errorMessage = <any>error);
    this.selectedTeam = null;
    console.log("Teams lenght : "+this.teams.length);
  }  

  onSubmit(pNumber:string,oppm:string,desc:string,releaseMonth:string,releaseYear:string,hours:string,assigned:string,
                                                                                        team:string) {

      if(oppm == "") {
          this.successMessage = 'Please Enter OPPM';
          return;
      }
      if(pNumber == ""){
          this.successMessage = 'Please Enter P# Number';
          return;
      }
      if(desc == ""){
          this.successMessage = 'Please Enter Description';
          return;
      }
      
      
      if(hours == ""){
          this.successMessage = 'Please Enter Project Hour';
          return;
      }
        
      if(isNaN(Number(hours))){
          this.successMessage = 'Please Enter Valid Project Hour';
          return;
      }
      if(team == "null"){
          this.successMessage = 'Please Enter Team Name';
          return;
      }

      let monthRelease = this.monthReleases[releaseMonth].monthId;
      let yearRelease = releaseYear;
      console.log("release : "+monthRelease+" yearRelease : "+yearRelease);
      this.project=new Project(pNumber,oppm,desc,monthRelease,yearRelease,assigned,hours,team,false);
      this.submitted = true;
      //this.data = JSON.stringify(data, null, 2);
      console.log('submitted the form to add : '+this.project);
      this.projectService.create(this.project)
                     .subscribe(
                       project  => this.project = project,
                       error =>  this.errorMessage = <any>error);

      console.log("Add Successful project : "+this.project.projectDesc);
      if(this.project.projectDesc != null || this.project.projectDesc != undefined 
            || this.project.projectDesc != ""){
        this.successMessage = 'Project Added Successfully';
        this.projects.unshift(this.project);
      }
  }
}