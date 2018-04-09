"use strict";
var PlanViewWeeklyDTO = (function () {
    function PlanViewWeeklyDTO(soeid, team, hours, totHours, remainingHours, oppm, pNumber, projectDesc, projectRelease, enabled) {
        this.soeid = soeid;
        this.team = team;
        this.hours = hours;
        this.totHours = totHours;
        this.remainingHours = remainingHours;
        this.oppm = oppm;
        this.pNumber = pNumber;
        this.projectDesc = projectDesc;
        this.projectRelease = projectRelease;
        this.enabled = enabled;
    }
    return PlanViewWeeklyDTO;
}());
exports.PlanViewWeeklyDTO = PlanViewWeeklyDTO;
//# sourceMappingURL=planViewWeeklyDTO.js.map