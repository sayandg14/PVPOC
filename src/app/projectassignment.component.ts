import { Component,ViewChild } from '@angular/core';  
import { ProjectAssignmentService } from './projectassignment.service';
import { TeamService } from './team.service';
import { Employee } from './employee';
import { Project } from './project';
import { EmployeeHours } from './employeeHours';
import { ModalModule,Modal } from 'ng2-modal';


@Component ({  
   selector: 'PV-app',  
   templateUrl: 'app/views/ProjectAssignment.component.html',
   providers: [TeamService,ProjectAssignmentService] ,
})  
export   class   ProjectAssignment  {
  @ViewChild('assignmentModal') assignmentModal:Modal;
  
  teams: string[] = [];
  teamMembers: Employee[] = [];
  projectsByTeam: Project[] = [];
  projects: Project[] = [];
  selectedTeam: string;
  errorMessage: string;
  selectedProject:Project;
  selectedEmployeesProjects:EmployeeHours[] = [];
  isAssignEqual:boolean = true;
  countEmployeeAssigned:number = 0;
  individualHour:number ;
  isAssignEmployee:boolean;
  wrongHoursAssignmenetMessage:string;
  hideModal:boolean;
  remainingHours:Number = 0;
  assignEqualDisabled:boolean;
  
 
  constructor (private projectAssignmentService: ProjectAssignmentService,private teamService: TeamService) {}
 
  ngOnInit() { this.selectedProject = new Project('','','','','','','','',false);  this.getTeams(); }
 
  getTeams() {
    this.teamService.getTeams()
                     .subscribe(
                       teams => this.teams = teams,
                       error =>  this.errorMessage = <any>error);
    this.selectedTeam = null;
    console.log("Teams lenght final : "+this.teams.length);
  }

  onChange(event:Event) {
    console.log('teamMember selected : '+(event.target as HTMLSelectElement).value);
    let teamName:string = (event.target as HTMLSelectElement).value;
    this.getTeamMembers(teamName);
    this.getProjectsByTeam(teamName);
  }

  getTeamMembers(teamName:string) {
    console.log('Passed team name : '+teamName);
    this.projectAssignmentService.getTeamMembers(teamName)
                            .subscribe(
                                teamMembers => this.teamMembers = teamMembers,
                                error =>  this.errorMessage = <any>error);
  }

  getProjectsByTeam(teamName:string) {
    console.log('Passed team name : '+teamName);
    this.projectAssignmentService.getProjectsByTeam(teamName)
                            .subscribe(
                                projectsByTeam => this.projectsByTeam = projectsByTeam,
                                error =>  this.errorMessage = <any>error);
    console.log('projectsByTeam size : '+this.projectsByTeam.length);
  } 
  
  assignProject(project:Project){
    console.log('project oppm : '+project.oppm);
    this.isAssignEmployee = true;
    this.selectedProject = project;
    this.selectedEmployeesProjects.length = 0;
    this.countEmployeeAssigned = 0;
    this.isAssignEqual = true;
    this.assignEqualDisabled = false;
    this.hideModal = false;
    this.wrongHoursAssignmenetMessage = "";
    this.remainingHours = Number(this.selectedProject.hours);
  }

  assignEqualAssignment(isAssignEqual:Boolean) {
    console.log('isAssignEqual : '+isAssignEqual);
    if(isAssignEqual == true) {
        this.selectedEmployeesProjects.length = 0;
    } else {
        for(var i=0;i<this.teamMembers.length;i++) {
            let teamMember = this.teamMembers[i];
            let e:EmployeeHours = new EmployeeHours(teamMember.soeid,teamMember.team,
                              "0",this.selectedProject.oppm);
            this.selectedEmployeesProjects[i] = e;
        }
    }
 
  }

