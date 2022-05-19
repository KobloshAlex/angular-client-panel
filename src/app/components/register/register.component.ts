import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { FLASH_MESSAGE, LEVEL } from "../../flashes/flashes";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    try {
      await this.authService.register(this.email, this.password);
      this.flashMessage.show(FLASH_MESSAGE.NEW_USER_REGISTRATION, LEVEL.SUCCESS);
      await this.router.navigate(["/"]);
    } catch (error) {
      this.flashMessage.show(error.message, LEVEL.ERROR);
    }
  }
}
