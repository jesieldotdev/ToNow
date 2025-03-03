import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialSettingState as initialState } from "./state";
import { setNestedField } from "../../utils/utils";


export const setSettingAction = createAction<{
  field: FlattenKeys<SettingState>;
  value: any;
}>("SET_SETTING")

export const setSetting =
  <T extends FlattenKeys<SettingState>>(field: T, value: DeepType<SettingState, T>) =>
    (dispatch: any) => {
      dispatch(setSettingAction({ field, value }));
    };

export default createReducer(initialState(), (builder) => {
  builder
    .addCase(setSettingAction, (state, { payload: { field, value } }) => {
      setNestedField(state, field, value);
    })
    // .addCase(resetCartAction, (_, { payload = initialState() }) => payload);
});