  isAssigned(teamMember:Employee,isTextBox:boolean) : boolean {
        //console.log('length : '+this.selectedEmployeesProjects.length);
        for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
            
            if(teamMember.soeid == this.selectedEmployeesProjects[i].soeid) {
                /*console.log('teamMember.soeid : '+teamMember.soeid + ' isTextBox : '+isTextBox
                  +' this.selectedEmployeesProjects[i].soeid : '+this.selectedEmployeesProjects[i].soeid
                  + ' this.selectedEmployeesProjects[i].hours : '+this.selectedEmployeesProjects[i].hours);*/
                //this.selectedEmployeesProjects = this.selectedEmployeesProjects;
                this.individualHour = Number(this.selectedEmployeesProjects[i].hours);

                //this.showHours(teamMember);
                return true;

            } /*else if(isTextBox) {
              console.log('this.individualHour : '+this.individualHour);
              this.individualHour = 0;
              return true;
            } */
        }
        if(isTextBox) {
          this.individualHour = 0;
          this.selectedEmployeesProjects.push(new EmployeeHours(teamMember.soeid,teamMember.team,"0",this.selectedProject.oppm));
          return true; 
        }
  }

  onChangeHourTextBox(teamMember:Employee,hour:string) {
    
    let totalAssignedHours = 0;
    let nonSelectedTotalAssignedHours = 0;
    let totalHour = Number(this.selectedProject.hours);
    for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
        if(teamMember.soeid == this.selectedEmployeesProjects[i].soeid) {
                this.selectedEmployeesProjects[i].hours = hour;
                totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
                console.log('If this.selectedEmployeesProjects[i].hours : '
                            +this.selectedEmployeesProjects[i].hours + " hour : "+hour
                            + ' totalAssignedHours : '+totalAssignedHours+' totalHour : '+totalHour);
                
                /*if(totalAssignedHours > totalHour) {
                    console.log('nonSelectedTotalAssignedHours : '+nonSelectedTotalAssignedHours+' totalHour : '+totalHour);
                    this.selectedEmployeesProjects[i].hours = (totalHour-nonSelectedTotalAssignedHours).toString();
                    console.log('this.selectedEmployeesProjects[i].hours : '+this.selectedEmployeesProjects[i].hours);
                    console.log('individualHour : '+this.individualHour)
                    totalAssignedHours = Number(this.selectedEmployeesProjects[i].hours);
                }*/
                            
        } else {
          
            totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
            console.log('Else this.selectedEmployeesProjects[i].hours : '+this.selectedEmployeesProjects[i].hours
                            + ' totalAssignedHours : '+totalAssignedHours+" hour : "+hour);
            nonSelectedTotalAssignedHours = totalAssignedHours;
            
        }
    }
      console.log('totalAssignedHours: '+totalAssignedHours);
      this.remainingHours = Number(this.selectedProject.hours) - totalAssignedHours;
  }

  assignEmployee(teamMember:Employee,selectedProject:Project,checked:Boolean) {
    console.log('employee checked to get assigned : '+teamMember.soeid+' is Checked : '
                +checked+' , started project is : '+selectedProject.pNumber);
    this.isAssignEmployee = true;
    
    if(checked == true) {
      this.countEmployeeAssigned++;
      this.individualHour = Number(selectedProject.hours) / this.countEmployeeAssigned;
      let e:EmployeeHours = new EmployeeHours(teamMember.soeid,teamMember.team,
                              this.individualHour.toString(),this.selectedProject.oppm);
      this.selectedEmployeesProjects[this.countEmployeeAssigned-1] = e;
      
      console.log("selectedEmployees length : "+this.selectedEmployeesProjects.length
                    +" ,employee added : "+e.soeid);
      
      for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
          this.selectedEmployeesProjects[i].hours = this.individualHour.toString();
      }
    } else {
      this.selectedEmployeesProjects = this.selectedEmployeesProjects.filter
                                        (item => item.soeid !== teamMember.soeid);
      
      this.countEmployeeAssigned--;
      this.individualHour = Number(selectedProject.hours) / this.countEmployeeAssigned;
      for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
          this.selectedEmployeesProjects[i].hours = this.individualHour.toString();
      }
      console.log("selectedEmployees length : "+this.selectedEmployeesProjects.length
                    +" ,employee removed : "+teamMember.soeid+" individualHour : "+this.individualHour );
    }
    this.remainingHours = Number(this.selectedProject.hours) - (this.selectedEmployeesProjects.length * this.individualHour);
  }

  viewProject(selectedProject:Project) {
    console.log("View Project OPPM : "+selectedProject.oppm);
    this.hideModal = false;
    this.isAssignEmployee = false;
    this.isAssignEqual = false;
    this.selectedProject = selectedProject;
    this.assignEqualDisabled = true;
    this.wrongHoursAssignmenetMessage = "";
    this.projectAssignmentService.getAssignedTeamMembers(selectedProject.oppm)
                            .subscribe(
                                selectedEmployeesProjects => this.selectedEmployeesProjects = selectedEmployeesProjects,
                                error =>  this.errorMessage = <any>error,
                                () => 
                                {
                                  var totalAssignedHours = 0;
                                  for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
                                      totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
                                      console.log('sdfssfs : '+Number(this.selectedEmployeesProjects[i].hours));
                                  }
                                  console.log('totalAssignedHours : '+totalAssignedHours+' projct total Hr : '
                                    +Number(this.selectedProject.hours)+' length : '+this.selectedEmployeesProjects.length)
                                  this.remainingHours = Number(this.selectedProject.hours) - totalAssignedHours;
                                }
                              );
    
    
    
  }

  viewProjectRemaingHoursCalc():Number {
    let totalAssignedHours = 0;
    /*for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
        totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
        console.log('sdfssfs : '+Number(this.selectedEmployeesProjects[i].hours));
    }*/
    this.selectedEmployeesProjects.map(arr => this.selectedEmployeesProjects.reduce((a,b)=>a+Number(b.hours),0));
    console.log('totalAssignedHours : '+totalAssignedHours+' projct total Hr : '
      +Number(this.selectedProject.hours)+' length : '+this.selectedEmployeesProjects.length)
    return Number(this.selectedProject.hours) - totalAssignedHours;
  }

  isDisabledcheckbox() {
    console.log('this.isAssignEmployee : '+this.isAssignEmployee);
    return this.isAssignEmployee;
  }

  isAssignEqualDisabled() {
      return this.assignEqualDisabled;
  }

  submitSelectedEmployees(assignmentModal:ModalModule) {
      console.log('submitted the form to add : '+this.selectedEmployeesProjects.length);
      let success : boolean = false;
      
      let totalAssigneHours = 0;
      for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
        let e : EmployeeHours =  this.selectedEmployeesProjects[i];
        totalAssigneHours = totalAssigneHours +  Number(this.selectedEmployeesProjects[i].hours);
        console.log("OPPM : "+e.oppm+" soeid : "+e.soeid+" hours : "+e.hours+" team : "+e.team);
      }
      console.log('totalAssigneHours : '+totalAssigneHours+' Total Hours : '+this.selectedProject.hours);
      if(Number(this.selectedProject.hours) != totalAssigneHours) {
        this.wrongHoursAssignmenetMessage = "Hours Mismatch , Filled Hours : "+totalAssigneHours;
        this.hideModal = false;
        return;
      }


      this.projectAssignmentService.create(this.selectedEmployeesProjects)
                     .subscribe(
                       success  => success = success,
                       error =>  this.errorMessage = <any>error);

      console.log("Add Successful employee hours : "+this.selectedEmployeesProjects.length);
      if(success = true){
        console.log("Assignment successful");

        for(var i=0;i < this.projectsByTeam.length;i++) {
            var project = this.projectsByTeam[i];
            console.log('project oppm : '+project.oppm);
            if(project.oppm == this.selectedProject.oppm) {
              let tempProject = new Project(project.pNumber,project.oppm,project.projectDesc,project.monthRelease.toString(),
                project.yearRelease.toString(),'Y',project.hours,project.team,false);
              this.projectsByTeam[i] = tempProject;
            }
        }
          this.assignmentModal.close();
      }
      //this.hideModal = true;
      
  }
} 