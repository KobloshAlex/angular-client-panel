import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      this.calculateTotalOwed();
    });
  }

  calculateTotalOwed(): void {
    this.totalOwed = this.clients.reduce((total: number, client: Client) => {
      return total + client.balance;
    }, 0);
  }
}
