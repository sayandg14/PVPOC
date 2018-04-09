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
var planViewWeekly_service_1 = require("./planViewWeekly.service");
var team_service_1 = require("./team.service");
var employee_service_1 = require("./employee.service");
var PlanViewWeekly = (function () {
    function PlanViewWeekly(planViewWeeklyService, teamService, employeeService) {
        this.planViewWeeklyService = planViewWeeklyService;
        this.teamService = teamService;
        this.employeeService = employeeService;
        this.isSuccess = true;
        this.isShowResult = false;
        this.weekEnds = [];
        this.teams = [];
        this.employees = [];
        this.weekAssignments = [];
    }
    PlanViewWeekly.prototype.ngOnInit = function () { this.getWeekEnds(); this.getTeams(); };
    PlanViewWeekly.prototype.getWeekAssignments = function (teamName, weekEnd) {
        var _this = this;
        console.log('Passed team name : ' + teamName + ' weekEnd : ' + weekEnd);
        this.isSuccess = false;
        if (teamName == "null") {
            this.isSuccess = false;
            this.errorMessage = "Please Select Team";
        }
        else if (weekEnd == "null") {
            this.isSuccess = false;
            this.errorMessage = "Please Select WeekEnd Date , for which you want to Assign PV for Your Team Mates";
        }
        else {
            this.isSuccess = true;
            this.isShowResult = true;
            this.planViewWeeklyService.getWeekAssignments(teamName, weekEnd)
                .subscribe(function (weekAssignments) { return _this.weekAssignments = weekAssignments; }, function (error) { return _this.errorMessage = error; });
            this.getEmployeesByTeam(teamName);
        }
        console.log('projectsByTeam size : ' + this.weekAssignments.length);
    };
    PlanViewWeekly.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams()
            .subscribe(function (teams) { return _this.teams = teams; }, function (error) { return _this.errorMessage = error; });
        this.selectedTeam = null;
        console.log("Teams lenght : " + this.teams.length);
    };
    PlanViewWeekly.prototype.getEmployeesByTeam = function (teamName) {
        var _this = this;
        console.log("Before showing employees lenght : " + this.employees.length);
        this.planViewWeeklyService.getTeamMembers(teamName)
            .subscribe(function (employees) { return _this.employees = employees; }, function (error) { return _this.errorMessage = error; });
        console.log("After showing employees lenght : " + this.employees.length);
    };
    PlanViewWeekly.prototype.getWeekEnds = function () {
        var _this = this;
        this.planViewWeeklyService.getWeekEnds()
            .subscribe(function (weekEnds) { return _this.weekEnds = weekEnds; }, function (error) { return _this.errorMessage = error; });
        this.selectedWeekEnd = null;
    };
    PlanViewWeekly.prototype.submitPlanViewWeekly = function (action) {
        var _this = this;
        for (var i = 0; i < this.weekAssignments.length; i++) {
            for (var j = 0; j < this.weekAssignments[i].length; j++) {
                console.log('oppm : ' + this.weekAssignments[i][j].oppm + ' soeid : ' + this.weekAssignments[i][j].soeid
                    + ' hours : ' + this.weekAssignments[i][j].hours);
                if (isNaN(Number(this.weekAssignments[i][j].hours))) {
                    this.isSuccess = false;
                    this.errorMessage = "Please Provide Valid Hours";
                }
            }
        }
        console.log('this.isSuccess : ' + this.isSuccess);
        if (this.isSuccess == true) {
            this.planViewWeeklyService.create(this.weekAssignments, this.selectedWeekEnd, action)
                .subscribe(function (isSuccess) { return _this.isSuccess = isSuccess; }, function (error) { return _this.errorMessage = error; });
        }
        if (this.isSuccess) {
            this.errorMessage = "PlanView Successfully Saved";
        }
    };
    PlanViewWeekly.prototype.updateRemaingHour = function (hr, employeeHourRow, value) {
        console.log("hours : " + hr);
        if (isNaN(Number(value)) || value == "") {
            this.errorMessage = "Please Proide Valid Hours";
            this.isSuccess = false;
            console.log('within NaN');
        }
        else {
            var totHours = Number(employeeHourRow[employeeHourRow.length - 1].totHours);
            console.log("totHours : " + totHours + " length : " + employeeHourRow.length
                + ' employeeHourRow len : ' + employeeHourRow.length);
            var remainingHours = Number(employeeHourRow[employeeHourRow.length - 1].remainingHours);
            console.log("remainingHours : " + remainingHours);
            var nowFilledHours = Number(value);
            remainingHours = remainingHours + Number(hr);
            remainingHours = remainingHours - nowFilledHours;
            console.log("RemainingHours val : " + remainingHours);
            console.log('value in object employeeHourRow[employeeHourRow.length-1].remainingHours : '
                + employeeHourRow[employeeHourRow.length - 1].remainingHours);
            employeeHourRow[employeeHourRow.length - 1].remainingHours = remainingHours + "";
        }
    };
    return PlanViewWeekly;
}());
PlanViewWeekly = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/planViewWeekly.component.html',
        providers: [planViewWeekly_service_1.PlanViewWeeklyService, team_service_1.TeamService, employee_service_1.EmployeeService],
    }),
    __metadata("design:paramtypes", [planViewWeekly_service_1.PlanViewWeeklyService, team_service_1.TeamService,
        employee_service_1.EmployeeService])
], PlanViewWeekly);
exports.PlanViewWeekly = PlanViewWeekly;
//# sourceMappingURL=planViewWeekly.component.js.map