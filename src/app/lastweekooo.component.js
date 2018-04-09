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
var lastweekooo_service_1 = require("./lastweekooo.service");
var team_service_1 = require("./team.service");
var LastWeekOOO = (function () {
    function LastWeekOOO(teamService, lastWeekOOOService) {
        this.teamService = teamService;
        this.lastWeekOOOService = lastWeekOOOService;
        this.isSuccess = true;
        this.teams = [];
        this.lastWeekOOODTOs = [];
    }
    LastWeekOOO.prototype.ngOnInit = function () { console.log("within ngonit"); this.getTeams(); this.getLastWeekOOOData(); };
    LastWeekOOO.prototype.getLastWeekOOOData = function () {
        var _this = this;
        this.lastWeekOOOService.getLastWeekOOOData()
            .subscribe(function (lastWeekOOODTOs) { return _this.lastWeekOOODTOs = lastWeekOOODTOs; }, function (error) { return _this.errorMessage = error; });
    };
    LastWeekOOO.prototype.save = function () {
        var _this = this;
        console.log("Teams lenght : " + this.lastWeekOOODTOs.length);
        this.lastWeekOOOService.create(this.lastWeekOOODTOs)
            .subscribe(function (isSuccess) { return _this.isSuccess = isSuccess; }, function (error) { return _this.errorMessage = error; });
    };
    LastWeekOOO.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams()
            .subscribe(function (teams) { return _this.teams = teams; }, function (error) { return _this.errorMessage = error; });
        console.log("Teams lenght : " + this.teams.length);
    };
    return LastWeekOOO;
}());
LastWeekOOO = __decorate([
    core_1.Component({
        selector: 'PV-app',
        templateUrl: 'app/views/lastweekooo.component.html',
        providers: [lastweekooo_service_1.LastWeekOOOService, team_service_1.TeamService],
    }),
    __metadata("design:paramtypes", [team_service_1.TeamService, lastweekooo_service_1.LastWeekOOOService])
], LastWeekOOO);
exports.LastWeekOOO = LastWeekOOO;
//# sourceMappingURL=lastweekooo.component.js.map