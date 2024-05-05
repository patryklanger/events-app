import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MENU_ITEMS } from './menu.const';

const NAME_KEBAB = 'app-menu';

@Component({
	selector: NAME_KEBAB,
	host: { class: NAME_KEBAB },
	encapsulation: ViewEncapsulation.None,
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {

	readonly menuItems = MENU_ITEMS;

	constructor(private router: Router) {}

	isActive(url: string): boolean {
		return this.router.isActive(url, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' })
	}
}
