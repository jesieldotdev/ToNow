import { AxiosResponse } from "axios";
import { setSetting as setSettingSetting } from "./reducer";
import { themes } from "./state";

interface Response {
  message: string;
  settings: SettingItem[]
}

export const setSetting =
  (...[, , , dispatch]: any) =>
    <T extends FlattenKeys<SettingState>>(
      field: T,
      value: DeepType<SettingState, T>
    ): void =>
      dispatch(setSettingSetting(field, value));


export const setSettingItem =
  (getState: () => RootState, actions: ActionsType) =>
    <T extends FlattenKeys<SettingItem>>(
      field: T,
      value: DeepType<SettingItem, T>
    ): void => {
      const {
        setting: { setSetting },
      } = actions;
      const state = getState();

      const selectedCartItemIndex = state.setting.selectedItemIndex;
      const selectedItem = state.setting.items[selectedCartItemIndex];
      if (!selectedItem) return;

      setSetting(`items.${selectedCartItemIndex}.${field}`, value as any);
    };


export const getSettings =
  (_getState: () => RootState, actions: ActionsType) =>
    (searchFilter?: SearchFilter<SettingItem>) =>
      new Promise<AxiosResponse<Response>>((resolve, reject) => {
        const {
          request: { GET },
        } = actions;
        GET
          <Response>("settings")
          .then(resolve)
          .catch((error) => {
            console.error("Error in getSettings:", error);
            reject(error);
          });
      });

export const filterSettings =
  (getState: () => RootState, actions: ActionsType) => () =>
    new Promise<Response>((resolve, reject) => {
      const {
        setting: { getSettings, setSetting },
      } = actions;
      const state = getState();
      const searchFilter = state.setting.filter.setting.filter;


      getSettings(searchFilter)
        .then(({ data }) => {
          setSetting("items", data.settings);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error in filterSettings:", error);
          reject(error);
        });
    });

export const addSettingItem =
  (getState: () => RootState, actions: ActionsType) =>
    (newSetting: SettingItem): void => {
      const {
        setting: { setSetting },
      } = actions;

      const state = getState();
      const currentSettings = state.setting.items || []; 

      setSetting("items", [...currentSettings, newSetting]); 
    };



export const toggleTheme = (getState: () => RootState, actions: ActionsType) =>
  (): void => {
    const {
      setting: {  },
    } = actions;

    console.log('1')

    const state = getState()

    const newMode = state.setting.theme === 'light' ? 'dark' : 'light';
    state.setting.theme = newMode;
    state.setting.colors = themes[newMode]; 
  }
