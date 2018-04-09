import { Injectable } from '@angular/core'; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
import { Project } from './project';

@Injectable()
export class ProjectService {
    constructor (private _http:Http) {}

    getProjects(): Observable<Project[]> {
        return this._http.get('http://localhost:8080/projects')
                    .map(response => response.json() as Project[])
                    .catch(this.handleError);
    }

    create(project: Project): Observable<Project> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('In service adding Project : ' + project.projectDesc);
        return this._http.post('http://localhost:8080/projects', {'projectData':project}
                        , {headers:headers})
                        .map(response => response.json() as Project)
                        .catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        console.log('body : '+body);
        return body || { };
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