import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject, tap, takeUntil, Observable } from 'rxjs';
import { EventInfo } from '@app/core';

import { EventsListService } from './events-list.service';

const NAME_KEBAB = 'app-events-list';

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './events-list.component.html',
	styleUrl: './events-list.component.scss'
})
export class EventsListComponent implements OnDestroy {

	get events(): EventInfo[] { return this._events; }

	private _events: EventInfo[];

	private readonly _destroy$ = new Subject<void>();

	constructor(
		private eventsListService: EventsListService,
		private cdr: ChangeDetectorRef
	) {
		const event$ = this.eventsListService.getEvents$().pipe(
			tap(events => this._events = events),
			tap(() => this.cdr.markForCheck()),
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
