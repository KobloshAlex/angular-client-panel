import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { ActivatedRoute, Router } from "@angular/router";
import { FLASH_MESSAGE, LEVEL } from "../../flashes/flashes";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get id from url
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe((client) => {
      if (client.balance !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  onDeleteClick(): void {
    if (confirm("Are you sure?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show(FLASH_MESSAGE.USER_DELETED, LEVEL.WARNING);
      this.router.navigate(["/"]).catch(console.error);
    }
  }

  updateBalance(): void {
    this.clientService.updateClient(this.client);
    this.flashMessage.show(FLASH_MESSAGE.BALANCE_UPDATED, LEVEL.WARNING);
  }
}
