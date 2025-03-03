import { AxiosResponse } from "axios";
import { setEvent as setEventEvent } from "./reducer";
import { stringify } from "querystring";

interface Response {
  message: string;
  tasks: EventItem[]
}

export const setEvent =
  (...[, , , dispatch]: any) =>
    <T extends FlattenKeys<EventState>>(
      field: T,
      value: DeepType<EventState, T>
    ): void =>
      dispatch(setEventEvent(field, value));


export const setEventItem =
  (getState: () => RootState, actions: ActionsType) =>
    <T extends FlattenKeys<EventItem>>(
      field: T,
      value: DeepType<EventItem, T>
    ): void => {
      const {
        task: { setEvent },
      } = actions;
      const state = getState();

      const selectedCartItemIndex = state.task.selectedItemIndex;
      const selectedItem = state.task.items[selectedCartItemIndex];
      if (!selectedItem) return;

      setEvent(`items.${selectedCartItemIndex}.${field}`, value as any);
    };


export const getEvents =
  (_getState: () => RootState, actions: ActionsType) =>
    (searchFilter?: SearchFilter<EventItem>) =>
      new Promise<AxiosResponse<Response>>((resolve, reject) => {
        const {
          request: { GET },
        } = actions;
        GET
          <Response>("tasks")
          .then(resolve)
          .catch((error) => {
            console.error("Error in getEvents:", error);
            reject(error);
          });
      });

export const filterEvents =
  (getState: () => RootState, actions: ActionsType) => () =>
    new Promise<Response>((resolve, reject) => {
      const {
        task: { getEvents, setEvent },
      } = actions;
      const state = getState();
      const searchFilter = state.task.filter.task.filter;


      getEvents(searchFilter)
        .then(({ data }) => {
          setEvent("items", data.tasks);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error in filterEvents:", error);
          reject(error);
        });
    });

