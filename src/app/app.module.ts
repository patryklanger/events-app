import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
	],
	providers: [
		provideAnimationsAsync()
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
