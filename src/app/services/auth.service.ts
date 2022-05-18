import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afa.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.afa.authState.pipe();
  }
}
