import { Directive, ElementRef, Input, OnChanges } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

import { PHONE_NUMBER_PATTERN } from "../patterns.const";

@Directive({
	selector: "[appError]",
})
export class ValidationErrorDirective implements OnChanges {

	@Input() appError: ValidationErrors;

	constructor(
		private el: ElementRef,
	) {
	}

	ngOnChanges() {
		if (!this.appError) {
			return;
		}

		if (this.appError.required) {
			this.el.nativeElement.innerText = "This field is required";
			return;
		}

		if (this.appError.email) {
			this.el.nativeElement.innerText = "You must provide a valid email address";
			return;
		}

		if (
			this.appError.pattern &&
			this.appError.pattern.requiredPattern === PHONE_NUMBER_PATTERN.toString()
		) {
			this.el.nativeElement.innerText = "You must provide a valid phone number";
			return;
		}
	}

}
