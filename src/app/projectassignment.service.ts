import { Injectable } from '@angular/core'; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Employee } from './employee';
import { Project } from './project';
import { EmployeeHours } from './employeeHours';

@Injectable()
export class ProjectAssignmentService {
    constructor (private _http:Http) {}

    getEmployees(): Observable<Employee[]> {
        return this._http.get('http://localhost:8080/employees')
                    .map(response => response.json() as Employee[])
                    .catch(this.handleError);
    }

    getTeamMembers(teamName:string): Observable<Employee[]> {
        return this._http.get('http://localhost:8080/employees/'+teamName)
                    .map(response => response.json() as Employee[])
                    .catch(this.handleError);
    }

    getProjectsByTeam(teamName:string): Observable<Project[]> {
        return this._http.get('http://localhost:8080/projects/'+teamName)
                    .map(response => response.json() as Employee[])
                    .catch(this.handleError);
    }

    create(selectedEmployeesProjects: EmployeeHours[]): Observable<EmployeeHours[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('In service adding Employee Hours : ' + selectedEmployeesProjects.length);
        return this._http.post('http://localhost:8080/employeeHoursAssignment', 
                                    {'selectedEmployeesProjects':selectedEmployeesProjects},{headers:headers})
                        .map(response => response.json() as EmployeeHours[])
                        .catch(this.handleError);
    }

    getAssignedTeamMembers(selectedProjectOppm:string) : Observable<EmployeeHours[]> {
        return this._http.get('http://localhost:8080/employeeHoursAssignment/'+selectedProjectOppm)
                    .map(response => response.json() as EmployeeHours[])
                    .catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    
}
