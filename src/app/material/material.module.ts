import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

const MATERIAL_MODULES = [
	MatSidenavModule,
	MatButtonModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	NgxMatTimepickerModule,
	MatSelectModule,
	MatSnackBarModule,
	NgxMatFileInputModule,
	MatCardModule,
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		...MATERIAL_MODULES,
	],
	exports: [
		...MATERIAL_MODULES
	]
})
export class MaterialModule {}
