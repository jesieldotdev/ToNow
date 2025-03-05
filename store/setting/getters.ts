import { getNestedField } from "../../utils/utils";
import { getDefaultSettingItem } from "./utils";

export const getSetting =
  (state: RootState) =>
  <T extends FlattenKeys<SettingState>>(field: T) =>
    getNestedField(state.setting, field);


  // export const getSettingItem = (state: RootState) => (): SettingItem => {
  //   const { items
  //    } = state.setting;
  //   return items[selectedItemIndex] ?? getDefaultSettingItem();
  // };