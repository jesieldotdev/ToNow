import { getNestedField } from "../../utils/utils";
import { getDefaultSettingItem } from "./utils";

export const getSetting =
  (state: RootState) =>
  <T extends FlattenKeys<SettingState>>(field: T) =>
    getNestedField(state.task, field);


  export const getSettingItem = (state: RootState) => (): SettingItem => {
    const { items, selectedItemIndex } = state.task;
    return items[selectedItemIndex] ?? getDefaultSettingItem();
  };