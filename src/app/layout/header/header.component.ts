import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { LayoutService } from '../layout.service';

const NAME_KEBAB = 'app-header';

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {

	constructor(
		private layoutService: LayoutService
	) {
	}

	onMenuClick() {
		this.layoutService.toggleDrawer();
	}
}
