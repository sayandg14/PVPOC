import { Injectable } from '@angular/core'; 
import { Http, Response, Headers, RequestOptions } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
import { Employee } from './employee';
import { LastWeekOOODTO }    from './lastWeekOOODTO';

@Injectable()
export class LastWeekOOOService {
    constructor (private _http:Http) {}

    getLastWeekOOOData(): Observable<LastWeekOOODTO[]> {
        return this._http.get('http://localhost:8080/lastWeekOOOData/')
                    .map(response => response.json() as LastWeekOOODTO[])
                    .catch(this.handleError);
    }

    create(lastWeekOOODTOs:LastWeekOOODTO[]): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post('http://localhost:8080/lastWeekOOOData', 
                        {'lastWeekOOODTOs':lastWeekOOODTOs}
                        , {headers:headers})
                        .map(response => response.json() as boolean)
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