import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject, map, switchMap, takeUntil, tap } from "rxjs";
import { EventInfo } from "@app/core";

import { EventsListService } from "../list/events-list.service";

const NAME_KEBAB = "app-event-details";

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./event-details.component.html",
	styleUrl: "./event-details.component.scss"
})
export class EventDetailsComponent implements OnDestroy {

	get event(): EventInfo { return this._event; }

	private _event: EventInfo;

	private readonly _destroy$ = new Subject<void>();

	constructor(
		private activatedRoute: ActivatedRoute,
		private listService: EventsListService,
		cdr: ChangeDetectorRef
	) {
		const event$ = this.activatedRoute.params.pipe(
			map(params => params["id"]),
			switchMap(id => this.listService.getEvent$(id)),
			tap(event => this._event = event),
			tap(() => cdr.markForCheck()),
			takeUntil(this._destroy$)
		);

		[
			event$
		].forEach((x: Observable<unknown>) => x.subscribe());
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

}
