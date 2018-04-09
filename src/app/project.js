"use strict";
var Project = (function () {
    function Project(pNumber, oppm, projectDesc, monthRelease, yearRelease, assigned, hours, team, invalidated) {
        this.pNumber = pNumber;
        this.oppm = oppm;
        this.projectDesc = projectDesc;
        this.monthRelease = monthRelease;
        this.yearRelease = yearRelease;
        this.assigned = assigned;
        this.hours = hours;
        this.team = team;
        this.invalidated = invalidated;
    }
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=project.js.map