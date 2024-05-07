import _ from "lodash";
import { EventType, FormField, FormFieldType, SelectOption } from "@app/core";

export const eventTypeOptions: SelectOption[] = Object.values(EventType).map(val => ({ name: _.capitalize(val), value: val }));

export const eventsFromModel: FormField[] = [
	{
		name: "Title",
		controlName: "title",
		type: FormFieldType.text,
	},
	{
		name: "Description",
		controlName: "description",
		type: FormFieldType.textarea,
	},
	{
		name: "Date",
		controlName: "date",
		type: FormFieldType.date,
		futureOnly: true
	},
	{
		name: "Time",
		controlName: "time",
		type: FormFieldType.time,
	},
	{
		name: "Type",
		controlName: "type",
		type: FormFieldType.select,
		options: eventTypeOptions
	},
	{
		name: "Phone Number",
		controlName: "phoneNumber",
		type: FormFieldType.text,
	},
	{
		name: "Email",
		controlName: "email",
		type: FormFieldType.text,
	},
	{
		name: "Address",
		controlName: "address",
		type: FormFieldType.text,
	},
	{
		name: "Event thumbnail",
		controlName: "display",
		type: FormFieldType.file,
		accept: "image/*",
	},
]


