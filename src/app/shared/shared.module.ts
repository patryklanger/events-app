import { NgModule } from "@angular/core";

import { ValidationErrorDirective } from "./directives/error.directive";
import { TruncatePipe } from "./pipes/truncate.pipe";

const EXPORTED_DIRECTIVES = [ValidationErrorDirective]
const EXPORTED_PIPES = [TruncatePipe]

@NgModule({
	declarations: [
		...EXPORTED_DIRECTIVES,
		...EXPORTED_PIPES
	],
	exports: [
		...EXPORTED_DIRECTIVES,
		...EXPORTED_PIPES
	],
})
export class SharedModule {}
