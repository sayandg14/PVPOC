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
var project_1 = require("./project");
var monthrelease_1 = require("./monthrelease");
var project_service_1 = require("./project.service");
var team_service_1 = require("./team.service");
var Projects = (function () {
    function Projects(projectService, teamService) {
        this.projectService = projectService;
        this.teamService = teamService;
        this.projects = [];
        this.monthReleases = [
            new monthrelease_1.MonthRelease(0, 'JAN'),
            new monthrelease_1.MonthRelease(1, 'FEB'),
            new monthrelease_1.MonthRelease(2, 'MAR'),
            new monthrelease_1.MonthRelease(3, 'APR'),
            new monthrelease_1.MonthRelease(4, 'MAY'),
            new monthrelease_1.MonthRelease(5, 'JUN'),
            new monthrelease_1.MonthRelease(6, 'JUL'),
            new monthrelease_1.MonthRelease(7, 'AUG'),
            new monthrelease_1.MonthRelease(8, 'SEP'),
            new monthrelease_1.MonthRelease(9, 'OCT'),
            new monthrelease_1.MonthRelease(10, 'NOV'),
            new monthrelease_1.MonthRelease(11, 'DEC'),
        ];
        this.years = ['2016', '2017', '2018', '2019', '2020'];
        this.teams = [];
    }
    Projects.prototype.ngOnInit = function () { console.log("within ngonit"); this.getProjects(); this.getTeams(); };
    Projects.prototype.getProjects = function () {
        var _this = this;
        var date = new Date();
        console.log("Year : " + date.getUTCFullYear() + " Month : " + date.getUTCMonth());
        this.selectedMonthRelease = this.monthReleases[date.getUTCMonth()];
        console.log("Month Release : " + this.selectedMonthRelease.monthName);
        this.selectedYear = this.years[this.years.indexOf(date.getUTCFullYear().toString())];
        console.log('selectedYear : ' + this.selectedYear);
        this.project = new project_1.Project('', '', '', '', '', '', '', '', false);
        console.log("Before showing projects lenght : " + this.projects.length);
        this.projectService.getProjects()
            .subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
        console.log("After showing projects lenght : " + this.projects.length);
    };
    Projects.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams()
            .subscribe(function (teams) { return _this.teams = teams; }, function (error) { return _this.errorMessage = error; });
        this.selectedTeam = null;
        console.log("Teams lenght : " + this.teams.length);
    };
    Projects.prototype.onSubmit = function (pNumber, oppm, desc, releaseMonth, releaseYear, hours, assigned, team) {
        var _this = this;
        if (oppm == "") {
            this.successMessage = 'Please Enter OPPM';
            return;
        }
        if (pNumber == "") {
            this.successMessage = 'Please Enter P# Number';
            return;
        }
        if (desc == "") {
            this.successMessage = 'Please Enter Description';
            return;
        }
        if (hours == "") {
            this.successMessage = 'Please Enter Project Hour';
            return;
        }
        if (isNaN(Number(hours))) {
            this.successMessage = 'Please Enter Valid Project Hour';
            return;
        }
        if (team == "null") {
            this.successMessage = 'Please Enter Team Name';
            return;
        }
        var monthRelease = this.monthReleases[releaseMonth].monthId;
        var yearRelease = releaseYear;
        console.log("release : " + monthRelease + " yearRelease : " + yearRelease);
        this.project = new project_1.Project(pNumber, oppm, desc, monthRelease, yearRelease, assigned, hours, team, false);
        this.submitted = true;
        //this.data = JSON.stringify(data, null, 2);
        console.log('submitted the form to add : ' + this.project);
        this.projectService.create(this.project)
            .subscribe(function (project) { return _this.project = project; }, function (error) { return _this.errorMessage = error; });
        console.log("Add Successful project : " + this.project.projectDesc);
        if (this.project.projectDesc != null || this.project.projectDesc != undefined
            || this.project.projectDesc != "") {
            this.successMessage = 'Project Added Successfully';
            this.projects.unshift(this.project);
        }
    };
    return Projects;
}());
Projects = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/projects.component.html',
        providers: [project_service_1.ProjectService, team_service_1.TeamService],
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService, team_service_1.TeamService])
], Projects);
exports.Projects = Projects;
//# sourceMappingURL=projects.component.js.map