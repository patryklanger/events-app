import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { EventInfo, EventPayload } from "../models/event.model";
import { events } from "./events.const";


@Injectable({
	providedIn: "root"
})
export class MockEventGateway {
	private events = events;

	constructor() {}

	getEvents$(): Observable<EventInfo[]> {
		return of(this.events);
	}

	getEvent$(id: string): Observable<EventInfo | undefined> {
		return of(this.events.find((event) => event.id === id));
	}

	addEvent$(payload: EventPayload, image: File): Observable<EventInfo> {
		const formData = new FormData();
		formData.append("image", image);

		console.log("EVENT CREATED: ", payload, "IMAGE: ", image);

		const event: EventInfo = {
			id: (this.events.length + 1).toString(),
			...payload,
			thumbnail: "/assets/football-match.jpeg",
		};

		this.events.push(event);

		return of(event);
	}
}
