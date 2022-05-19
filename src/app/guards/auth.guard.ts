import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afa: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.afa.authState.pipe(
      map((auth) => {
        if (!auth) {
          this.router.navigate(["/login"]).catch(console.error);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
