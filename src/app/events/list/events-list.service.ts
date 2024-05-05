import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EventInfo, EventPayload, MockEventGateway } from "@app/core";

@Injectable({
	providedIn: 'root'
})
export class EventsListService {

	constructor(
		private mockEventGateway: MockEventGateway,
		private snackbar: MatSnackBar
	) {
	}

	getEvents$(): Observable<EventInfo[]> {
		return this.mockEventGateway.getEvents();
	}

	getEvent$(id: string): Observable<EventInfo | undefined> {
		return this.mockEventGateway.getEvent(id);
	}

	createEvent$(payload: EventPayload, image: File): Observable<EventInfo> {
		return this.mockEventGateway.addEvent(payload, image).pipe(
			tap(() => this.snackbar.open('Event created', 'Close'))
		);
	}
}
