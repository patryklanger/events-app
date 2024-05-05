import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventInfo } from "@app/core";

const NAME_KEBAB = 'app-event-card';

@Component({
	selector: NAME_KEBAB,
	host: {
		class: NAME_KEBAB,
		"(click)": "onCardClick()"
	},
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './event-card.component.html',
	styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
	@Input() event: EventInfo;

	constructor(private router: Router) {}

	onCardClick() {
		this.router.navigate(['events', 'details', this.event.id]);
	}
}
