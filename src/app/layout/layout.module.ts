import { NgModule } from "@angular/core";

import { AppRoutingModule } from "../app-routing.module";
import { MaterialModule } from "../material/material.module";
import { LayoutComponent } from "./layout.component";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from "./header/header.component";

const EXPORTED_COMPONENTS = [
	LayoutComponent,
];

@NgModule({
	declarations: [
		...EXPORTED_COMPONENTS,
		MenuComponent,
		HeaderComponent
	],
	imports: [
		AppRoutingModule,
		MaterialModule
	],
	exports: [...EXPORTED_COMPONENTS],
})
export class LayoutModule {}
