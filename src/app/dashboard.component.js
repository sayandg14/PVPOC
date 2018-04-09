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
var dashboard_service_1 = require("./dashboard.service");
var team_service_1 = require("./team.service");
var project_1 = require("./project");
var employeeHours_1 = require("./employeeHours");
var ProjectAssignment = (function () {
    function ProjectAssignment(dashboardService, teamService) {
        this.dashboardService = dashboardService;
        this.teamService = teamService;
        this.teams = [];
        this.teamMembers = [];
        this.projectsByTeam = [];
        this.projects = [];
        this.selectedEmployeesProjects = [];
        this.isAssignEqual = true;
        this.countEmployeeAssigned = 0;
    }
    ProjectAssignment.prototype.ngOnInit = function () { this.selectedProject = new project_1.Project('', '', '', '', '', '', ''); this.getTeams(); };
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
        this.dashboardService.getTeamMembers(teamName)
            .subscribe(function (teamMembers) { return _this.teamMembers = teamMembers; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectAssignment.prototype.getProjectsByTeam = function (teamName) {
        var _this = this;
        console.log('Passed team name : ' + teamName);
        this.dashboardService.getProjectsByTeam(teamName)
            .subscribe(function (projectsByTeam) { return _this.projectsByTeam = projectsByTeam; }, function (error) { return _this.errorMessage = error; });
        console.log('projectsByTeam size : ' + this.projectsByTeam.length);
    };
    ProjectAssignment.prototype.assignProject = function (project) {
        console.log('project oppm : ' + project.oppm);
        this.selectedProject = project;
    };
    ProjectAssignment.prototype.assignEqualAssignment = function (isAssignEqual) {
        console.log('isAssignEqual : ' + isAssignEqual);
        if (isAssignEqual == true) {
        }
    };
    ProjectAssignment.prototype.assignEmployee = function (teamMember, selectedProject, checked) {
        console.log('employee checked to get assigned : ' + teamMember.soeid + ' is Checked : '
            + checked + ' , started project is : ' + selectedProject.pNumber);
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
            console.log("selectedEmployees length : " + this.selectedEmployeesProjects.length
                + " ,employee removed : " + teamMember.soeid);
        }
    };
    ProjectAssignment.prototype.showHours = function (teamMember) {
        for (var i = 0; i < this.selectedEmployeesProjects.length; i++) {
            var e = this.selectedEmployeesProjects[i];
            if (teamMember.soeid == e.soeid) {
                return true;
            }
        }
    };
    ProjectAssignment.prototype.submitSelectedEmployees = function () {
        var _this = this;
        console.log('submitted the form to add : ' + this.selectedEmployeesProjects.length);
        this.dashboardService.create(this.selectedEmployeesProjects)
            .subscribe(function (selectedEmployeesProjects) { return _this.selectedEmployeesProjects = selectedEmployeesProjects; }, function (error) { return _this.errorMessage = error; });
        console.log("Add Successful employee hours : " + this.selectedEmployeesProjects.length);
        if (this.selectedEmployeesProjects.length > 0) {
            console.log("Assignment successful");
            for (var i = 0; i < this.projectsByTeam.length; i++) {
                var project = this.projectsByTeam[i];
                console.log('project oppm : ' + project.oppm);
                if (project.oppm == this.selectedProject.oppm) {
                    var tempProject = new project_1.Project(project.pNumber, project.oppm, project.projectDesc, project.projectDesc, 'Y', project.hours, project.team);
                    this.projectsByTeam[i] = tempProject;
                }
            }
        }
    };
    return ProjectAssignment;
}());
ProjectAssignment = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/dashboard.component.html',
        providers: [team_service_1.TeamService, dashboard_service_1.DashboardService],
    }),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService, team_service_1.TeamService])
], ProjectAssignment);
exports.ProjectAssignment = ProjectAssignment;
//# sourceMappingURL=dashboard.component.js.map