import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegistered: boolean;

  constructor(
    private authService: AuthService,
    private settingService: SettingsService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegistered = this.settingService.getSettings().allowRegistration;
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.router.navigate(["/login"]).catch(console.error);
  }
}
