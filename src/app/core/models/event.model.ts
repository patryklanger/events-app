export interface EventPayload {
	title: string;
	description: string;
	date: string;
	type: EventType;
	phoneNumber: string;
	email: string;
	address: string;
}

export interface EventInfo extends EventPayload {
	id: string;
	thumbnail: string;
}

export enum EventType {
	sport = "sport",
	cultural = "cultural",
	health = "health",
}

export type EventTypeLiteral = keyof typeof EventType;
