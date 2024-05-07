export interface SelectOption {
	name: string;
	value: string;
}

interface FormFieldBase {
	name: string;
	controlName: string;
	type: FormFieldType;
}

export interface TextFormField extends FormFieldBase {
	type: FormFieldType.text;
}

export interface TextareaFormField extends FormFieldBase {
	type: FormFieldType.textarea;
}

export interface DateFormField extends FormFieldBase {
	type: FormFieldType.date;
	futureOnly?: boolean;
}

export interface TimeFormField extends FormFieldBase {
	type: FormFieldType.time;
}

export interface SelectFormField extends FormFieldBase {
	type: FormFieldType.select;
	options: SelectOption[];
}

export interface FileFormField extends FormFieldBase {
	type: FormFieldType.file;
	accept: string;
}

export type FormField = TextFormField | TextareaFormField | DateFormField | TimeFormField | SelectFormField | FileFormField;

export enum FormFieldType {
	text = "text",
	textarea = "textarea",
	date = "date",
	time = "time",
	select = "select",
	file = "file",
}

export type FormFieldTypeLiteral = keyof typeof FormFieldType;
