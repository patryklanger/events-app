import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, ValidationErrors, Validators } from "@angular/forms";
import { Observable, Subject, switchMap, takeUntil, tap } from "rxjs";
import { EventPayload, EventType } from "@app/core";
import { PHONE_NUMBER_PATTERN } from "@app/shared";

import { EventsListService } from "../list/events-list.service";
import { eventTypeOptions, eventsFromModel } from "./events-form.model";

const NAME_KEBAB = "app-events-form";

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./events-form.component.html",
	styleUrl: "./events-form.component.scss"
})
export class EventsFormComponent {

	readonly formModel = eventsFromModel;
	readonly minDate = new Date();
	readonly formGroup = this.fb.group({
		title: new FormControl("", [Validators.required]),
		description: new FormControl("", [Validators.required]),
		date: new FormControl<Date>(null, [Validators.required]),
		time: new FormControl("", [Validators.required]),
		type: new FormControl<EventType>(null, [Validators.required]),
		address: new FormControl("", [Validators.required]),
		display: new FormControl<File>(null, [Validators.required]),
		phoneNumber: new FormControl("", [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)]),
		email: new FormControl("", [Validators.required, Validators.email]),
	});

	private readonly createEvent$ = new Subject<EventPayload>();
	private readonly _destroy$ = new Subject<void>();

	constructor(
		private fb: FormBuilder,
		service: EventsListService,
	) {
		const createEvent$ = this.createEvent$.pipe(
			switchMap(payload => service.createEvent$(payload, this.formGroup.get("display").value)),
			tap(() => this.clear()),
			takeUntil(this._destroy$),
		);

		[
			createEvent$,
		].forEach((x: Observable<unknown>) => x.subscribe());
	}

	getFormControlError(name: string): ValidationErrors | null {
		return this.formGroup.get(name)?.errors;
	}

	submit() {
		const { time, date, ...rest } = this.formGroup.getRawValue();
		const [hours, minutes] = time.split(":")
		this.createEvent$.next({ ...rest, date: new Date(date.setHours(+hours, +minutes)).toISOString() });
	}

	clear() {
		this.formGroup.reset();
		this.formGroup.markAsUntouched();
	}
}
