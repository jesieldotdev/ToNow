import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialEventState as initialState } from "./state";
import { setNestedField } from "../../utils/utils";


export const setEventAction = createAction<{
  field: FlattenKeys<EventState>;
  value: any;
}>("SET_EVENT")

export const setEvent =
  <T extends FlattenKeys<EventState>>(field: T, value: DeepType<EventState, T>) =>
    (dispatch: any) => {
      dispatch(setEventAction({ field, value }));
    };

export default createReducer(initialState(), (builder) => {
  builder
    .addCase(setEventAction, (state, { payload: { field, value } }) => {
      setNestedField(state, field, value);
    })
    // .addCase(resetCartAction, (_, { payload = initialState() }) => payload);
});