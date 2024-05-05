import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { LayoutService } from './layout.service';

const NAME_KEBAB = 'app-layout';

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy {

	get menuOpened(): boolean { return this._menuOpened; }

	private _menuOpened: boolean;

	private readonly _destroy$ = new Subject<void>();

	constructor(
		private layoutService: LayoutService,
		private cdr: ChangeDetectorRef
	) {
		const menuOpened$ = this.layoutService.drawerOpened$.pipe(
			tap(menuOpened => this._menuOpened = menuOpened),
			tap(() => this.cdr.markForCheck()),
			takeUntil(this._destroy$)
		);

		[
			menuOpened$
		].forEach((x: Observable<unknown>) => x.subscribe());
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

}
