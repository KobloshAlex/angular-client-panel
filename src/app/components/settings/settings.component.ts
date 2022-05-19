import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/settings.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Settings } from "../../models/Settings";
import { FLASH_MESSAGE, LEVEL } from "../../flashes/flashes";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private settingService: SettingsService,
    private flashMessage: FlashMessagesService,
  ) {}

  ngOnInit(): void {
    this.settings = this.settingService.getSettings();
  }
  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.flashMessage.show(FLASH_MESSAGE.SETTINGS_SAVED, LEVEL.SUCCESS);
  }
}
