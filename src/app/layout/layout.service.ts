import { Injectable, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, filter, takeUntil, tap } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LayoutService implements OnDestroy {

	readonly drawerOpened$: Observable<boolean>;

	private readonly _drawerOpened$ = new BehaviorSubject<boolean>(false);
	private readonly _destroy$ = new Subject<void>();

	constructor(
		router: Router
	) {
		this.drawerOpened$ = this._drawerOpened$.asObservable();

		const navigationEnd$ = router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			tap(() => this._drawerOpened$.next(false)),
			takeUntil(this._destroy$)
		);

		[
			navigationEnd$
		].forEach((x: Observable<unknown>) => x.subscribe());
	}

	toggleDrawer() {
		this._drawerOpened$.next(!this._drawerOpened$.value);
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
