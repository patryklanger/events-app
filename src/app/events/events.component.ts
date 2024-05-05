import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

const NAME_KEBAB = 'app-events';

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './events.component.html'
})
export class EventsComponent {
}
