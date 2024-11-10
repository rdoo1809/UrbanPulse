import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  title: string = "Urban Pulse";

  isMenuOpen = false;



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
