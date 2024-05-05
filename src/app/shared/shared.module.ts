import { NgModule } from "@angular/core";

import { ValidationErrorDirective } from "./directives/error.directive";

const EXPORTED_DIRECTIVES = [ValidationErrorDirective]

@NgModule({
	declarations: [
		...EXPORTED_DIRECTIVES
	],
	exports: [
		...EXPORTED_DIRECTIVES
	],
})
export class SharedModule {}
