import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./nav/nav.component";
import {DatabaseService} from "../services/database.service";
import {FooterComponent} from "./footer/footer.component";
import {MapsComponent} from "./maps/maps.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent, MapsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MobAppFinal_Sapana_Ryan';

  database = inject(DatabaseService);


  constructor(){
    this.database.initDB();
  }
}
