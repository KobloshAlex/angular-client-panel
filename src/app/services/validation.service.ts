import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor() {}

  validateEmail(): RegExp {
    return RegExp(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`);
  }
}
