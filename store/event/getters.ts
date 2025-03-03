import { getNestedField } from "../../utils/utils";
import { getDefaultEventItem } from "./utils";

export const getEvent =
  (state: RootState) =>
  <T extends FlattenKeys<EventState>>(field: T) =>
    getNestedField(state.task, field);


  export const getEventItem = (state: RootState) => (): EventItem => {
    const { items, selectedItemIndex } = state.task;
    return items[selectedItemIndex] ?? getDefaultEventItem();
  };