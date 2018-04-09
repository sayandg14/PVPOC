import { Component } from '@angular/core';  
import { PlanViewWeeklyService } from './planViewWeekly.service';
import { TeamService } from './team.service'
import { EmployeeService } from './employee.service'
import { Employee } from './employee';
import { Project } from './project';
import { Team }    from './team';
import { PlanViewWeeklyDTO } from './planViewWeeklyDTO';



@Component ({  
   selector: 'PV-app',  
   templateUrl: 'app/views/planViewWeekly.component.html',
   providers: [PlanViewWeeklyService,TeamService,EmployeeService] ,
})  
export   class   PlanViewWeekly  {
    
    isSuccess:Boolean = true;    
    isShowResult:boolean = false;
    weekEnds:string[] = [];
    errorMessage: string;
    teams: string[] = [];
    employees: Employee[] = [];
    selectedTeam: Team;
    selectedWeekEnd:string;
    weekAssignments:PlanViewWeeklyDTO[][] = [];

    constructor (private planViewWeeklyService: PlanViewWeeklyService,private teamService: TeamService,
      private employeeService: EmployeeService) {}

    ngOnInit() { this.getWeekEnds(); this.getTeams();  }

  
  getWeekAssignments(teamName:string,weekEnd:string) {
    console.log('Passed team name : '+teamName+' weekEnd : '+weekEnd);
    this.isSuccess = false;
    
    if(teamName == "null") {
        this.isSuccess = false;
        this.errorMessage = "Please Select Team";
    } else if(weekEnd == "null") {
        this.isSuccess = false;
        this.errorMessage = "Please Select WeekEnd Date , for which you want to Assign PV for Your Team Mates";
    } else {
        this.isSuccess = true;
        this.isShowResult = true;
        this.planViewWeeklyService.getWeekAssignments(teamName,weekEnd)
                                .subscribe(
                                    weekAssignments => this.weekAssignments = weekAssignments,
                                    error =>  this.errorMessage = <any>error);
        this.getEmployeesByTeam(teamName);
    }
    console.log('projectsByTeam size : '+this.weekAssignments.length);
  } 

  getTeams() {
    this.teamService.getTeams()
                     .subscribe(
                       teams => this.teams = teams,
                       error =>  this.errorMessage = <any>error);
    this.selectedTeam = null;
    console.log("Teams lenght : "+this.teams.length);
  } 

  getEmployeesByTeam(teamName:string) {
    console.log("Before showing employees lenght : "+this.employees.length);
    this.planViewWeeklyService.getTeamMembers(teamName)
                     .subscribe(
                          employees => this.employees = employees,
                          error =>  this.errorMessage = <any>error);
    console.log("After showing employees lenght : "+this.employees.length);
  }

  getWeekEnds(){
    this.planViewWeeklyService.getWeekEnds()
                                .subscribe(
                                weekEnds => this.weekEnds = weekEnds,
                                error =>  this.errorMessage = <any>error);
    this.selectedWeekEnd = null;
  }

  submitPlanViewWeekly(action:string){
    for(var i=0;i<this.weekAssignments.length;i++) {
        for(var j=0;j<this.weekAssignments[i].length;j++) {
            console.log('oppm : '+this.weekAssignments[i][j].oppm+' soeid : '+this.weekAssignments[i][j].soeid
                    +' hours : '+this.weekAssignments[i][j].hours);
            if(isNaN(Number(this.weekAssignments[i][j].hours))) {
              this.isSuccess = false;
              this.errorMessage = "Please Provide Valid Hours";
            }
        }
    }
    console.log('this.isSuccess : '+this.isSuccess);
    if(this.isSuccess == true) { 
    this.planViewWeeklyService.create(this.weekAssignments,this.selectedWeekEnd,action)
                     .subscribe(
                       isSuccess  => this.isSuccess = isSuccess,
                       error =>  this.errorMessage = <any>error);
    }
    if(this.isSuccess) {
        this.errorMessage = "PlanView Successfully Saved";
    }
  }

  updateRemaingHour(hr:string,employeeHourRow:PlanViewWeeklyDTO[],value:string) {
    
    console.log("hours : "+hr);
    if(isNaN(Number(value)) || value == "") {
        this.errorMessage = "Please Proide Valid Hours";
        this.isSuccess = false;
        console.log('within NaN');
    } else {
          let totHours = Number(employeeHourRow[employeeHourRow.length-1].totHours);
          console.log("totHours : "+totHours+" length : "+employeeHourRow.length
                    +' employeeHourRow len : '+employeeHourRow.length);
          let remainingHours = Number(employeeHourRow[employeeHourRow.length-1].remainingHours);
          console.log("remainingHours : "+remainingHours);
          let nowFilledHours = Number(value);
          remainingHours = remainingHours + Number(hr);

          remainingHours = remainingHours - nowFilledHours;console.log("RemainingHours val : "+remainingHours);
          
          console.log('value in object employeeHourRow[employeeHourRow.length-1].remainingHours : '
                          +employeeHourRow[employeeHourRow.length-1].remainingHours);
          employeeHourRow[employeeHourRow.length-1].remainingHours = remainingHours+"";
    }
  }
}