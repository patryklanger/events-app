import { Observable, Subject, Subscription, finalize, takeUntil, tap } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";
import { TestBed } from "@angular/core/testing";

import { LayoutService } from "./layout.service";

class MockRouter {

	readonly events: Observable<NavigationEnd>;

	private ne = new NavigationEnd(0, 'http://mock-host.com/events', 'http://mock-host.com/events/add');

	private readonly _events$ = new Subject<NavigationEnd>();

	constructor() {
		this.events = this._events$.asObservable();
	}

	sendNavigationEndEvent() {
		this._events$.next(this.ne);
		this._events$.complete();
	}
}

describe("LayoutService", () => {
	let layoutService: LayoutService;
	const mockSpy = new MockRouter();
	const _destroy$ = new Subject<void>();

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				LayoutService,
				{
					provide: Router,
					useValue: mockSpy,
				},
			],
		});

		layoutService = TestBed.inject(LayoutService);
	});

	afterEach(() => {
		_destroy$.next();
	});

	afterAll(() => {
		_destroy$.complete();
	});

	describe("drawerOpened$", () => {
		it("should return false after init", () => {
			layoutService.drawerOpened$.pipe(
				tap(drawerOpened => expect(drawerOpened).toBeFalse()),
				takeUntil(_destroy$)
			).subscribe();
		});

		it("should toggle drawer and return true", () => {
			layoutService.toggleDrawer();

			layoutService.drawerOpened$.pipe(
				tap(drawerOpened => expect(drawerOpened).toBeTrue()),
				takeUntil(_destroy$)
			).subscribe();
		});

		it("should close drawer on navigation end", () => {
			layoutService.toggleDrawer();
			mockSpy.sendNavigationEndEvent();

			layoutService.drawerOpened$.pipe(
				tap(drawerOpened => expect(drawerOpened).toBeFalse()),
				takeUntil(_destroy$)
			).subscribe();
		});
	});
});
