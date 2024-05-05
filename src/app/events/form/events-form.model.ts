import _ from "lodash";
import { EventType, SelectOption } from "@app/core";

export const eventTypeOptions: SelectOption[] = Object.values(EventType).map(val => ({ name: _.capitalize(val), value: val }));
