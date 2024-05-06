import { MatSnackBar } from "@angular/material/snack-bar";
import { TestBed } from "@angular/core/testing";
import { EventInfo, EventType, MockEventGateway } from "@app/core";

import { EventsListService } from "./events-list.service";
import { Subject, of, takeUntil, tap } from "rxjs";

const mockEvents: EventInfo[] = [
	{
		id: "1",
		title: "Football match",
		description: "Football match between Barcelona and Real Madrid",
		date: "2021-09-01",
		type: EventType.sport,
		phoneNumber: "123456789",
		email: "xyx@gmail.pl",
		address: "Stadium",
		thumbnail: "/assets/football-match.jpeg",
	},
]

describe("EventsListService", () => {
	let eventsListService: EventsListService;
	let mockEventGatewaySpy: jasmine.SpyObj<MockEventGateway>;
	let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
	const destroy$ = new Subject<void>();

	beforeEach(() => {
		mockEventGatewaySpy = jasmine.createSpyObj(
			"MockEventGateway",
			["getEvents$", "getEvent$", "addEvent$"]
		);
		matSnackBarSpy = jasmine.createSpyObj(
			"MatSnackBar",
			["open"]
		);

		TestBed.configureTestingModule({
			providers: [
				EventsListService,
				{
					provide: MockEventGateway,
					useValue: mockEventGatewaySpy,
				},
				{
					provide: MatSnackBar,
					useValue: matSnackBarSpy,
				},
			],
		});

		eventsListService = TestBed.inject(EventsListService);
	});

	afterEach(() => {
		destroy$.next();
	});

	afterAll(() => {
		destroy$.complete();
	});

	describe(".getEvents$()", () => {
		it("should return events", () => {
			mockEventGatewaySpy.getEvents$.and.returnValue(of(mockEvents));

			eventsListService.getEvents$().pipe(
				tap(events => {
					expect(events).toEqual(mockEvents);
					expect(mockEventGatewaySpy.getEvents$).toHaveBeenCalledTimes(1);
				}),
				takeUntil(destroy$),
			).subscribe();
		});
	});

	describe(".getEvent$()", () => {
		it("should return event", () => {
			const eventId = "1";
			mockEventGatewaySpy.getEvent$.and.returnValue(of(mockEvents[0]));

			eventsListService.getEvent$(eventId).pipe(
				tap(event => {
					expect(event).toEqual(mockEvents[0]);
					expect(mockEventGatewaySpy.getEvent$).toHaveBeenCalledTimes(1);
					expect(mockEventGatewaySpy.getEvent$).toHaveBeenCalledWith(eventId);
				}),
				takeUntil(destroy$),
			).subscribe();
		});

		it("should return undefined if event not found", () => {
			const eventId = "no-valid-id";
			mockEventGatewaySpy.getEvent$.and.returnValue(of(undefined));

			eventsListService.getEvent$(eventId).pipe(
				tap(event => {
					expect(event).toBeUndefined();
					expect(mockEventGatewaySpy.getEvent$).toHaveBeenCalledTimes(1);
					expect(mockEventGatewaySpy.getEvent$).toHaveBeenCalledWith(eventId);
				}),
				takeUntil(destroy$),
			).subscribe();
		});
	});

	describe(".createEvent$()", () => {
		it("should create event", () => {
			const payload = {
				title: "Football match",
				description: "Football match between Barcelona and Real Madrid",
				date: "2021-09-01",
				type: EventType.sport,
				phoneNumber: "123456789",
				email: "xyx@gmail.pl",
				address: "Stadium",
			};

			const mockImage = new File([""], "filename");

			mockEventGatewaySpy.addEvent$.and.returnValue(of(mockEvents[0]));

			eventsListService.createEvent$(payload, mockImage).pipe(
				tap(event => {
					expect(event).toEqual(mockEvents[0]);
					expect(mockEventGatewaySpy.addEvent$).toHaveBeenCalledTimes(1);
					expect(mockEventGatewaySpy.addEvent$).toHaveBeenCalledWith(payload, mockImage);
					expect(matSnackBarSpy.open).toHaveBeenCalledTimes(1);
					expect(matSnackBarSpy.open).toHaveBeenCalledWith("Event created", "Close");
				}),
				takeUntil(destroy$),
			).subscribe();
		});
	});
});
