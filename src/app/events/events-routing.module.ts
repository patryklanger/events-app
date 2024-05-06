import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EventsComponent } from "./events.component";
import { EventsFormComponent } from "./form/events-form.component";
import { EventDetailsComponent } from "./details/event-details.component";

const routes: Routes = [
	{ path: "", component: EventsComponent },
	{ path: "add", component: EventsFormComponent },
	{ path: "details/:id", component: EventDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventsRoutingModule {}
