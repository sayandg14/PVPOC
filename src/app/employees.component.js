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
var employee_1 = require("./employee");
var employee_service_1 = require("./employee.service");
var team_service_1 = require("./team.service");
var Employees = (function () {
    function Employees(employeeService, teamService) {
        this.employeeService = employeeService;
        this.teamService = teamService;
        this.employees = [];
        this.teams = [];
    }
    Employees.prototype.ngOnInit = function () { console.log("within ngonit"); this.getEmployees(); this.getTeams(); };
    Employees.prototype.getEmployees = function () {
        var _this = this;
        this.employee = new employee_1.Employee('', '', '', '');
        console.log("Before showing employees lenght : " + this.employees.length);
        this.employeeService.getEmployees()
            .subscribe(function (employees) { return _this.employees = employees; }, function (error) { return _this.errorMessage = error; });
        console.log("After showing employees lenght : " + this.employees.length);
    };
    Employees.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams()
            .subscribe(function (teams) { return _this.teams = teams; }, function (error) { return _this.errorMessage = error; });
        this.selectedTeam = null;
        console.log("Teams lenght : " + this.teams.length);
    };
    Employees.prototype.onSubmit = function (soeid, firstName, lastName, team) {
        var _this = this;
        if (soeid == "") {
            this.successMessage = 'Please Enter SOEID';
            return;
        }
        if (firstName == "") {
            this.successMessage = 'Please Enter First Name';
            return;
        }
        if (lastName == "") {
            this.successMessage = 'Please Enter Last Name';
            return;
        }
        if (team == "null") {
            this.successMessage = 'Please Enter Team Name';
            return;
        }
        this.employee = new employee_1.Employee(soeid, firstName, lastName, team);
        this.submitted = true;
        //this.data = JSON.stringify(data, null, 2);
        console.log('submitted the form to add : ' + this.employee);
        this.employeeService.create(this.employee)
            .subscribe(function (employee) { return _this.employee = employee; }, function (error) { return _this.errorMessage = error; });
        console.log("Add Successful employee : " + this.employee.firstName);
        if (this.employee.firstName != null || this.employee.firstName != undefined
            || this.employee.firstName != "") {
            this.successMessage = 'Employee Added Successfully';
            this.employees.unshift(this.employee);
        }
    };
    return Employees;
}());
Employees = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/employees.component.html',
        providers: [employee_service_1.EmployeeService, team_service_1.TeamService],
    }),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService, team_service_1.TeamService])
], Employees);
exports.Employees = Employees;
//# sourceMappingURL=employees.component.js.map