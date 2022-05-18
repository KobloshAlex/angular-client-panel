import { Component, OnInit, ViewChild } from "@angular/core";
import { Client } from "../../models/Client";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { LEVEL, FLASH_MESSAGE } from "../../flashes/flashes";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
  };
  disableBalanceOnAdd: boolean = true;
  @ViewChild("clientForm") clientForm: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }): void {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      console.log(LEVEL.ERROR);
      this.flashMessage.show(FLASH_MESSAGE.USER_VALIDATION_REJECT, LEVEL.ERROR);
    } else {
      this.clientService.newClient(value);
      this.flashMessage.show(FLASH_MESSAGE.USER_CREATED, LEVEL.SUCCESS);
      this.router.navigate(["/"]).catch(console.error);
    }
  }

  emailValidation(): RegExp {
    return RegExp(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`);
  }
}
