import { ActivatedRouteSnapshot, CanActivate, CanDeactivateFn, Router, RouterStateSnapshot } from "@angular/router";
 
import { inject } from "@angular/core";
import { SignUpComponent } from "../components/signUpComponent/sign-up.component";
import { UserService } from "../service/UserService";

export const hasSaved: CanDeactivateFn<SignUpComponent> = 
    (signUpForm: SignUpComponent, route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        if(signUpForm.signUpForm.dirty && signUpForm.isInvalid() && signUpForm.disableButton()){
            return confirm("You have not register yet, Are you sure you want to leave?")
        }

        return true;
    }


export const isAuthenticated = 
    (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
        const authSvc = inject(UserService)
        const router = inject(Router)

        if(authSvc.isLoggedIn()){
            console.info("Logged In")
            return true
        }

        return router.parseUrl('/')

    }