"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var projectassignment_service_1 = require("./projectassignment.service");
var team_service_1 = require("./team.service");
var project_1 = require("./project");
var employeeHours_1 = require("./employeeHours");
var ng2_modal_1 = require("ng2-modal");
var ProjectAssignment = (function () {
    function ProjectAssignment(projectAssignmentService, teamService) {
        this.projectAssignmentService = projectAssignmentService;
        this.teamService = teamService;
        this.teams = [];
        this.teamMembers = [];
        this.projectsByTeam = [];
        this.projects = [];
        this.selectedEmployeesProjects = [];
        this.isAssignEqual = true;
        this.countEmployeeAssigned = 0;
        this.remainingHours = 0;
    }
    ProjectAssignment.prototype.ngOnInit = function () { this.selectedProject = new project_1.Project('', '', '', '', '', '', '', '', false); this.getTeams(); };
    ProjectAssignment.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams()
            .subscribe(function (teams) { return _this.teams = teams; }, function (error) { return _this.errorMessage = error; });
        this.selectedTeam = null;
        console.log("Teams lenght final : " + this.teams.length);
    };
    ProjectAssignment.prototype.onChange = function (event) {
        console.log('teamMember selected : ' + event.target.value);
        var teamName = event.target.value;
        this.getTeamMembers(teamName);
        this.getProjectsByTeam(teamName);
    };
    ProjectAssignment.prototype.getTeamMembers = function (teamName) {
        var _this = this;
        console.log('Passed team name : ' + teamName);
        this.projectAssignmentService.getTeamMembers(teamName)
            .subscribe(function (teamMembers) { return _this.teamMembers = teamMembers; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectAssignment.prototype.getProjectsByTeam = function (teamName) {
        var _this = this;
        console.log('Passed team name : ' + teamName);
        this.projectAssignmentService.getProjectsByTeam(teamName)
            .subscribe(function (projectsByTeam) { return _this.projectsByTeam = projectsByTeam; }, function (error) { return _this.errorMessage = error; });
        console.log('projectsByTeam size : ' + this.projectsByTeam.length);
    };
    ProjectAssignment.prototype.assignProject = function (project) {
        console.log('project oppm : ' + project.oppm);
        this.isAssignEmployee = true;
        this.selectedProject = project;
        this.selectedEmployeesProjects.length = 0;
        this.countEmployeeAssigned = 0;
        this.isAssignEqual = true;
        this.assignEqualDisabled = false;
        this.hideModal = false;
        this.wrongHoursAssignmenetMessage = "";
        this.remainingHours = Number(this.selectedProject.hours);
    };
    ProjectAssignment.prototype.assignEqualAssignment = function (isAssignEqual) {
        console.log('isAssignEqual : ' + isAssignEqual);
        if (isAssignEqual == true) {
            this.selectedEmployeesProjects.length = 0;
        }
        else {
            for (var i = 0; i < this.teamMembers.length; i++) {
                var teamMember = this.teamMembers[i];
                var e = new employeeHours_1.EmployeeHours(teamMember.soeid, teamMember.team, "0", this.selectedProject.oppm);
                this.selectedEmployeesProjects[i] = e;
            }
        }
    };
    ProjectAssignment.prototype.isAssigned = function (teamMember, isTextBox) {
        //console.log('length : '+this.selectedEmployeesProjects.length);
        for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
            if (teamMember.soeid == this.selectedEmployeesProjects[i].soeid) {
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
        if (isTextBox) {
            this.individualHour = 0;
            this.selectedEmployeesProjects.push(new employeeHours_1.EmployeeHours(teamMember.soeid, teamMember.team, "0", this.selectedProject.oppm));
            return true;
        }
    };
    ProjectAssignment.prototype.onChangeHourTextBox = function (teamMember, hour) {
        var totalAssignedHours = 0;
        var nonSelectedTotalAssignedHours = 0;
        var totalHour = Number(this.selectedProject.hours);
        for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
            if (teamMember.soeid == this.selectedEmployeesProjects[i].soeid) {
                this.selectedEmployeesProjects[i].hours = hour;
                totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
                console.log('If this.selectedEmployeesProjects[i].hours : '
                    + this.selectedEmployeesProjects[i].hours + " hour : " + hour
                    + ' totalAssignedHours : ' + totalAssignedHours + ' totalHour : ' + totalHour);
            }
            else {
                totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
                console.log('Else this.selectedEmployeesProjects[i].hours : ' + this.selectedEmployeesProjects[i].hours
                    + ' totalAssignedHours : ' + totalAssignedHours + " hour : " + hour);
                nonSelectedTotalAssignedHours = totalAssignedHours;
            }
        }
        console.log('totalAssignedHours: ' + totalAssignedHours);
        this.remainingHours = Number(this.selectedProject.hours) - totalAssignedHours;
    };
    ProjectAssignment.prototype.assignEmployee = function (teamMember, selectedProject, checked) {
        console.log('employee checked to get assigned : ' + teamMember.soeid + ' is Checked : '
            + checked + ' , started project is : ' + selectedProject.pNumber);
        this.isAssignEmployee = true;
        if (checked == true) {
            this.countEmployeeAssigned++;
            this.individualHour = Number(selectedProject.hours) / this.countEmployeeAssigned;
            var e = new employeeHours_1.EmployeeHours(teamMember.soeid, teamMember.team, this.individualHour.toString(), this.selectedProject.oppm);
            this.selectedEmployeesProjects[this.countEmployeeAssigned - 1] = e;
            console.log("selectedEmployees length : " + this.selectedEmployeesProjects.length
                + " ,employee added : " + e.soeid);
            for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
                this.selectedEmployeesProjects[i].hours = this.individualHour.toString();
            }
        }
        else {
            this.selectedEmployeesProjects = this.selectedEmployeesProjects.filter(function (item) { return item.soeid !== teamMember.soeid; });
            this.countEmployeeAssigned--;
            this.individualHour = Number(selectedProject.hours) / this.countEmployeeAssigned;
            for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
                this.selectedEmployeesProjects[i].hours = this.individualHour.toString();
            }
            console.log("selectedEmployees length : " + this.selectedEmployeesProjects.length
                + " ,employee removed : " + teamMember.soeid + " individualHour : " + this.individualHour);
        }
        this.remainingHours = Number(this.selectedProject.hours) - (this.selectedEmployeesProjects.length * this.individualHour);
    };
    ProjectAssignment.prototype.viewProject = function (selectedProject) {
        var _this = this;
        console.log("View Project OPPM : " + selectedProject.oppm);
        this.hideModal = false;
        this.isAssignEmployee = false;
        this.isAssignEqual = false;
        this.selectedProject = selectedProject;
        this.assignEqualDisabled = true;
        this.wrongHoursAssignmenetMessage = "";
        this.projectAssignmentService.getAssignedTeamMembers(selectedProject.oppm)
            .subscribe(function (selectedEmployeesProjects) { return _this.selectedEmployeesProjects = selectedEmployeesProjects; }, function (error) { return _this.errorMessage = error; }, function () {
            var totalAssignedHours = 0;
            for (var i = 0; i < _this.selectedEmployeesProjects.length; i++) {
                totalAssignedHours = totalAssignedHours + Number(_this.selectedEmployeesProjects[i].hours);
                console.log('sdfssfs : ' + Number(_this.selectedEmployeesProjects[i].hours));
            }
            console.log('totalAssignedHours : ' + totalAssignedHours + ' projct total Hr : '
                + Number(_this.selectedProject.hours) + ' length : ' + _this.selectedEmployeesProjects.length);
            _this.remainingHours = Number(_this.selectedProject.hours) - totalAssignedHours;
        });
    };
    ProjectAssignment.prototype.viewProjectRemaingHoursCalc = function () {
        var _this = this;
        var totalAssignedHours = 0;
        /*for(var i=0;i<this.selectedEmployeesProjects.length;i++) {
            totalAssignedHours = totalAssignedHours + Number(this.selectedEmployeesProjects[i].hours);
            console.log('sdfssfs : '+Number(this.selectedEmployeesProjects[i].hours));
        }*/
        this.selectedEmployeesProjects.map(function (arr) { return _this.selectedEmployeesProjects.reduce(function (a, b) { return a + Number(b.hours); }, 0); });
        console.log('totalAssignedHours : ' + totalAssignedHours + ' projct total Hr : '
            + Number(this.selectedProject.hours) + ' length : ' + this.selectedEmployeesProjects.length);
        return Number(this.selectedProject.hours) - totalAssignedHours;
    };
    ProjectAssignment.prototype.isDisabledcheckbox = function () {
        console.log('this.isAssignEmployee : ' + this.isAssignEmployee);
        return this.isAssignEmployee;
    };
    ProjectAssignment.prototype.isAssignEqualDisabled = function () {
        return this.assignEqualDisabled;
    };
    ProjectAssignment.prototype.submitSelectedEmployees = function (assignmentModal) {
        var _this = this;
        console.log('submitted the form to add : ' + this.selectedEmployeesProjects.length);
        var success = false;
        var totalAssigneHours = 0;
        for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
            var e = this.selectedEmployeesProjects[i];
            totalAssigneHours = totalAssigneHours + Number(this.selectedEmployeesProjects[i].hours);
            console.log("OPPM : " + e.oppm + " soeid : " + e.soeid + " hours : " + e.hours + " team : " + e.team);
        }
        console.log('totalAssigneHours : ' + totalAssigneHours + ' Total Hours : ' + this.selectedProject.hours);
        if (Number(this.selectedProject.hours) != totalAssigneHours) {
            this.wrongHoursAssignmenetMessage = "Hours Mismatch , Filled Hours : " + totalAssigneHours;
            this.hideModal = false;
            return;
        }
        this.projectAssignmentService.create(this.selectedEmployeesProjects)
            .subscribe(function (success) { return success = success; }, function (error) { return _this.errorMessage = error; });
        console.log("Add Successful employee hours : " + this.selectedEmployeesProjects.length);
        if (success = true) {
            console.log("Assignment successful");
            for (var i = 0; i < this.projectsByTeam.length; i++) {
                var project = this.projectsByTeam[i];
                console.log('project oppm : ' + project.oppm);
                if (project.oppm == this.selectedProject.oppm) {
                    var tempProject = new project_1.Project(project.pNumber, project.oppm, project.projectDesc, project.monthRelease.toString(), project.yearRelease.toString(), 'Y', project.hours, project.team, false);
                    this.projectsByTeam[i] = tempProject;
                }
            }
            this.assignmentModal.close();
        }
        //this.hideModal = true;
    };
    return ProjectAssignment;
}());
__decorate([
    core_1.ViewChild('assignmentModal'),
    __metadata("design:type", ng2_modal_1.Modal)
], ProjectAssignment.prototype, "assignmentModal", void 0);
ProjectAssignment = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/ProjectAssignment.component.html',
        providers: [team_service_1.TeamService, projectassignment_service_1.ProjectAssignmentService],
    }),
    __metadata("design:paramtypes", [projectassignment_service_1.ProjectAssignmentService, team_service_1.TeamService])
], ProjectAssignment);
exports.ProjectAssignment = ProjectAssignment;
//# sourceMappingURL=projectassignment.component.js.map