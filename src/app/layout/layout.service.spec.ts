import { Subscription } from "rxjs";

import { LayoutService } from "./layout.service";

describe("LayoutService", () => {
	let layoutService: LayoutService;
	let subs: Subscription;

	beforeEach(() => {
		layoutService = new LayoutService();
		subs = new Subscription();
	});

	afterEach(() => {
		if (subs) {
			subs.unsubscribe();
		}
	});

	describe("drawerOpened$", () => {
		it("should return false", () => {
			subs.add(
				layoutService.drawerOpened$.subscribe(drawerOpened => {
					expect(drawerOpened).toBeFalse();
				})
			);
		});

		it("should return true", () => {
			layoutService.toggleDrawer();
			subs.add(
				layoutService.drawerOpened$.subscribe(drawerOpened => {
					expect(drawerOpened).toBeTrue();
				})
			);
		});
	});
});
