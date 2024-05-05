import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LayoutService {

	readonly drawerOpened$: Observable<boolean>;

	private readonly _drawerOpened$ = new BehaviorSubject<boolean>(false);

	constructor() {
		this.drawerOpened$ = this._drawerOpened$.asObservable();
	}

	toggleDrawer() {
		this._drawerOpened$.next(!this._drawerOpened$.value);
	}
}
