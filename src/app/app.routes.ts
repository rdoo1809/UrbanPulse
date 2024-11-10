import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {SettingsComponent} from "./settings/settings.component";
import {AddComponent} from "./add/add.component";
import {ErrorComponent} from "./error/error.component";
import {EventEmitter} from "@angular/core";
import {EventsComponent} from "./events/events.component";
import {ContactComponent} from "./contact/contact.component";
import {ModifyEventComponent} from "./modify-event/modify-event.component";
import {ShowComponent} from "./show/show.component";
import {ListDetailsComponent} from "./list-details/list-details.component";
import {ModifyUserComponent} from "./modify-user/modify-user.component";
import {ContactRequestsComponent} from "./contact-requests/contact-requests.component";
import {RequestDetailsComponent} from "./request-details/request-details.component";

export const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "details/:id", component: DetailsComponent},
  {path: "settings", component: SettingsComponent},
  {path: "add", component: AddComponent},
  {path: "events", component: EventsComponent},
  {path: "contact", component: ContactComponent},
  {path: "contact-requests", component: ContactRequestsComponent},
  {path: "show", component: ShowComponent},
  {path: "list-details/:id", component: ListDetailsComponent},
  {path: "request-details/:id", component: RequestDetailsComponent},
  {path: "modify/:id", component: ModifyEventComponent},
  {path: "user-modify/:id", component: ModifyUserComponent},
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "**", component: ErrorComponent},
];
