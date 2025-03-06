import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


Injectable()
export class DashBoardService {
    
     // Inject HttpClient Service
    private http = inject(HttpClient)

    protected post_url_login: string = "http://localhost:8080/test"


    getResponse():Observable<any> {

        // Note: HttpInterceptor will automatically add the token
        return this.http.get(this.post_url_login)
    }



}
