import { inject, Injectable } from "@angular/core";
import { SignUpDetails, userDetails } from '../model/models';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
//import { environment } from "../environments/environment.prod";


Injectable()
export class UserService {
    


    // Inject HttpClient Service
    private http = inject(HttpClient)

   

    // protected post_url: string = `${environment.apiUrl}/signUp`;
    // protected post_url_login: string = `${environment.apiUrl}/auth/generateToken`;
    // protected forget_password_url: string = `${environment.apiUrl}/forgotPassword`;

    protected post_url: string = "http://localhost:8080/signUp"
    protected post_url_login: string = "http://localhost:8080/auth/generateToken"
    protected forget_password_url: string = "http://localhost:8080/forgotPassword"

    /**
     * 
     *  Sign Up 
     */
    postSignUpDetails(signUpDetails: SignUpDetails): Observable<any>{

        return this.http.post<any>(this.post_url,signUpDetails)
            .pipe(
                catchError(this.handleError)
            )
    }



   /**
    * 
    *  Login
    */
    login(userDetails: userDetails) : Observable<any> {
        return this.http.post<any>(this.post_url_login, userDetails)
            .pipe(
                tap(response=> {
                    console.info("Your token should be ", response)        
                }), 
                catchError(this.handleError)
            )


    }

    private handleError(error: HttpErrorResponse): Observable<any> {

        let errorMessage  = ""
        
        if(error.status==0){

            // Client side error 
            console.error("An error occured ", error.error)
        } else {

            // Server side error 
            // To access the custom message from your ApiError JSON object 
            if(error.status==404){
                errorMessage = error.error.message
            } 

            if(error.status==401){
                errorMessage = error.error.message
            }
        }   
        
        // return an observabele with a user facing error message 
        return throwError( () => errorMessage) 

    }


    /*
     * Check if authenticated  
     */
    isLoggedIn(): boolean {
        
       const jwtToken = localStorage.getItem("jwtToken")
        console.info("Your jwt token is here, ", jwtToken)
        
       if(jwtToken){
        return true
       }

       return false;

    }

    /*
     *  Forget Password 
     */
    forgotPassword(email:string):Observable<any> {

        return this.http.post(this.forget_password_url,email)
        .pipe(
            tap(response=> {
                console.info("Your response ", response)        
            }), 
            catchError(this.handleError)
        )
    }


    



    
 




}