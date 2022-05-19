import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { FLASH_MESSAGE, LEVEL } from "../../flashes/flashes";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) this.router.navigate(["/"]).catch(console.error);
    });
  }

  async onSubmit(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.flashMessage.show(FLASH_MESSAGE.USER_LOGIN, LEVEL.SUCCESS);
      await this.router.navigate(["/"]);
    } catch (error) {
      this.flashMessage.show(error.message, LEVEL.ERROR);
    }
  }
}
