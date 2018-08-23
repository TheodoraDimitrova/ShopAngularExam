import { Injectable } from "@angular/core";
import { switchMap } from "rxjs/operators";
import * as firebase from "firebase/app";
import { Observable, of } from "rxjs";
import { UserService } from "./user.service";
import { AngularFireAuth } from "angularfire2/auth";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "../models/app-user";
import { EMPTY } from "rxjs";

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState;
  }

  register(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  singIn(email: string, password: string) {
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }



  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  
  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();
        
        return EMPTY;
      })
    );
  }


  



}
