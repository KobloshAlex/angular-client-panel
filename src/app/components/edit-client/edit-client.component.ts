import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "../../models/Client";
import { ValidationService } from "../../services/validation.service";
import { FLASH_MESSAGE, LEVEL } from "../../flashes/flashes";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private validationService: ValidationService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get id from url
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe((client) => (this.client = client));
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show(FLASH_MESSAGE.USER_VALIDATION_REJECT, LEVEL.ERROR);
    } else {
      //add id to client
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show(FLASH_MESSAGE.USER_UPDATED, LEVEL.SUCCESS);
      this.router.navigate([`/client/${this.id}`]).catch(console.error);
    }
  }

  emailValidation(): RegExp {
    return this.validationService.validateEmail();
  }
}
