import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

import { MaterialModule } from '../material/material.module';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './list/events-list.component';
import { EventCardComponent } from './card/event-card.component';
import { EventsFormComponent } from './form/events-form.component';
import { EventDetailsComponent } from './details/event-details.component';

@NgModule({
	declarations: [
		EventsComponent,
		EventsListComponent,
		EventCardComponent,
		EventsFormComponent,
		EventDetailsComponent,
	],
	imports: [
		CommonModule,
		EventsRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		MaterialModule,
	]
})
export class EventsModule {}
